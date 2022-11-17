import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, RoleSchema } from '../../role/model/role.model';

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
  firstName: string;

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
  idCard: string;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop(
    raw({
      name: { type: String },
      permissions: { type: [String] },
    }),
  )
  role: Record<string, any>;
}

export type TeamDocument = Team & Document;
export const TeamSchema = SchemaFactory.createForClass(Team);
