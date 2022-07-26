import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderInput } from './create-order.input';

export class UpdateOrderDto extends PartialType(CreateOrderInput) {}
