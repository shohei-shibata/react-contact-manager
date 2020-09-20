/* eslint-disable no-console */
const winston = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' })
  ]
});

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.log({
    level: 'info',
    message: `Feathers application started on http://${app.get('host')}:${port}`
  })
);
