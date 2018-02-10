import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import Scanner from './src/Scanner.js'

export default class App extends Component {
    render () {
        return (
            <Scanner></Scanner>
        )
    }
}
