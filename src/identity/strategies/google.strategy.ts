import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Uuid } from '../../Shared/domain';
import { UserCreator } from '../application/UserCreator';
import { GoogleId } from '../domain/GoogleId';
import { Url } from '../domain/Url';
import { UserEmail } from '../domain/UserEmail';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserRepository } from '../domain/UserRepository';
import { UserSurname } from '../domain/UserSurname';

export type GoogleProfile = Profile & { emails: { value: string; verified: boolean }[] }

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private readonly configService: ConfigService, @Inject('UserRepository') private readonly userRepository: UserRepository, private readonly userCreator: UserCreator) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: `${configService.get('BACKEND_URL')}/auth/google/callback`,
            scope: ['profile', 'email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: GoogleProfile, done: VerifyCallback) {
        const user = await this.userRepository.search(new GoogleId(profile.id));
        if (!user) {
            const { value: email } = profile.emails[0];
            const newUserUuid = Uuid.random().value;
            await this.userCreator.run(
                new UserId(newUserUuid),
                new UserName(profile.name.givenName),
                new UserSurname(profile.name.familyName),
                new UserEmail(email),
                new GoogleId(profile.id),
                new Url(profile.photos[0].value),
            );

            // const user = await this.usersService.create(newUser);
            // TODO: I need the user here
            done(null, { _id: newUserUuid });
        }
        done(null, user.id);
    }

}