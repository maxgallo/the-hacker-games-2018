import animationReducer from './animation';
import messagesReducer from './messages';
import navReducer from './navigation'

console.log('reduceer', navReducer);

const reducers = {
    animation: animationReducer,
    messages: messagesReducer,
    nav: navReducer,
};

export default reducers;
