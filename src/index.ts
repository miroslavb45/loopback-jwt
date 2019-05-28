import { AppApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { AppApplication };

export async function main(options: ApplicationConfig = {}) {
  const app = new AppApplication({
    rest: {
      port: 3000,
      cors: {
        origin: 'http://localhost:4200',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 86400,
        credentials: true,

      }
    },


  });
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  // console.log(`Try ${url}/ping`);

  return app;
}
