/**
 * Emits a message to the client with a delay of N milliseconds
 */
const sendMessage = (socket, event, payload, messageIndex, logger, totalMessages) => {

  const typingSpeed = getTypingSpeed(payload.message) * messageIndex;
  setTimeout(() => {
    socket.emit(event, JSON.stringify(payload));
    logger.info(`[${event}] emit [typingSpeed: ${typingSpeed} ms]`, payload.message);
    if (messageIndex+1 !== totalMessages) {
      setTimeout(() => {
        sendTpyingEvent(socket, 'TYPING', logger);
      }, 1000);
    }
  }, typingSpeed);
};

/**
 * Generate a "realistic" typing time for the bot
 */
const getTypingSpeed = message => {
  const charsLen = message.length;
  const min = 1000;
  const randomFactor = Math.random() * 1000;
  return min + randomFactor + (charsLen * 15);
};

/**
 * Send a typing event to inform the client that the bot is typing
 */
const sendTpyingEvent = (socket, event, logger) => {
  socket.emit(event, '');
  logger.info(`[${event}] the bot is typing ......`);
};

/**
 *
 */
const fetchQuestionsChain = async ({ brain, config, socket, params, logger }) => {
  const questions = await brain.getQuestion(params);
  let index = 0;
  for (let question of questions) {
    sendMessage(socket, config.chatEvents.QUESTION, question, index++, logger, questions.length);
  }
};

/**
 * Socket Handler for the 'connection' event
 */
const connection = ({ brain, config, logger }) => socket => {

  logger.info('connected to client');

  // Start chat handler
  logger.info(`listening to, ${config.chatEvents.START_CHAT}`);
  socket.on(config.chatEvents.START_CHAT, async payload => {
    fetchQuestionsChain({
      brain,
      config,
      params: {
        query: {
          level: -1
        }
      },
      logger,
      socket
    });
  });

  // Answers handler
  logger.info(`listening to, ${config.chatEvents.ANSWER}`);
  socket.on(config.chatEvents.ANSWER, async payload => {
    logger.info(`[${config.chatEvents.ANSWER}] event received`, payload);
    if (!payload) {
      logger.info('client is trolling me with an empty answer!!!');
    }
    try {
      // const message = JSON.parse(payload);
      const answer = await brain.getAnswerById({ query: { id: payload } });
      if (answer.nextQuestion) {
        logger.info('the answer was given, fetching the next question', answer.nextQuestion.toString());
        fetchQuestionsChain({
          brain,
          config,
          params: {
            query: {
              _id: answer.nextQuestion.toString()
            }
          },
          logger,
          socket
        });
      }
    } catch (error) {
      logger.error(`Error on ${config.chatEvents.ANSWER} event`, payload, error);
    }
  });
};

module.exports = ({ brain, config, logger }) => ({
  connection: connection({ brain, config, logger })
});
