import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: false })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: false })
  service?: string[];

  @Prop({ required: false })
  budget?: string;

  @Prop({ required: false, name: 'message' })
  mess?: string;

  @Prop({ required: false })
  attachments: string[];

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}
export const OrderEntitySchema = SchemaFactory.createForClass(Order);
