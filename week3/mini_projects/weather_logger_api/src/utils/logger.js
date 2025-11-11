// src/utils/logger.js
// simple EventEmitter logger - kayemit events li server yst3mlhom
const EventEmitter = require('events');
class MyLogger extends EventEmitter {}
const logger = new MyLogger();

logger.on('request:received', (d) => {
  console.log('[req]', d.method, d.url, JSON.stringify(d.query||{}));
});
logger.on('response:sent', (d) => {
  console.log('[res]', d.statusCode, d.route, d.durationMs + 'ms');
});
logger.on('export:completed', (d) => {
  console.log('[export]', d.count, 'items', d.bytes + ' bytes');
});

module.exports = logger;
