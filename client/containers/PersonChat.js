import React, { Component } from 'react';
import { ChatManager, TokenProvider } from "pusher-chatkit-client/react-native";

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

    constructor() {
        super();
        const tokenProvider = new TokenProvider({
            url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/9f05b08d-52eb-45d0-a762-d8c36f3a063c/token?instance_locator=v1:us1:9f05b08d-52eb-45d0-a762-d8c36f3a063c",
            userId: "astelvida"
        });
        this.chatManager = new ChatManager({
            userId: "astelvida",
            instanceLocator: "v1:us1:9f05b08d-52eb-45d0-a762-d8c36f3a063c",
            tokenProvider,
        });

        this.chatManager.connect({
            onSuccess: (currentUser) => {
              console.log("Successful connection");
            },
            onError: (error) => {
              console.log("Error on connection");
            }
        });

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
