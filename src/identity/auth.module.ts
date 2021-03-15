import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserCreator } from './application/UserCreator';
import { AuthGoogleController } from './auth-google.controller';
import { UserFinder } from './domain/services/UserFinder';
import { InMemoryUserRepository } from './infrastructure/InMemoryUserRepository';
import { SessionSerializer } from './session.serializer';
import { GithubStrategy } from './strategies/github.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true })
  ],
  controllers: [AuthGoogleController],
  providers: [
    SessionSerializer,
    GoogleStrategy,
    GithubStrategy,
    UserCreator,
    UserFinder,
    {
      provide: 'UserRepository',
      useClass: InMemoryUserRepository,
    },
  ]
})
export class AuthModule { }
