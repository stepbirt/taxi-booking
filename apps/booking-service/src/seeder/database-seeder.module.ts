import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseSeederService } from './database-seeder.service';
import { User } from '../app/entities/user.entity';
import { Taxi } from '../app/entities/taxi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Taxi])],
  providers: [DatabaseSeederService],
  exports: [DatabaseSeederService],
})
export class DatabaseSeederModule {}
