import { AppApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import * as fs from 'fs';



export { AppApplication };

export async function main(options: ApplicationConfig = {}) {
  let config: ApplicationConfig = {

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
  };

  if (process.env.NODE_ENV === 'production') {
    config.rest.protocol = 'https';
    config.rest.key = fs.readFileSync('/etc/letsencrypt/live/devdevdev.tk/privkey.pem');
    config.rest.cert = fs.readFileSync('/etc/letsencrypt/live/devdevdev.tk/cert.pem')
  }

  const app = new AppApplication(config);

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}
