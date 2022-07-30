import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req:Request ): string {
    return this.appService.getHello();
  }
  @Get('uploads/:name')
  public getImage(@Param('name') name, @Res() res: Response): Observable<any> {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + name)));
  }
}
