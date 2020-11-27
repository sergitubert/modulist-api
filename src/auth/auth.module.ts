import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthGoogleController } from './auth-google.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './strategies/github.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthGoogleController],
  providers: [AuthService, GoogleStrategy, GithubStrategy]
})
export class AuthModule { }
