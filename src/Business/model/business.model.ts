import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Team, TeamSchema } from '../../user/model/team.model';

@Schema({ timestamps: true })
export class Business {
  @Prop()
  businessPhoto: string;

  @Prop()
  businessLink: string;

  @Prop({ unique: true })
  businessName: string;

  @Prop({ type: TeamSchema })
  owner: Team;
}

export type BusinessDocument = Business & Document;
export const BusinessSchema = SchemaFactory.createForClass(Business);
