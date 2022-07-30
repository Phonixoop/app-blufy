import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import 'dotenv/config';
import mongoose from 'mongoose';
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
    mongoose.set('debug', true);
    console.log('MONGODB CONNECTION STRING ', process.env.MONGODB);
    console.log('PORT ', process.env.PORT || 3000);
  }
}
