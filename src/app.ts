import fs from 'fs';
import path from 'path';
// import http from 'http';
import https from 'https';
import Koa from 'koa';
import server from 'koa-static';

// import glob from 'glob';
import { createContainer, Lifetime } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';

import redis from './utils/redis'
import { firstCharUppercase } from './utils/utils';

const app = new Koa();
const container = createContainer();

// glob('./controllers/**/*.js', { cwd: __dirname }, function (er, files) {
//   // files is an array of filenames.
//   // If the `nonull` option is set, and nothing
//   // was found, then files is ["**/*.js"]
//   // er is an error object or null.
//   console.log(files);
// })

redis.setKey('ENV', 'https://rc-app.creams.io/api/web')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


process.on('unhandledRejection', (err) => {
  console.log('未捕获的异常信息:\n', err)
})

container.loadModules(['./service/**/*.ts'], {
  cwd: __dirname,
  formatName: (name: string, descriptor: any) => {
    const splat = descriptor.path.split('/')
    const namespace = splat[splat.length - 2] // `repository` or `service`
    name = firstCharUppercase(name);
    return `${namespace}${name}`
  },
  // 生命周期每次都创建实例
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  }
})

app.use(server(__dirname + '../dist'));
// app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
app.use(scopePerRequest(container));
// app.use(loadControllers('./controllers/*.js', { cwd: __dirname }));
app.use(loadControllers('./controllers/**/*.ts', { cwd: __dirname }));

// const config = {
//   // domain: '*',
//   // http: {
//   //   port: 8989,
//   // },
//   https: {
//     port: 8080,
//     options: {
//       key: fs.readFileSync(path.resolve(process.cwd(), './src/certs/rsa_private.key'), 'utf-8').toString(),
//       cert: fs.readFileSync(path.resolve(process.cwd(), './src/certs/cert.crt'), 'utf-8').toString(),
//       requestCert: true,
//       rejectUnauthorized: false,
//     },
//   },
// }

// try {
//   var httpServer = http.createServer(serverCallback);
//   httpServer
//     .listen(config.http.port, () => {
      
//     });
// } catch (ex) {
//   console.error('Failed to start HTTP server\n', ex, (ex && ex.stack));
// }

// try {
//   https
//     .createServer(config.https.options, app.callback())
//       .listen(config.https.port, function() {
//         console.log(`port is running: ${config.https.port}`)
//       });
// } catch (ex) {
//   console.error('Failed to start HTTPS server\n', ex, (ex && ex.stack));
// }

app.listen(8080, () => {
  console.log('port is running: 8080')
})