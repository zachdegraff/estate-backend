import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Team, TeamSchema } from '../../team/entities/team.model';

@Schema({ timestamps: true })
export class Business {
  @Prop()
  businessPhoto: string;

  @Prop()
  businessLink: string;

  @Prop({ unique: true })
  businessName: string;

  @Prop({ type: Types.ObjectId, ref: 'Team' })
  owner: string;
}

export type BusinessDocument = Business & Document;
export const BusinessSchema = SchemaFactory.createForClass(Business);
