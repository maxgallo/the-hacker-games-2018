import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import styles from '../styles';

import { GiftedChat } from 'react-native-gifted-chat'

class PersonChat extends React.Component {
    static navigationOptions = {
        title: 'Julie',
    }

    state = {
        messages: [],
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                        avatar: 'http://images.mentalfloss.com/sites/default/files/jon_snow_hed.jpg?resize=1100x740',
                    },
                },
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        )
    }
}

export default PersonChat;
