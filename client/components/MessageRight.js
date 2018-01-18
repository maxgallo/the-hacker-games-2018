import React, { Component } from 'react';
import {
    Text,
    Animated,
} from 'react-native';
import styles from '../styles';

class MessageRight extends Component {
    render() {
        const props = this.props;
        return (
            <Animated.View
                ref={c => (this.component = c)}
                {...props}
                style={[styles.messageRight, props.style]}
            >
                <Text style={styles.messageRightText}>{props.text}</Text>
            </Animated.View>
        );
    }
}

export default MessageRight;
