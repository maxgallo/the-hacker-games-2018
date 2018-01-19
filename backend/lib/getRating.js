module.exports = ({ logger }) =>
  user => {
    logger.info('getRating', user);

    const conditionRating = user.answers.reduce((acc, {
            condition,
      weight,
        }) => {
      const cond = condition.message;
      acc[cond] = acc[cond] || 0;
      acc[cond] += weight;
      return acc;
    }
      , {});

    return conditionRating;
  }