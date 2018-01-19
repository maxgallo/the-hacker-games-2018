import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import styles from '../styles';

class PersonChat extends Component {
    static navigationOptions = {
        title: 'Julie',
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <View>
                <Text> Hello </Text>
            </View>
        );
    }
}

export default PersonChat;
