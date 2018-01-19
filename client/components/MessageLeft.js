import React, { Component } from 'react';
import {
    Text,
    Animated,
    View,
    TouchableHighlight,
    Linking,
} from 'react-native';
import styles from '../styles';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const localStyle = {
    icon: {
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
        console.log('onclick', this.isChat);
        if (this.props.chat) {
            console.log('open chat', this.props);
            this.props.goToChat();
            return;
        }
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
        let icon = null;

        const messageLeftContainerStyle = [
            styles.messageLeftContainer,
            this.style,
        ];

        if (this.props.chat) {
            icon = <Text style={localStyle.icon}>💬</Text>;
            messageLeftContainerStyle.push(
                localStyle.messageLeftContainer,
            );
        } else if (this.props.link) {
            icon = <Text style={localStyle.icon}>📖</Text>;
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
                { icon }
            </Animated.View>
        );
    }
}


const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
    goToChat: () => dispatch(NavigationActions.navigate({ routeName: 'PersonChat' })),
});

const MessageLeftRedux = connect(mapStateToProps, mapDispatchToProps)(MessageLeft);

export default MessageLeftRedux;
