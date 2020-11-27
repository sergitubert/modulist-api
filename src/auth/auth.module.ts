import { Module } from '@nestjs/common';
import { AuthGoogleController } from './auth-google.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategies/github.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  controllers: [AuthGoogleController],
  providers: [AuthService, GoogleStrategy, GithubStrategy]
})
export class AuthModule { }
