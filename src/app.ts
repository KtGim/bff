import Koa from 'koa';
import server from 'koa-static';
// import glob from 'glob';

import { createContainer, Lifetime } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';

import redis from './utils/redis'

const app = new Koa();
const container = createContainer();

// glob('./controllers/**/*.js', { cwd: __dirname }, function (er, files) {
//   // files is an array of filenames.
//   // If the `nonull` option is set, and nothing
//   // was found, then files is ["**/*.js"]
//   // er is an error object or null.
//   console.log(files);
// })

redis.setKey('ENV', 'https://rc-api.creams.io')

container.loadModules(['./service/**/*.js'], {
  cwd: __dirname,
  formatName: 'camelCase',
  // 生命周期每次都创建实例
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  }
})

app.use(server(__dirname + '../dist'));
// app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
app.use(scopePerRequest(container));
// app.use(loadControllers('./controllers/*.js', { cwd: __dirname }));
app.use(loadControllers('./controllers/**/*.js', { cwd: __dirname }));

app.listen(8080, () => {
  console.log('port is running: 8080')
})
