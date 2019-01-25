import express from 'express';
import mongoose from 'mongoose';
import consola from 'consola';
import {
  Nuxt,
  Builder
} from 'nuxt';
const app = express();
import serverConfig from './config';
import api from './api'

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
      port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  mongoose.Promise = global.Promise;
  mongoose.connect(serverConfig.database, {
    useMongoClient: true
  });
  var db = mongoose.connection

  db.on('error', console.error.bind(console, '连接错误:'));
  db.once('open', function () {

    console.log('连接成功');
  })
  // Give nuxt middleware to express
  app.use('/api', api)
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
