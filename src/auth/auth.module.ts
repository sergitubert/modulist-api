import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthGoogleController } from './auth-google.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { GithubStrategy } from './strategies/github.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true })
  ],
  controllers: [AuthGoogleController],
  providers: [AuthService, SessionSerializer, GoogleStrategy, GithubStrategy]
})
export class AuthModule { }
