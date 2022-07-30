import {
  Body,
  Controller,
  Header,
  InternalServerErrorException, Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { APIResponse } from 'src/model';
import { CreateOrderInput } from './dto/create-order.input';
import { UploadedFileFilter } from './filter/imagefile.filter';
import { OrdersService } from './orders.service';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Header('Access-Control-Allow-Origin', '*')
  @Post('create')
  @UseInterceptors(
    FilesInterceptor('attachments[]', 10, {
      limits: { fileSize: 1000000 },
      fileFilter: UploadedFileFilter,
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, callback) {
          callback(null, Date.now() + '_' + file.originalname);
        },
      }),
    }),
  )
  public async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createOrderInput: CreateOrderInput,
    @UploadedFiles() attachments?: Array<Express.Multer.File>,
  ) {
    // req.protocol+"://"+req.hostname+":"+req.socket.localPort+"/" + 
    try {
      const attach = attachments.map((a) => {
        return a.path.replace('\\', '/');
      });     
      createOrderInput.attachments = attach;
    console.log(createOrderInput)
      const result = await this.ordersService.create(createOrderInput, res);
      const payload: APIResponse = {
        ok: result.ok,
        message: result.message,
        data: result.data,
        statusCode: result.statusCode,
      };

       return res.status(200).json(payload);
    } catch {
      return new InternalServerErrorException('خطای سرور');
    }
  }

  @Post('getOrders')
  public async findAll(
    @Res() res: Response,
    @Body() body: { page?: number, perPage?: number; skip?: number, orderStatus: OrderStatus },
  ) {
    try {
 
      const result = await this.ordersService.findAll(
        body.page,
        body.perPage,
        body.orderStatus,
      );
      const payload: APIResponse = {
        ok: result.ok,
        message: result.message,
        data: result.data,
        statusCode: result.statusCode,
      };

      return res.status(result.statusCode).json(payload);
    } catch {
      return new InternalServerErrorException('خطای سرور');
    }
  }


}
