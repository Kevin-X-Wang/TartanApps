import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import Camera from 'react-native-camera';
import MainList from './src/mainPage'
export default class App extends Component {

    render () {
        return(
        <MainList>

        </MainList>
    );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
