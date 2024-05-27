import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from 'src/interfaces/user';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
    @Prop() id: string;
    @Prop() login: string;
    @Prop() psw: string;
    @Prop() email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);