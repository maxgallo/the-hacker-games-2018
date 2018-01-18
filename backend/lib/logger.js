const bunyan = require('bunyan');

const createLogger = (name = 'logs') => {
  const logger = bunyan.createLogger({ name });
  return logger;
};

module.exports = createLogger;
