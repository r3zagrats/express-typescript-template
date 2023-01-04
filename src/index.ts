/* eslint-disable import/first */
import http from 'http';
import ConfigService from './common/service/config/config.service';

global.Config = new ConfigService();

import LogService from './common/service/logger/log.service';

global.Logger = new LogService();

import app from './app';

const port = process.env.PORT || 4444;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.requestTimeout = 60000;
server.setTimeout(60000);
server.keepAliveTimeout = 59000;
server.headersTimeout = 11000;

server.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      Logger.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', async () => {
  Logger.log(`Server is listening on port: ${port}`);
});
