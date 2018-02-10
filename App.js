import React, {Component} from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import{ StackNav } from "./routers.js"
import MainList from './src/mainPage'
import Scanner from './src/Scanner'

export default class App extends Component {
    render () {
        return(
        <StackNav />
    )};
}
