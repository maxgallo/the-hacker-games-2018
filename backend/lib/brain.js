const _fetchQuestion = ({models, logger}) => params => {
  logger.info('brain._fetchQuestion', params);
  return models.Question.find(params);
};

const _fetchQuestionAnswers = models => (params) => {
  // TODO
};

const getQuestion = ({ models, logger }) => params => {
  logger.info('brain.getQuestion', params);
  return new Promise(async (reject, resolve) => {
    try {
      const question = await _fetchQuestion({ models, logger })(params);
      logger.info('question ', question);
    } catch (error) {
      logger.error('ERROR', error);
    }
  });
};

module.exports = ( {models, logger }) => ({
  getQuestion: getQuestion({ models, logger })
});
