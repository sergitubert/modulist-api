import { Injectable } from '@nestjs/common';
import { Nullable } from '../../Shared/domain';
import { GoogleId } from '../domain/GoogleId';
import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';

@Injectable()
export class InMemoryUserRepository implements UserRepository {

    private users: User[] = [];

    save(user: User): void {
        const userExists = this.search(user.googleId);
        if (!userExists) {
            this.users.push(user);
        }
    }

    search(googleId: GoogleId): Nullable<User> {
        const user = this.users.find(user => user.googleId.value === googleId.value);
        return user ? user : null;
    }

    searchByUserId(userId: UserId): Nullable<User> {
        const user = this.users.find(user => user.id.value === userId.value);
        return user ? user : null;
    }

}