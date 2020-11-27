import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [];

    async findOne(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    async add(user: User) {
        this.users.push(user);
    }
}
