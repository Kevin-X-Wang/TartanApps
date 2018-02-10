import React, {Component} from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import MainList from './src/mainPage'
import Scanner from './src/Scanner'

export const Tabs = TabNavigator({
  Scanner: {
    screen: Scanner,
    navigationOptions: {
      tabBarLabel: 'Scanner',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  MainList: {
    screen: MainList,
    navigationOptions: {
      tabBarLabel: 'MainList',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
