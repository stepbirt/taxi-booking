import { Environments } from './environments';
import {
  ClientsModuleAsyncOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';

export const rabbitMQConfig: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [Environments.RMQ_URI],
    queue: Environments.RMQ_QUEUE,
    queueOptions: {
      durable: false,
    },
  },
};

export const rabbitMQModuleConfig: ClientsModuleAsyncOptions = [
  {
    name: Environments.RMQ_NAME || 'default_name',
    useFactory: () => ({
      ...rabbitMQConfig,
    }),
  },
];
