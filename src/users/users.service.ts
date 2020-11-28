import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './user.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async findOne(filter: Partial<User>): Promise<User | undefined> {
        return this.userModel.findOne(filter);
    }

    async create(user: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }
}
