const { createServer } = require('./lib/server');
const config = require('./config');
const createLogger = require('./lib/logger');
const logger = createLogger('the-hacker-games');
const mongoose = require('mongoose');
const { connectDb } = require('./lib/db');

if (require.main === module) {
  const db = connectDb(Object.assign({}, config.db, { mongoose, logger }));
  const io = createServer(config, logger);
}

module.exports = createServer;