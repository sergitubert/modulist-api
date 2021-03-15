import { Inject, Injectable } from '@nestjs/common';
import { GoogleId } from '../domain/GoogleId';
import { Url } from '../domain/Url';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserRepository } from '../domain/UserRepository';
import { UserSurname } from '../domain/UserSurname';

@Injectable()
export class UserCreator {

    constructor(@Inject('UserRepository') private readonly repository: UserRepository) { }

    async run(
        id: UserId,
        name: UserName,
        surname: UserSurname,
        email: UserEmail,
        googleId: GoogleId,
        photo: Url,
    ): Promise<void> {
        const user = User.create(id, name, surname, email, googleId, photo);
        await this.repository.save(user);
    }
}