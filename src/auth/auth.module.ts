import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy } from './strategies/at.startegy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: '2024-11-22 20:20:12.420cm3t6qz2c0001yv8ffv6h8z09+2024-11-22 20:20:12.420',
    }),
    PassportModule
  ],
  providers: [AuthService, AtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
