const mongoose = require('mongoose');

const { createServer } = require('./lib/server');
const config = require('./config');
const createLogger = require('./lib/logger');
const logger = createLogger('the-hacker-games');
const { connectDb } = require('./lib/db');
const models = require('require-all')(config.models);
const { Question } = models;

if (require.main === module) {
  const db = connectDb(Object.assign({}, config.db, { mongoose, logger }));
  const io = createServer(config, logger);


  // const Question = mongoose.model('Question', schemas.Question);

  // Question.find({ level: 0}, function (err, questions) {

  //   console.log(err, questions)
  // });
}

module.exports = createServer;