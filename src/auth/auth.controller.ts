import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, SignInDto } from './dtos/auth.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-current-userId.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() signInData: SignInDto) {
    return this.authService.login(signInData);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }
}
