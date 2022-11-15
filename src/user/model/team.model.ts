import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, RoleSchema } from '../../auth/role.model';

@Schema()
export class Address {
  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  postalCode: string;
}
export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ timestamps: true })
export class Team {
  @Prop()
  firsntName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  profilePicture: string;

  @Prop()
  coverPhoto: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  bio: string;

  @Prop()
  id: string;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop({ type: RoleSchema })
  role: Role;
}

export type TeamDocument = Team & Document;
export const TeamSchema = SchemaFactory.createForClass(Team);
