import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitMQModuleConfig } from './rmq.configs';
import { mysqlModuleConfig } from './mysql.configs';

@Module({
  imports: [ClientsModule.registerAsync(rabbitMQModuleConfig)],
  exports: [ClientsModule],
})
export class RabbitModule {}
@Module({
  imports: [mysqlModuleConfig],
})
export class MysqlModule {}
