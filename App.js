import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation'

import Main from './src/Main';
import RequestTripScreen from './src/container/RequestTripScreen';

/* create stack navigator */
const AppStackNavigator = createStackNavigator({
  Main: { screen: Main },
  Request: { screen: RequestTripScreen }
});

export default class App extends React.Component {
  render() {
    let Container = createAppContainer(AppStackNavigator);
    return (<Container />);
  }
}
