import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { APIResponse } from 'src/model';
import { CreateOrderInput } from './dto/create-order.input';
import { GetOrdersInput } from './dto/get-orders.input';
import { UpdateOrderStatusInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private readonly Order: Model<Order>) {}

  public async create(
    createOrderInput: CreateOrderInput,
     res: Response,
  ): Promise<APIResponse> {
    let result: APIResponse = null;
    try {
 
      const order = new this.Order(createOrderInput);     
      await order.save({validateBeforeSave:true});

      result = {
        statusCode: HttpStatus.OK,
        ok: true,
        data: order,
      };
      return result;
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, ok: false,message:e };
    }
  }

  public async getOrders(body:GetOrdersInput) {
    let result: APIResponse = null; 
    try {
   
      let query = body.orderStatus ? { status: body.orderStatus } : {};
      const page = body.page || 1;
      const pageSize = body.perPage || 5;
      const skip = (body.page - 1) * pageSize;
      const total = await this.Order.countDocuments(query);

      const pages = Math.ceil(total / pageSize);
      if (page > pages) {
        result = {
          statusCode: HttpStatus.OK,
          ok: true,
          message :"سفارشی وجود ندارد"
        };
        return result;
      }
  
      let orders = await this.Order.find(query,
      )
        .sort({ createdAt: 'descending' })
        .limit(pageSize)
        .skip(skip).select("+_id");
       
        // return data
      result = {
        statusCode: HttpStatus.OK,
        ok: true,
        data:{
          ...orders,
          total:total,
          
        }
      };
      return result;
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, ok: false };
    }
  }

  public async updateOrderStatus(body:UpdateOrderStatusInput): Promise<APIResponse> 
  {
    let result: APIResponse = null;
    try {
 
      let order = await this.Order.findById(body.orderId);
      order.status = body.orderStatus;
      await order.save({validateBeforeSave:true});

      result = {
        statusCode: HttpStatus.OK,
        ok: true,
        data: order,
      };
      return result;
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, ok: false,message:e };
    }
  }
}


/*

{
        name:createOrderInput.name,
        email:createOrderInput.email,
        service:createOrderInput.service,
        mess:createOrderInput.mess,
        budget:createOrderInput.budget,
        attachments:createOrderInput.attachments,
      }

      */