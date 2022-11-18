import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { type } from 'os';
import { identity } from 'rxjs';
import { RawRole } from 'src/role/dto/create-role.dto';
import { IRole } from 'src/role/interfaces/role.interfaces';
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

@Schema({ timestamps: true, autoIndex: true })
export class Team {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    unique: true,
  })
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

  @Prop({ type: AddressSchema, _id: false })
  address: Address;

  @Prop({ type: RawRole })
  role: RawRole;
}
export type TeamDocument = Team & Document;
export const TeamSchema = SchemaFactory.createForClass(Team);

// TODO
// Save owner as object identity..
