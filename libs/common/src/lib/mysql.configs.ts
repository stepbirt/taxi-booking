import { TypeOrmModule } from '@nestjs/typeorm';
import { Environments } from './environments';

export const mysqlModuleConfig = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'mysql',
    host: Environments.DB_HOST,
    port: Environments.DB_PORT,
    username: Environments.DB_USER,
    password: Environments.DB_PASSWORD,
    database: Environments.DB_NAME,
    synchronize: Environments.NODE_ENV !== 'production',
    autoLoadEntities: true,
  }),
});
