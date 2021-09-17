import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({ isGlobal: true });

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'order_card_db',
  entities: ['./dist/entity/*/*.entity.js'],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export default typeOrmConfig;
