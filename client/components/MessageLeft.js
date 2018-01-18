import React, { Component } from 'react';
import {
    Text,
    Animated,
    View,
} from 'react-native';
import styles from '../styles';

class MessageLeft extends Component {
    constructor(props) {
        super(props);
        this.translateX = new Animated.Value(-1);
        this.style = {
            left: this.translateX.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
            })
        };
    }

    componentDidMount() {
        Animated.spring(this.translateX, {
            toValue: 0
        }).start(this.props.onAnimationEnd);
    }

    render() {
        const props = this.props;
        return (
            <Animated.View
                ref={c => (this.component = c)}
                {...props}
                style={[styles.messageLeftContainer, this.style]}
            >
                <View style={styles.messageLeft}>
                    <Text style={styles.messageLeftText}>{props.text}</Text>
                </View>
            </Animated.View>
        );
    }
}

export default MessageLeft;
