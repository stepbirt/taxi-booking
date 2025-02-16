import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlModule, RabbitModule } from '@taxi-booking-app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { User } from './entities/user.entity';
import { Taxi } from './entities/taxi.entity';
import { DatabaseSeederModule } from '../seeder/database-seeder.module';

@Module({
  imports: [
    RabbitModule,
    MysqlModule,
    TypeOrmModule.forFeature([Booking, User, Taxi]),
    DatabaseSeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
