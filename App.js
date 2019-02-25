import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation'

import Main from './src/Main';
import RequestTripScreen from './src/container/RequestTripScreen';
import JourneyScreen from './src/container/Journey';
import CheckRequestScreen from './src/container/CheckRequest';
import LinkScreen from './src/container/LinkScreen';
import SummaryScreen from './src/container/SummaryScreen';
import LoadingScreen from './src/container/LoadingScreen';
import MarkScreen from './src/container/MarkScreen';

/* create stack navigator */
const AppStackNavigator = createStackNavigator({
  //Main: { screen: Main },
  MarkScreen: { screen: MarkScreen },
  Request: { screen: RequestTripScreen },
  Journey: { screen: JourneyScreen },
  CheckRequest: { screen: CheckRequestScreen },
  LinkScreen: { screen: LinkScreen },
  Summary: { screen: SummaryScreen },
  LoadingScreen: {screen: LoadingScreen}
});

export default class App extends React.Component {
  render() {
    let Container = createAppContainer(AppStackNavigator);
    return (<Container />);
  }
}
