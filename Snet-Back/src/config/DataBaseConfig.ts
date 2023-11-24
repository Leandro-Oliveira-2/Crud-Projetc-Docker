import 'dotenv/config';

interface IDatabaseConfig {
  type: 'mysql' | 'mariadb' | 'postgres' | 'cockroachdb' | 'sqlite' | 'mssql' | 'sap' | 'oracle' | 'cordova' | 'nativescript' | 'react-native' | 'sqljs' | 'mongoDATABASE' | 'aurora-data-api' | 'aurora-data-api-pg' | 'expo' | 'better-sqlite3';
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
  logging: boolean;
  ssl: boolean;
}

const databaseConfig: IDatabaseConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'viaduct.proxy.rlwy.net',
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'bcD6D5-E2Acd*g6*-GCBadbGaDgDdCca',
  database: process.env.DATABASE_DATABASE || 'railway',
  port: Number(process.env.DATABASE_PORT || 27484),
  logging: process.env.DATABASE_LOGGING === 'false',
  ssl: process.env.DATABASE_SSL === 'false',
};

export default databaseConfig as IDatabaseConfig;
