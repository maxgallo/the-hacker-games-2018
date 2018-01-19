const bunyan = require('bunyan');

const createLogger = (name = 'hacker-games') => {
  const logger = bunyan.createLogger({ name });
  return logger;
};

module.exports = createLogger;
