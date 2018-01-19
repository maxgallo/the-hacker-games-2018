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
            // console.log('add bot message action', action.messages);
            // console.log('--------', action.messages);
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.messages
                ],
                replyOptions: action.replyOptions,
            };
        }
        case 'addReplyMessage': {
            return  {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.messages,
                ],
            }

        }
        default:
            return state;
    }
};


export default messagesReducer;
