import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }

    async validateUser(id: string) {
        const user = this.userService.findOne(id);
        if (!user) throw new UnauthorizedException();
        return user;
    }
}
