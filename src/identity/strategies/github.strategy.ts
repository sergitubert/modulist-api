import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { serializeUser, use } from 'passport';
import { Strategy } from 'passport-github2';
@Injectable()
export class GithubStrategy extends Strategy {

    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get('GITHUB_CLIENT_ID'),
            clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
            callbackURL: `${configService.get('BACKEND_URL')}/auth/github/callback`,
            scope: ['']
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                done(null, profile)
            } catch (error) {
                done(error, false)
            }
        });
        serializeUser((user, cb) => {
            cb(null, user)
        })
        use(this);
    }

}