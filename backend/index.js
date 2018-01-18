const mongoose = require('mongoose');

// load the config
const config = require('./config');

// create a logger instance
const createLogger = require('./lib/logger');
const logger = createLogger('the-hacker-games');

// start a socketIO server
const { createServer } = require('./lib/server');

// connect to mongo
const { connectDb } = require('./lib/db');
const models = require('require-all')(config.models);

// create an instance of the brain
const brain = require('./lib/brain')({ logger, models });

// load the socket event handlers
const handlers = require('./lib/handlers')(brain);

if (require.main === module) {
  const db = connectDb(Object.assign({}, config.db, { mongoose, logger }));
  const io = createServer(config, logger, handlers);
  // setTimeout(() => {
  //   brain.getQuestion({ level: 0 })
  //     .then(res => {
  //       console.log('TEST', res);
  //     });
  // }, 1500);
}

module.exports = createServer;