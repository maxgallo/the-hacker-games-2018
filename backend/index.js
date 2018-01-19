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
const handlers = require('./lib/handlers')({ brain, config, logger });

if (require.main === module) {
  const db = connectDb(Object.assign({}, config.db, { mongoose, logger }));
  const io = createServer(config, logger, handlers);
  // setTimeout(async () => {

  //   const questions = await brain.getQuestion({ query: { level: -1 } });
  //   console.log('......', questions.length);

  //   let i = 0;

  //   const doSetTimeout = (question, i) => {
  //     setTimeout(() => {
  //       console.log(question.message);
  //     }, 1000 * i);
  //   };

  //   // let i = 0;
  //   for (question of questions) {
  //     doSetTimeout(question, i++)
  //   }
  // }, 500);

  // setTimeout( async () => {
  //   const answer = await brain.getAnswerById({ query: { id: '5a60bdaf734d1d1e13025fce' } });
  //   console.log(answer);

  //   const questions = await brain.getQuestion({ query: { _id: answer.nextQuestion } });
  //   console.log('questions to the answer', questions);
  // }, 3000);
  // setTimeout(async () => {
    // const answer = await brain.getAnswerById({ query: { id: '5a60bdaf734d1d1e13025fce' } });
  //   console.log('answer = ', answer)
  // }, 1500);
}

module.exports = createServer;