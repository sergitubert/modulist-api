import { Inject, Injectable } from '@nestjs/common';
import { GoogleId } from '../domain/GoogleId';
import { UserRepository } from '../domain/UserRepository';

@Injectable()
export class UserGoogleIdAuthenticator {
    // TODO: AuthRepository?
    constructor(@Inject('') private readonly repository: UserRepository) { }

    run(googleId: GoogleId) {
        const user = this.repository.search(googleId);
        return user;
    }
}