import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserId } from '../UserId';
import { UserRepository } from '../UserRepository';

@Injectable()
export class UserFinder {

    constructor(@Inject('UserRepository') private readonly repository: UserRepository) { }

    async run(
        userId: UserId
    ): Promise<any> {
        const user = await this.repository.searchByUserId(userId);
        if (!user) throw new NotFoundException();
        return { id: user.id.value, name: user.name.value, surname: user.surname.value, avatarUrl: user.avatarUrl.value, email: user.email.value, googleId: user.googleId.value };
    }
}