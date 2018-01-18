import React, { Component } from 'react';
import {
    Text,
    Animated,
    TouchableOpacity,
} from 'react-native';
import * as config from '../config';

class Button extends Component {
    render() {
        const props = this.props;
        return (
            <Animated.View
                ref={c => (this.component = c)}
                {...props}
                style={[config.buttonCss, props.style]}
            >
                <TouchableOpacity onPress={props.onPress}>
                    <Text style={config.buttonCssText}>{props.text}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

export default Button;
