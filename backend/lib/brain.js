let index = 0;

const getQuestion = ({ models, logger }) => params => {
  // logger.info('brain.getQuestion', params);
  console.log('index = ', index++);
  return new Promise(async (resolve, reject) => {
    try {

      if (!params.queue) {
        params.queue = [];
      }

      const question = await models.Question
        .findOne(params.query)
        .populate('answers')
        .exec();

      // logger.info('getQuestion', question)

      params.queue.push(question);

      if (question.nextQuestion.length > 0) {
        console.log('recursion', index);
        await getQuestion({ models, logger })(Object.assign({}, params, { query: { _id: question.nextQuestion } }));
      }

      console.log('getQuestion COMPLETE', params.queue)
      resolve(params.queue);
      console.log('done');

    } catch (error) {
      logger.error('Error in brain.getQuestion', error);
      reject(error);
    }
  });
};

module.exports = ({ models, logger }) => ({
  getQuestion: getQuestion({ models, logger })
});
