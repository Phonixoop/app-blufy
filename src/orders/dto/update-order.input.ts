import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { OrderStatus, OrderStatuseEnum } from '../entities/interfaces';

export class UpdateOrderStatusInput {

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    orderId:string;

    @IsNotEmpty()
    @IsEnum(OrderStatuseEnum)
    public orderStatus?: OrderStatus;

}



let update = new UpdateOrderStatusInput();


