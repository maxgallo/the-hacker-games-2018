module.exports = ({ models }) =>
  userId =>
    await models.User
      .findById(userId)
      .populate({
        path: 'answers',
        populate: {
          path: 'condition',
          model: 'Condition'
        }
      })
      .exec();
