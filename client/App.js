// Reference: https://itunes.apple.com/us/app/quartz/id1076683233?mt=8
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { createStore, combineReducers } from 'redux';

import ChatAnimation from './containers/ChatAnimation';
import reducers from './reducers/reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default class App extends Component {
    // static navigationOptions = {
    //     header: null
    // };
    render() {
        return (
            <Provider store={store}>
                <ChatAnimation />
            </Provider>
        );
    }
}
