import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
// const firstAction = AppNavigator.router.getActionForPathAndParams('BotChat');
// const tempNavState = AppNavigator.router.getStateForAction(firstAction);
// const initialNavState = AppNavigator.router.getStateForAction(
    // firstAction,
    // tempNavState
// );
const initialNavState = {};

function nav(state, action) {
    let nextState;
    switch (action.type) {
        case 'BotChat':
            nextState = AppNavigator.router.getStateForAction(
                //NavigationActions.back(),
                NavigationActions.init({ routeName: 'BotChat' }),
                state
            );
            break;
        case 'PersonChat':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'PersonChat' }),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

export default nav;
