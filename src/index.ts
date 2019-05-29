import {AppApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import * as fs from 'fs';



export { AppApplication };

export async function main(options: ApplicationConfig = {}) {

  const app = new AppApplication({

	rest: {
	port: 3001,
 	protocol: 'https',
     	key: fs.readFileSync('/etc/letsencrypt/live/devdevdev.tk/privkey.pem'),
      	cert: fs.readFileSync('/etc/letsencrypt/live/devdevdev.tk/cert.pem'),   
 		cors: {
          origin: process.env.ORIGIN,
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          preflightContinue: false,
          optionsSuccessStatus: 204,
          maxAge: 86400,
          credentials: true,

        	} 
	}  });

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}
