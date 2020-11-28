import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private readonly configService: ConfigService, private readonly authService: AuthService, private readonly usersService: UsersService) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: `${configService.get('BACKEND_URL')}/auth/google/callback`,
            scope: ['profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        // find current user in UserModel
        // const currentUser = await User.findOne({
        //     twitterId: profile._json.id_str
        // });
        const currentUser = await this.authService.validateUser(profile.id);
        // create new user if the database doesn't have this user
        if (!currentUser) {
            // const newUser = await new User({
            //     name: profile._json.name,
            //     screenName: profile._json.screen_name,
            //     twitterId: profile._json.id_str,
            //     profileImageUrl: profile._json.profile_image_url
            // }).save();
            const newUser = {
                username: profile.username,
                displayName: profile.displayName,
                googleId: profile.id,
                id: profile.id,
            };

            await this.usersService.add(newUser);
            done(null, newUser);
        }
        done(null, currentUser);
    }

}