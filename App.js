import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation'

import Main from './src/Main';

/* create stack navigator */
const AppStackNavigator = createStackNavigator({
  Main: { screen: Main },
});

export default class App extends React.Component {
  render() {
    let Container = createAppContainer(AppStackNavigator);
    return (<Container />);
  }
}
