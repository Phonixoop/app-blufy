import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { APIResponse } from 'src/model';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './entities/order.entity';
@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private readonly Order: Model<Order>) {}

  public async create(
    createOrderInput: CreateOrderInput,
    @Res() res: Response,
  ): Promise<APIResponse> {
    let result: APIResponse;
    try {
      const order = new this.Order(createOrderInput);
      await order.save();
      return {
        statusCode: HttpStatus.OK,
        ok: true,
        data: JSON.stringify(createOrderInput),
      };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, ok: false };
    }
  }

  findAll() {
    return `This action returns all orders`;
  }
}
