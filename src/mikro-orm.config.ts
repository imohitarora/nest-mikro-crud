import { Options } from '@mikro-orm/core';

const config: Options = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  dbName: 'allio',
  type: 'postgresql',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
};

export default config;
