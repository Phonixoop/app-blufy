import {
    IsEnum,
    IsNumber,
    IsOptional, Max
} from 'class-validator';
import { OrderStatus, OrderStatuseEnum } from '../entities/interfaces';


  export class GetOrdersInput {

    @IsOptional()
    @IsNumber()
    @Max(10)
    public page?: number;
  
    @IsOptional()
    @IsNumber()
    @Max(10)
    public perPage?: number;
  
    @IsOptional()
    @IsEnum(OrderStatuseEnum)
    public orderStatus?: OrderStatus;
  }
  