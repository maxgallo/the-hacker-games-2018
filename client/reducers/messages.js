const defaultState = {
    typing: false,
    messages: [],
    replyOptions: []
};

const messagesReducer = (
    state = defaultState,
    action
) => {
    switch(action.type) {
        case 'typingAction': {
            return {
                ...state,
                typing: true,
                replyOptions: [],
            };
        }
        case 'addBotMessageAction': {
            // console.log('add bot message action', action.messages);
            // console.log('--------', action.messages);
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.messages
                ],
                typing: false,
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
