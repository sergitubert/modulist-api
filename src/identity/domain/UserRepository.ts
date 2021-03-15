import { Nullable } from '../../Shared/domain';
import { GoogleId } from './GoogleId';
import { User } from './User';
import { UserId } from './UserId';

export interface UserRepository {
    save(user: User): void;
    search(googleId: GoogleId): Nullable<User>;
    searchByUserId(userId: UserId): Nullable<User>;
}