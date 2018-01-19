import React, { Component } from "react";
import { ChatManager, TokenProvider } from "pusher-chatkit-client/react-native";

import { Text, View } from "react-native";
import styles from "../styles";

import { GiftedChat } from "react-native-gifted-chat";

class PersonChat extends React.Component {
    static navigationOptions = {
        title: "Julie"
    };

    state = {
        messages: []
    };

    constructor() {
        super();
        const tokenProvider = new TokenProvider({
            url:
                "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/9f05b08d-52eb-45d0-a762-d8c36f3a063c/token?instance_locator=v1:us1:9f05b08d-52eb-45d0-a762-d8c36f3a063c",
            userId: "astelvida"
        });
        this.chatManager = new ChatManager({
            userId: "astelvida",
            instanceLocator: "v1:us1:9f05b08d-52eb-45d0-a762-d8c36f3a063c",
            tokenProvider
        });

        this.chatManager.connect({
            onSuccess: currentUser => {
                console.log("Successful connection");
                this.currentUser = currentUser;
                this.room = this.currentUser.rooms[1];
                this.currentUser.subscribeToRoom(this.room, {
                    newMessage: (message) => {
                        const isMe = message.sender.id === this.currentUser.id;
                        if (isMe) {
                            return;
                        }
                        const newMessage = {
                            _id: message.id,
                            text: message.text,
                            createdAt: new Date(),
                            user: {
                                _id: message.sender.id,
                                name: message.sender.name,
                                avatar: message.sender.avatarURL,
                            }
                        }
                        const updatedMessages = [newMessage, ...this.state.messages];
                        this.setState({ messages: updatedMessages });
                    }
                }, 0);     
                           
            },
            onError: error => {
                console.log("Error on connection");
            }
        });
    }

    componentWillMount() {
        this.setState({
            messages: []
        });
    }

    onSend(messages = []) {
        this.currentUser.sendMessage(
            {
                text: messages[0].text,
                roomId: this.room.id,
            },
            messageId => {
                console.log("Success!", messageId);
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, messages)
                }));
            },
            error => {
                console.log("Error", error);
            }
        );
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1
                }}
            />
        );
    }
}

export default PersonChat;

  // const roomToSubscribeTo = currentUser.rooms[0];
                
                // if (roomToSubscribeTo) {
                //     this.room = roomToSubscribeTo;
                //     console.log("Going to subscribe to", roomToSubscribeTo);
 
                // } else {
                    // this.currentUser.createRoom(
                    //     { 
                    //         name: "KOALA",
                    //         addUserIds: ['patrick'],
                    //     },
                    //     (room) => {
                    //         this.room = currentUser.rooms[1];
                    //         console.log(`Created public room called ${room.name}`);
                    //     },
                    //     (error) => {
                    //       console.log(`Error creating room ${error}`);
                    //     }
                    // );
                    // console.log(currentUser.rooms);
                // }