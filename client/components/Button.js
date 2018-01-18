import React, { Component } from 'react';
import {
    Text,
    Animated,
    TouchableOpacity,
} from 'react-native';
import styles from '../styles';

class Button extends Component {
    render() {
        const props = this.props;
        return (
            <Animated.View
                ref={c => (this.component = c)}
                {...props}
                style={[styles.button, props.style]}
            >
                <TouchableOpacity onPress={props.onPress}>
                    <Text style={styles.buttonText}>{props.text}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

export default Button;
