import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import 'dotenv/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MongooseModule.forRoot(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ServeStaticModule.forRoot({
      serveStaticOptions: {
      },
      rootPath: join('../uploads'),
    }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
  ]
})
export class AppModule {
  constructor() {
    console.log('MONGODB CONNECTION STRING ', process.env.MONGODB);
    console.log('PORT ', process.env.PORT || 3000);
  }
}
