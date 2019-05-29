import { AppApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import * as fs from 'fs';



export { AppApplication };

export async function main(options: ApplicationConfig = {}) {

  const app = new AppApplication({

    rest: {
      port: process.env.PORT,

      cors: {
        origin: process.env.ORIGIN,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 86400,
        credentials: true,

      }
    }
  });

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}
