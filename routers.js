import React, {Component} from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import MainList from './src/mainPage'
import Scanner from './src/Scanner'

export const StackNav = StackNavigator({
  MainList: {
    screen: MainList,
    navigationOptions: {
      headerStyle: { backgroundColor: 'deepskyblue', borderWidth: 1, borderBottomColor: 'white' },
    },
  },
  Scanner: {
    screen: Scanner,
    navigationOptions: {
      headerStyle: { backgroundColor: 'deepskyblue', borderWidth: 1, borderBottomColor: 'white' },
    },
  },
});
