// Reference: https://itunes.apple.com/us/app/quartz/id1076683233?mt=8
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { createStore, combineReducers } from 'redux';

import { AppRegistry } from 'react-native';
import reducers from './reducers/reducers';
import { addNavigationHelpers } from 'react-navigation';
import { connect }  from 'react-redux';

import { StackNavigator } from 'react-navigation';

import AppWithNavigationState from './AppNavigator';

const combinedReducers = combineReducers(reducers);

class App extends React.Component {
    store = createStore(combinedReducers);

    render() {
        return (
            <Provider store={this.store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}

//AppRegistry.registerComponent('App', () => App);

export default App;
