import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { RegisterDto, SignInDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(_signInData: SignInDto): Promise<User> {
    try {
      const user: User = await this.usersService.findOne({
        email: _signInData.email,
      });
      if (!user) throw new UnauthorizedException('Invalid credentials');
      const verifyPassword: boolean = await bcrypt.compare(
        _signInData.password,
        user.password,
      );
      if (!verifyPassword)
        throw new UnauthorizedException('Invalid credentials');
      const { ...result } = user;
      return result;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  async register(_registerData: RegisterDto): Promise<any> {
    const { email, fullName, password } = _registerData;
    try {
      const emailInUse: User | null = await this.usersService.findOne({
        email,
      });
      if (emailInUse) throw new ConflictException('Email already exists');
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const createdUser = await this.usersService.createUser({
        email,
        fullName,
        password: hashedPassword,
      });

      const jwtPayload = {
        sub: createdUser.id,
        email: createdUser.email,
        fullName: createdUser.fullName,
      };

      const token = await this.jwtService.signAsync(jwtPayload, {
        expiresIn: '1d',
      })
  
      return {
        token,
        uid: createdUser.uid,
        email,
        fullName: createdUser.fullName,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async login(_signInData: SignInDto): Promise<any> {
    const user = await this.validateUser({
      email: _signInData.email,
      password: _signInData.password,
    });

    const jwtPayload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
    };

    const token = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '1d',
    })

    return {
      token,
      uid: user.id,
      email: user.email,
      fullName: user.fullName,
    };
  }

  async logout(userId: string): Promise<any> {
    return {
      message: 'Logout successfully',
    };
  }
}
