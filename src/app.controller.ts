import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('uploads/:name')
  public getImage(@Param('name') name, @Res() res: Response): Observable<any> {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + name)));
  }
}
