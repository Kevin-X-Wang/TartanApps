import React, {Component} from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import MainList from './src/mainPage'
import Scanner from './src/Scanner'

export const StackNav= StackNavigator({
  MainList: {
    screen: MainList,
    navigationOptions: {
      tabBarLabel: 'Cart',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
  Scanner: {
    screen: Scanner,
    navigationOptions: {
      tabBarLabel: 'Scanner',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
});
