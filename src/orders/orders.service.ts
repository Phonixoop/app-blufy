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
    let result: APIResponse = null;
    try {
      const order = new this.Order(createOrderInput);
      await order.save();

      result = {
        statusCode: HttpStatus.OK,
        ok: true,
        data: createOrderInput,
      };
      return result;
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, ok: false };
    }
  }

  public async findAll(pageNumber:number,perPage:number, orderStatus: OrderStatus) {
    let result: APIResponse = null; 
    try {
   
      let query = orderStatus ? { status: orderStatus.status } : {};

      const page = pageNumber || 1;
      const pageSize = perPage || 5;
      const skip = (pageNumber - 1) * pageSize;
      const total = await this.Order.countDocuments(query);

      const pages = Math.ceil(total / pageSize);
      if (page > pages) {
        result = {
          statusCode: HttpStatus.OK,
          ok: false,
          message :"صفحه ای پیدا نشد"
        };
        return result;
      }
  
      const orders = await this.Order.find(query,
      )
        .sort({ createdAt: 'descending' })
        .limit(pageSize)
        .skip(skip);
        // return data
      result = {
        statusCode: HttpStatus.OK,
        ok: true,
        data:{
          ...orders,
          total:total
        }
      };
      return result;
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, ok: false };
    }
  }
}
