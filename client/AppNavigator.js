import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import ChatAnimation from './containers/ChatAnimation';
import PersonChat from './containers/PersonChat';

export const AppNavigator = StackNavigator(
    {
        // Login: { screen: LoginScreen },
        // Main: { screen: MainScreen },
        // Profile: { screen: ProfileScreen },
        BotChat: { screen: ChatAnimation },
        PersonChat: { screen: PersonChat },
    },
    {
        initialRouteName: 'BotChat'
    }
);

const AppWithNavigationState = ({ dispatch, nav }) => (
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
      dispatch: PropTypes.func.isRequired,
      nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
      nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
