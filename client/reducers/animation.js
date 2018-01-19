const defaultState = {
    diff: 0,
    height: 0,
};

const animationReducer = (
    state = defaultState,
    action
) => {
    switch (action.type) {
        case 'updateAction': {
            const stateForAnimationId = state[action.animationId] || {};
            const stateForAnimationType =
                stateForAnimationId[action.animationType] || {};

            return {
                ...state,
                [action.animationId]: {
                    ...stateForAnimationId,
                    [action.animationType]: {
                        ...stateForAnimationType,
                        x: action.x,
                        y: action.y
                    }
                }
            };
        }
        case 'animateAction':
            return {
                ...state,
                [action.animationId]: {
                    animate: true
                }
            };
        case 'updateScrollAction':
            return {
                ...state,
                diff: action.height - state.height,
                height: action.height
            };
        default:
            return state;
    }
};

export default animationReducer;
