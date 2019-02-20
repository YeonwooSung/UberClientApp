import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation'

import Main from './src/Main';
import RequestTripScreen from './src/container/RequestTripScreen';
import JourneyScreen from './src/container/Journey';
import CheckRequestScreen from './src/container/CheckRequest';

/* create stack navigator */
const AppStackNavigator = createStackNavigator({
  Main: { screen: Main },
  Request: { screen: RequestTripScreen },
  Journey: { screen: JourneyScreen },
  CheckRequest: { screen: CheckRequestScreen }
});

export default class App extends React.Component {
  render() {
    let Container = createAppContainer(AppStackNavigator);
    return (<Container />);
  }
}
