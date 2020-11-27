import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { serializeUser, use } from 'passport';
import { Strategy } from 'passport-github2';
@Injectable()
export class GithubStrategy extends Strategy {

    constructor(private readonly configService: ConfigService) {
        super({
            callbackURL: 'http://localhost:3001/auth/github/callback',
            clientID: '0f980a4b7ab841231330',
            clientSecret: '0f980a4b7ab841231330',
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