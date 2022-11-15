import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;

  @Prop()
  roles: string[];

  @Prop({
    unique: true,
  })
  email: string;

  @Prop({})
  password: string;

  @Prop()
  name: string;
}

export const UserModel = SchemaFactory.createForClass(User);
