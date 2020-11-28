import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { CreateUserDto } from '../../users/create-user.dto';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';

export type GoogleProfile = Profile & { emails: { value: string; verified: boolean }[] }
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private readonly configService: ConfigService, private readonly authService: AuthService, private readonly usersService: UsersService) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: `${configService.get('BACKEND_URL')}/auth/google/callback`,
            scope: ['profile', 'email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: GoogleProfile, done: VerifyCallback) {
        const currentUser = await this.authService.validateUser(profile.id);
        console.log(currentUser)
        if (!currentUser) {
            const { value, verified } = profile.emails[0];
            const newUser: CreateUserDto = {
                name: profile.name.givenName,
                surname: profile.name.familyName,
                googleId: profile.id,
                photoUrl: profile.photos[0].value,
                email: value,
            };

            if (!verified) {
                throw new UnauthorizedException('Email not verified')
            }

            const user = await this.usersService.create(newUser);
            done(null, user);
        }
        done(null, currentUser);
    }

}