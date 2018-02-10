import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import Camera from 'react-native-camera';

export default class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            price: '',
        }
    }

    onBarCodeRead = (e) => {
        return fetch("http://api.walmartlabs.com/v1/items?apiKey=khejcbpuydkfkvavg5v6q7qb&upc=" + e.data.slice(1))
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              item: responseJson.items[0]["name"],
              price: responseJson.items[0]["salePrice"]
            });
          })
          .catch((error) => {
            console.error(error);
          });
    }

    render () {
        return (
            <View style={styles.container}>
                <Camera
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={cam => this.camera = cam}
                    aspect={Camera.constants.Aspect.fill}
                    >
                        <Text style={styles.qr}>{this.state.item}</Text>
                        <Text style={styles.qr}>{this.state.price}</Text>
                    </Camera>
            </View>
        )
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
  },
  qr: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  }
});

module.exports = Scanner
