import { DataSource, DataSourceOptions } from 'typeorm';
import { TYPEORM_TYPE, URL_TYPEORM } from '@config';

export const dataSourceOptions: DataSourceOptions = {
  type: TYPEORM_TYPE as 'mysql' | 'postgres' | 'mongodb',
  url: URL_TYPEORM,
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
};
const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
