import randomNumber from '../random/randomNumber';

const updateAction = (
    x,
    y,
    animationId,
    animationType
) => ({
    type: 'updateAction',
    x,
    y,
    animationId,
    animationType
});


function addBotMessageAction (
    message,
    replyOptions,
    reply
) {
    const whatToReturn = {
        type: 'addBotMessageAction',
        messages: [],
        replyOptions,
    };

    if (reply) {
        whatToReturn.messages.push(reply);
    }
    whatToReturn.messages.push(message);

    return whatToReturn;
}

export {
    updateAction,
    addBotMessageAction,
};
