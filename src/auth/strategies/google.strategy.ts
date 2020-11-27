import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '136798218844-6qnll3qavb9him4347fm8qu1s9ovopfn.apps.googleusercontent.com',
            clientSecret: 'Vc5ZCF5tqAzdAjzLgKKSptkU',
            callbackURL: 'http://localhost:3001/auth/google/callback',
            scope: ['profile'],

        })
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        try {
            console.log(profile);

            const jwt: string = 'placeholderJWT'
            const user =
            {
                jwt
            }

            done(null, user);
        }
        catch (err) {
            // console.log(err)
            done(err, false);
        }
    }

}