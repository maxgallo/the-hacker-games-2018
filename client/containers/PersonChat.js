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
                
                const roomToSubscribeTo = currentUser.rooms[0];
                
                if (roomToSubscribeTo) {
                    this.room = roomToSubscribeTo;
                    console.log("Going to subscribe to", roomToSubscribeTo);
                    // this.currentUser.subscribeToRoom(this.room, {
                    //     newMessage: this.handleNewMessage.bind(this)
                    // });     
                } else {
                    this.currentUser.createRoom(
                        { name: "PANDA" },
                        (room) => {
                          console.log(`Created public room called ${room.name}`);
                        },
                        (error) => {
                          console.log(`Error creating room ${error}`);
                        }
                    );
                    this.room = currentUser.rooms[0];
                }
                           
            },
            onError: error => {
                console.log("Error on connection");
            }
        });
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: "Hello developer",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "React Native",
                        avatar:
                            "http://images.mentalfloss.com/sites/default/files/jon_snow_hed.jpg?resize=1100x740"
                    }
                }
            ]
        });
    }

    handleNewMessage(message) {
        const updatedMessages = [...this.state.messages, message];
        this.setState({ messages: updatedMessages });
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
