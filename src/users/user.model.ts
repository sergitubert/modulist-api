import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
    timestamps: true,
})
export class User {

    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        required: true,
    })
    surname: string;

    @Prop({
        required: true,
    })
    googleId: string;

    @Prop({
        required: true,
    })
    photoUrl: string;

    @Prop({
        required: true,
    })
    email: string;

}

export const UserSchema = SchemaFactory.createForClass(User);