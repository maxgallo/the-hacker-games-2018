const getQuestion = ({ models, logger }) => params => {
  logger.info('brain.getQuestion', params);
  return new Promise(async (resolve, reject) => {
    try {

      const question = await models.Question
        .findOne(params)
        .populate('answers')
        .exec();

      logger.info('getQuestion', question)

      resolve(question);

    } catch (error) {
      logger.error('Error in brain.getQuestion', error);
      reject(error);
    }
  });
};

module.exports = ({ models, logger }) => ({
  getQuestion: getQuestion({ models, logger })
});
