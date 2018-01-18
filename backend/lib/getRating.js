module.exports = ({models, logger}) =>
    async userId => {
        logger.info('getRating', userId);
        
        const user = await models.User
            .findById(userId)
            .populate({ 
                path: 'answers',
                populate: {
                  path: 'condition',
                  model: 'Condition'
                } 
             })
            .exec();

        const conditionRating = user.answers.reduce((acc, {
            condition,
            weight,
        }) => {
            const cond = condition.message;
            acc[cond] = acc[cond] || 0;
            acc[cond] += weight;
            return acc;
        }
        ,{});
        
        return conditionRating;
    }