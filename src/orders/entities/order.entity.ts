import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
  attachments?: string[];

  @Prop({required: true, default: 'notChecked' })
  status!: 'InProgress' | 'Done' | 'notChecked';

  @Prop({ default: Date.now, index: true })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const OrderEntitySchema = SchemaFactory.createForClass(Order);

