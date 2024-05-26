import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {
  TYPEORM_HOST,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_TYPE,
} from '@config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPEORM_TYPE as 'mysql' | 'postgres' | 'mongodb',
      host: TYPEORM_HOST,
      port: 5432,
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      entities: [],
      synchronize: true,
      ssl: true as boolean,
      autoLoadEntities: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
