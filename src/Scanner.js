import React, {Component} from 'react';
import {Text, View, StyleSheet, Modal, Button, AsyncStorage} from 'react-native';

import Camera from 'react-native-camera';
import MainList from './mainPage'

export default class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            price: '',
            modalVisible: false,
        }
    }

    closeModal(item, price) {
        this.props.navigation.state.params.addToCart(item, price, 1);
        this.setState({modalVisible:false});
    }

    onBarCodeRead = (e) => {
        return fetch("http://api.walmartlabs.com/v1/items?apiKey=khejcbpuydkfkvavg5v6q7qb&upc=035000521019")
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              item: responseJson.items[0]["name"],
              price: responseJson.items[0]["salePrice"].toFixed(2),
              modalVisible: true
            });
          })
          .catch((error) => {
            console.error(error);
          });
    }

    render () {
        return (
            <View style={styles.container}>
            <Modal visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
              transparent
            >
                <View style={styles.modalContainer}>
                  <View style={styles.modalInner}>
                    <Text style={styles.textStyle}>{this.state.item}</Text>
                    <Text style={styles.bigTextStyle}>{this.state.price}</Text>
                    <Button
                        onPress={() => this.closeModal(this.state.item, this.state.price)}
                        title="Close modal"
                    >
                    </Button>
                  </View>
                </View>
            </Modal>
            <Camera
                style={styles.preview}
                onBarCodeRead={this.onBarCodeRead}
                ref={cam => this.camera = cam}
                aspect={Camera.constants.Aspect.fill}
            >
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
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  },
  bigTextStyle: {
    textAlign: 'center',
    fontSize: 60,
    fontWeight: 'bold',
    color: 'red'
  },
  modalContainer: {
    flex: 1,
    marginTop: 200,
    marginBottom: 200,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  modalInner: {
    alignItems: 'center',
  }
});

module.exports = Scanner
