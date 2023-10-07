import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';

import swaggerUi from 'swagger-ui-express';
import express from 'express';
import figlet from 'figlet';
import chalk from 'chalk';
import cors from 'cors';
import http from 'http';

import '@common/container';
import '@common/infra/typeorm/index';

import GlobalExceptionHandler from '@common/infra/http/middlewares/GlobalExceptionMiddleware';
import Routes from '@common/infra/http/routes';
import SwaggerOptions from '@docs/index';

class App {
  public readonly port: number = process.env.PORT ? Number(process.env.PORT) : 8081;

  private app: express.Application;

  public server: http.Server;

  private title: string;

  private info: string;

  constructor() {
    this.title = chalk.cyan(figlet.textSync('Snet Crud'));
    this.info = chalk.yellow(`Service running at port ${this.port}.`);
    this.app = express();
    this.server = http.createServer(this.app);
    this.middlewares();
    this.routes();
    this.swagger();
    this.start();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.use('/api/v1', Routes);
    this.app.use('/api/data', express.static('data'));
    this.app.use(GlobalExceptionHandler);
  }

  private swagger(): void {
    this.app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(SwaggerOptions, {
      swaggerOptions: { docExpansion: 'none' },
      customSiteTitle: 'SNet Api',
    }));
  }

  public start(): void {
    this.server.listen((this.port), () => {
      console.log(`${this.title}`);
      console.log(`${this.info}`);
    });
  }
}

export default new App();
