import React, { Component } from 'react';
import {
    Animated,
    findNodeHandle,
    UIManager,
} from 'react-native';

import { connect } from 'react-redux';
import {
    HEADER_OFFSET,
    WINDOW_HEIGHT
} from '../config';
import { updateAction } from '../actions/actions';

const createAnimationHOC = Comp => {
    class AnimationHOC extends Component {
        constructor(props) {
            super(props);
            this.style = { opacity: new Animated.Value(0) };

            if (props.animationType === 'start') {
                this.style.opacity.setValue(1);
            } else if (props.animationType === 'middle') {
                this.style = {
                    ...this.style,
                    position: 'absolute',
                    top: new Animated.Value(0),
                    left: new Animated.Value(0)
                };
            }
            // else if (props.animationType === 'end') {
            // }
        }
        componentWillReceiveProps(nextProps) {
            if (nextProps.animate !== this.props.animate && nextProps.animate) {
                this.animate();
            }
        }
        animate() {
            if (this.props.animationType === 'start') {
                this.style.opacity.setValue(0);
            } else if (this.props.animationType === 'middle') {
                // this.style.opacity.setValue(1);
                // this.style.top.setValue(this.props.start.y);
                // this.style.left.setValue(this.props.start.x);
                // this.animation = Animated.sequence([
                    // Animated.parallel([
                        // Animated.timing(this.style.top, {
                            // toValue: this.props.end.y,
                            // duration: 500
                        // }),
                        // Animated.timing(this.style.left, {
                            // toValue: this.props.end.x,
                            // duration: 500
                        // })
                    // ]),
                    // Animated.timing(this.style.opacity, {
                        // toValue: 0,
                        // duration: 0
                    // })
                // ]);
                // this.animation.start();
            } else if (this.props.animationType === 'end') {
                this.animation = Animated.sequence([
                    Animated.delay(500),
                    Animated.timing(this.style.opacity, {
                        toValue: 1,
                        duration: 0
                    })
                ]);
                this.animation.start(this.props.onAnimationEnd);
            }
        }
        handleLayout = event => {
            const handle = findNodeHandle(this.component.component);
            UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                this.props.updateAnimationData(
                    pageX,
                    pageY -
                        HEADER_OFFSET -
                        (this.props.animationType === 'end' &&
                        this.props.scrollViewHeight > WINDOW_HEIGHT &&
                        this.props.scrollDiff > 0
                            ? this.props.scrollDiff
                            : 0),
                    this.props.animationId,
                    this.props.animationType
                );
            });
        };
        render() {
            const { end, start, animationType, style, ...props } = this.props;
            return (
                <Comp
                    ref={c => (this.component = c)}
                    {...props}
                    onLayout={
                        animationType !== 'middle'
                            ? this.handleLayout
                            : undefined
                    }
                    style={[style, this.style]}
                />
            );
        }
    }
    const mapStateToProps = (state, props) => ({
        ...(state.animation[props.animationId] || {}),
        scrollViewHeight: state.animation.height,
        scrollDiff: state.animation.diff
    });
    const mapDispatchToProps = {
        updateAnimationData: updateAction
    };
    return connect(mapStateToProps, mapDispatchToProps)(AnimationHOC);
};


export default createAnimationHOC;
