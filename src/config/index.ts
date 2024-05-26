import { config } from 'dotenv';
config({ path: `.env.${process.env.ENV || 'dev'}` });

// If .env wasn't provided then exit
if (!process.env.PORT) {
  console.error('==> Please check your .env');
  process.exit(1);
}

export const PRODUCTION_ENV = process.env.ENV === 'prod';
export const DEV_ENV = process.env.ENV === 'dev';
export const TESTING_ENV = process.env.ENV === 'test';
export const CI_ENV = process.env.ENV === 'ci';

export const {
  ENV,
  PORT,
  TYPEORM_PORT,
  TYPEORM_HOST,
  TYPEORM_TYPE,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_LOGGING,
  TYPEORM_MIGRATIONS_RUN,
  URL_TYPEORM,
} = process.env;
