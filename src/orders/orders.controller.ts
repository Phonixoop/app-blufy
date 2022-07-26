import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { APIResponse } from 'src/model';
import { CreateOrderInput } from './dto/create-order.input';
import { UploadedFileFilter } from './filter/imagefile.filter';
import { OrdersService } from './orders.service';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  @UseInterceptors(
    FilesInterceptor('attachments[]', 10, {
      limits: { fileSize: 1000000 },
      fileFilter: UploadedFileFilter,
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, callback) {
          console.log(file);
          callback(null, Date.now() + '_' + file.originalname);
        },
      }),
    }),
  )
  public async create(
    @Res() res: Response,
    @Body() createOrderInput: CreateOrderInput,
    @UploadedFiles() attachments?: Array<Express.Multer.File>,
  ) {
    const attach = attachments.map((a) => {
      return a.path;
    });
    createOrderInput.attachments = attach;
    const result = await this.ordersService.create(createOrderInput, res);
    const payload: APIResponse = {
      ok: result.ok,
      message: result.message,
      data: result.data,
      statusCode: result.statusCode,
    };

    return res.status(result.statusCode).json(payload);
  }
}
