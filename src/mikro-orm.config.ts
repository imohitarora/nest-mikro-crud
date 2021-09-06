import { Options } from '@mikro-orm/core';

const config: Options = {
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  dbName: 'allio',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
};

export default config;
