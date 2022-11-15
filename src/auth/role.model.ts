import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Role {
  @Prop()
  name: string;

  @Prop()
  permissions: [string];

  @Prop()
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
