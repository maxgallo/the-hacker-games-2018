const defaultState = {
    messages: [],
    replyOptions: []
};


const messagesReducer = (
    state = defaultState,
    action
) => {
    switch(action.type) {
        case 'addBotMessageAction': {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.messages
                ],
                replyOptions: action.replyOptions,
            };
        }
        default:
            return state;
    }
};


export default messagesReducer;
