
const updateAction = (x, y, animationId, animationType) => ({
    type: 'updateAction',
    x,
    y,
    animationId,
    animationType
});

export {
    updateAction,
};
