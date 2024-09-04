import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3307,
  username: 'root',
  password: '123',
  database: 'AdaptEd',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
};

export default config;

// type: 'mysql',
// host: 'localhost',
// port: 3307,
// username: 'root',
// password: '123',
// database: 'AdaptEd',
// entities: [Login],
// autoLoadEntities: true,
// synchronize: true,
