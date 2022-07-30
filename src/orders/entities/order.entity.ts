import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: false })
  service?: string[];

  @Prop({ required: false })
  budget?: string;

  @Prop({ required: false })
  mess?: string;

  @Prop({ required: false })
  attachments?: string[];

  @Prop({required: true, default: 'notChecked' })
  status!: 'InProgress' | 'Done' | 'notChecked';

  @Prop({ required: true, default: Date.now })
  createdAt!: Date;

  @Prop({required: true, default: Date.now })
  updatedAt!: Date;
}

export const OrderEntitySchema = SchemaFactory.createForClass(Order);

