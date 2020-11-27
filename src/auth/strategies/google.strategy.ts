import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

const users = {};
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
        // find current user in UserModel
        // const currentUser = await User.findOne({
        //     twitterId: profile._json.id_str
        // });
        const currentUser = users[profile.id];
        console.log(currentUser);
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

            users[profile.id] = newUser;
            done(null, newUser);
        }
        done(null, currentUser);
    }

}