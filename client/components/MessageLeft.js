import React, { Component } from 'react';
import {
    Text,
    Animated,
    View,
    TouchableHighlight,
    Linking,
} from 'react-native';
import styles from '../styles';
const localStyle = {
    arrow: {
        fontSize: 30,
        marginLeft: 10,
        marginTop: 10,
    },
    messageLeftContainer: {
        flexDirection:'row',
        alignItems:'flex-start',
    },
    highlight: {
        borderRadius: 20,
        borderBottomLeftRadius: 2,
    },
};

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

    _onPressButton = () => {
        console.log('onclick');
        if (this.props.link) {
            Linking.canOpenURL(this.props.link).then(supported => {
                if (supported) {
                    Linking.openURL(this.props.link);
                } else {
                    console.log("Don't know how to open URI: " + this.props.link);
                }
            });
        }
    }

    render() {
        const props = this.props;
        let arrow = null;

        const messageLeftContainerStyle = [
            styles.messageLeftContainer,
            this.style,
        ];

        if (props.link) {
            arrow = <Text style={localStyle.arrow}>📖</Text>;
            messageLeftContainerStyle.push(
                localStyle.messageLeftContainer,
            );
        }

        return (
            <Animated.View
                ref={c => (this.component = c)}
                {...props}
                style={messageLeftContainerStyle}
            >
                <TouchableHighlight
                    style={localStyle.highlight}
                    onPress={this._onPressButton}
                >
                    <View style={styles.messageLeft}>
                        <Text style={styles.messageLeftText}>{props.text}</Text>
                    </View>
                </TouchableHighlight>
                { arrow }
            </Animated.View>
        );
    }
}

export default MessageLeft;
