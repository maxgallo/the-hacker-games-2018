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
    replyOptions
) {
    const whatToReturn = {
        type: 'addBotMessageAction',
        messages: [],
        replyOptions: replyOptions.map(option => ({
            id: option._id,
            text: option.message,
        })),
    };

    whatToReturn.messages.push(message);

    return whatToReturn;
}

export {
    updateAction,
    addBotMessageAction,
};
