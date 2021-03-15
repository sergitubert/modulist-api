import { AggregateRoot } from '../../Shared/domain';
import { GoogleId } from './GoogleId';
import { Url } from './Url';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserSurname } from './UserSurname';

export class User extends AggregateRoot {

    constructor(
        readonly id: UserId,
        readonly name: UserName,
        readonly surname: UserSurname,
        readonly email: UserEmail,
        readonly googleId: GoogleId,
        readonly avatarUrl: Url,
    ) {
        super();
    }

    static create(
        id: UserId,
        name: UserName,
        surname: UserSurname,
        email: UserEmail,
        googleId: GoogleId,
        avatarUrl: Url,
    ): User {
        const user = new User(id, name, surname, email, googleId, avatarUrl);
        // register event
        return user;
    }

    static fromPrimitives(plainData: any): User {
        return new User(
            new UserId(plainData.id),
            new UserName(plainData.name),
            new UserSurname(plainData.surname),
            new UserEmail(plainData.email),
            new GoogleId(plainData.googleId),
            new Url(plainData.url),
        );
    }

    toPrimitives() {

    }

}