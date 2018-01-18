import React, { Component } from 'react';
import {
    Text,
    Animated,
} from 'react-native';
import * as config from '../config';

const styles = {
    messageRight: {
        ...config.buttonCss,
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    messageRightText: {
        ...config.buttonCssText,
        textAlign: 'right',
    },
};

class MessageRight extends Component {
    render() {
        const props = this.props;
        const viewStyle = [
            styles.messageRight,
            props.style,
        ];
        return (
            <Animated.View
                ref={c => (this.component = c)}
                {...props}
                style={viewStyle}
            >
                <Text style={styles.messageRightText}>{props.text}</Text>
            </Animated.View>
        );
    }
}

export default MessageRight;
