import React, { Component } from 'react';
import {
    Animated,
    View,
    ScrollView,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles';

import Button from '../components/Button';
import MessageRight from '../components/MessageRight';
import MessageLeft from '../components/MessageLeft';
import randomNumber from '../random/randomNumber';

import loremipsum from 'lorem-ipsum-react-native';
import createAnimationHOC from '../hoc/createAnimationHOC';

const AnimatedMessageRight = createAnimationHOC(MessageRight);
const AnimatedButton = createAnimationHOC(Button);

class ChatAnimation extends Component {
    state = {
        messages: [],
        replyOptions: []
    };

    constructor(props) {
        super(props);
        this.replyOptionStyle = [
            { bottom: new Animated.Value(-100) },
            { bottom: new Animated.Value(-100) }
        ];
        this.scrollY = new Animated.Value(0);
    }

    componentDidMount() {
        this.addLeftMessage();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.selectedReply !== this.state.selectedReply &&
            this.state.selectedReply
        ) {
            this.props.animate(this.state.selectedReply.id);
        }
    }

    addLeftMessage(reply) {
        setTimeout(() => {
            let newMessages;
            if (reply) {
                newMessages = [
                    ...this.state.messages,
                    reply,
                    {
                        user: 'left',
                        text: loremipsum(),
                        id: randomNumber(1, 99999999)
                    }
                ];
            } else {
                newMessages = [
                    ...this.state.messages,
                    {
                        user: 'left',
                        text: loremipsum(),
                        id: randomNumber(1, 99999999)
                    }
                ];
            }
            this.setState({
                messages: newMessages,
                replyOptions: [
                    {
                        id: randomNumber(1, 99999999),
                        text: loremipsum({ count: 3, units: 'words' })
                    },
                    {
                        id: randomNumber(1, 99999999),
                        text: loremipsum({ count: 2, units: 'words' })
                    }
                ]
            });
            //this.scrollView.scrollToEnd();
        }, 1000);
    }

    selectReplyOption = replyOption => {
        this.setState({ selectedReply: replyOption });
        this.hideReplyOptions();
    };

    showReplyOptions = () => {
        Animated.stagger(
            100,
            this.state.replyOptions.map((replyOption, i) =>
                Animated.spring(this.replyOptionStyle[i].bottom, {
                    toValue: 0
                })
            )
        ).start();
    };

    hideReplyOptions = () => {
        Animated.stagger(
            100,
            this.state.replyOptions.map((replyOption, i) =>
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
                    onAnimationEnd={this.handleMessageLeftAnimationEnd}
                />
            );
        }
        return <MessageRight key={message.id} text={message.text} />;
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
                style={[{ marginRight: 10 }, this.replyOptionStyle[i]]}
                text={replyOption.text}
            />
        );
    };

    renderReplyOptionAsRightMessage = replyOption => {
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
    };

    handleReplayOptionAnimationEnd = () => {
        this.addLeftMessage(this.state.selectedReply);
    };


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
                    {this.state.messages.map(this.renderMessage)}
                    <View style={{ height: 40 }}>
                        {this.state.replyOptions.map(
                            this.renderReplyOptionAsRightMessage
                        )}
                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>
                <View style={styles.buttons}>
                    {this.state.replyOptions.map(this.renderReplyOption)}
                </View>
                {this.state.selectedReply && (
                    <AnimatedMessageRight
                        animationId={this.state.selectedReply.id}
                        animationType="middle"
                        text={this.state.selectedReply.text}
                    />
                )}
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

const mapStateToProps = (state, props) => state.animation[props.animationId] || {};
const mapDispatchToProps = {
    animate: animateAction,
    updateScrollData: updateScrollAction
};

const ChatAnimationRedux = connect(mapStateToProps, mapDispatchToProps)(ChatAnimation);

export default ChatAnimationRedux;

