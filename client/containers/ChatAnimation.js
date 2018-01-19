import React, { Component } from 'react';
import {
    Animated,
    View,
    ScrollView,
    Text,
    Platform
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import styles from '../styles';

import Button from '../components/Button';
import MessageRight from '../components/MessageRight';
import MessageLeft from '../components/MessageLeft';
import randomNumber from '../random/randomNumber';
import ChatClient from '../services/ChatClient';

// import loremipsum from 'lorem-ipsum-react-native';
import createAnimationHOC from '../hoc/createAnimationHOC';
import { addBotMessageAction } from '../actions/actions';

const AnimatedMessageRight = createAnimationHOC(MessageRight);
const AnimatedButton = createAnimationHOC(Button);

class ChatAnimation extends Component {
    static navigationOptions = {
        title: 'Home',
    }

    state = {};

    constructor(props) {
        super(props);
        this.replyOptionStyle = [
            { bottom: new Animated.Value(-100) },
            { bottom: new Animated.Value(-100) },
            { bottom: new Animated.Value(-100) }
        ];
        this.scrollY = new Animated.Value(0);
        this.chatClient = new ChatClient('https://the-hacker-games-backend.now.sh');
    }

    componentDidMount() {
        if (Platform.OS === "android" && !Constants.isDevice) {
            this.setState({
                errorMessage:
                    "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
            });
        } else {
            this.getLocationAsync();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.selectedReply !== this.state.selectedReply &&
            this.state.selectedReply
        ) {
            this.props.animate(this.state.selectedReply.id);
        }
    }

    initChat(latitude, longitude) {
        this.chatClient.onQuestion(content => { 
            this.addLeftMessage(content);
        });
        this.chatClient.startChat({ latitude, longitude });
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            this.setState({
                errorMessage: "Permission to access location was denied"
            });
        }

        let location = await Location.getCurrentPositionAsync({});

        const { latitude, longitude } = location.coords;
        this.initChat(latitude, longitude);
    }

    addLeftMessage({ message, answers, _id, chat, link }) {
        console.log('add left message');
        setTimeout(() => {
            const botMessage = {
                user: 'left',
                text: message,
                id: _id,
                link: link,
                chat: chat,
            };

            this.props.addBotMessage(
                botMessage,
                answers,
            );
            this.scrollView.scrollToEnd();
        }, 1000);
    }

    selectReplyOption = replyOption => {
        this.setState({ selectedReply: replyOption });
        this.hideReplyOptions();
        this.chatClient.selectAnswer(replyOption.id);
        setTimeout(() => {
            this.props.addReplyMessage(replyOption);
            this.addMockLeftMessage();
        }, 500);
    };

    showReplyOptions = () => {
        Animated.stagger(
            100,
            this.props.replyOptions.map((replyOption, i) =>
                Animated.spring(this.replyOptionStyle[i].bottom, {
                    toValue: 0
                })
            )
        ).start();
    };

    hideReplyOptions = () => {
        //console.log('HIDE', this.props.replyOptions);
        Animated.stagger(
            100,
            this.props.replyOptions.map((replyOption, i) =>
                Animated.spring(this.replyOptionStyle[i].bottom, {
                    toValue: -100
                })
            )
        ).start();
    };

    renderMessage = message => {
        if (message.user === 'left') {
            return (
                <MessageLeft
                    key={message.id}
                    text={message.text}
                    chat={message.chat}
                    link={message.link}
                    onAnimationEnd={this.handleMessageLeftAnimationEnd}
                />
            );
        }
        return (
            <MessageRight
                key={message.id}
                text={message.text}
            />
        );
    };

    handleMessageLeftAnimationEnd = () => {
        this.showReplyOptions();
    };

    renderReplyOption = (replyOption, i) => {
        return (
            <AnimatedButton
                key={replyOption.id}
                animationId={replyOption.id}
                animationType="start"
                onPress={() => this.selectReplyOption(replyOption)}
                style={[{ marginRight: 10, marginTop: 10 }, this.replyOptionStyle[i]]}
                text={replyOption.text}
            />
        );
    };

    renderReplyOptionAsRightMessage = replyOption => {
        return null;
        /*
        return (
            <AnimatedMessageRight
                key={replyOption.id}
                animationId={replyOption.id}
                animationType="end"
                text={replyOption.text}
                style={{ position: 'absolute' }}
                onAnimationEnd={this.handleReplayOptionAnimationEnd}
            />
        );
        */
    };

    addMockLeftMessage = () => {
        this.addLeftMessage({
            _id: randomNumber(0, 0.999999),
            message: 'what time is it?',
            chat: 12345,
            answers: [
                {
                    message: 'yeah',
                    _id: randomNumber(0, 0.999999),
                },
                {
                    message: 'nope',
                    _id: randomNumber(0, 0.999999),
                },
                {
                    message: 'maybe',
                    _id: randomNumber(0, 0.999999),
                },
            ],
        });
    }

    handleReplayOptionAnimationEnd = () => {};

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={c => (this.scrollView = c)}
                    style={styles.messages}
                    contentContainerStyle={styles.messagesContentContainer}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.props.updateScrollData(contentHeight);
                        this.scrollView.scrollToEnd({ animated: true });
                    }}
                >
                    {this.props.messages.map(this.renderMessage)}
                    <View style={{ height: 40 }}>
                        {this.props.replyOptions.map(
                            this.renderReplyOptionAsRightMessage
                        )}
                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>
                <View style={styles.buttons}>
                    {this.props.replyOptions.map(this.renderReplyOption)}
                </View>
            </View>
        );
    }
}

const animateAction = animationId => ({
    type: 'animateAction',
    animationId
});
const updateScrollAction = height => ({
    type: 'updateScrollAction',
    height
});

const addReplyMessageAction = reply => ({
    type: 'addReplyMessage',
    messages: [ reply ],
});


const mapStateToProps = (state, props) => ({
    ...(state.animation[props.animationId] || {}),
    messages: state.messages.messages,
    replyOptions: state.messages.replyOptions,
});

const mapDispatchToProps = {
    animate: animateAction,
    updateScrollData: updateScrollAction,
    addBotMessage : addBotMessageAction,
    addReplyMessage: addReplyMessageAction,
};

const ChatAnimationRedux = connect(mapStateToProps, mapDispatchToProps)(ChatAnimation);

export default ChatAnimationRedux;
