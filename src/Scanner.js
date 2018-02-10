import React, {Component} from 'react';
import {Text, View, StyleSheet, Modal, Button, AsyncStorage} from 'react-native';

import Camera from 'react-native-camera';
import MainList from './mainPage'

export default class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {name: '', price: 0, quantity: 0}, //name, price, quantity
            modalVisible: false,
        }
    }

    closeModal(item) {
        this.props.navigation.state.params.addToCart(item);
        this.setState({modalVisible:false});
    }

    onBarCodeRead = (e) => {
        return fetch("http://api.walmartlabs.com/v1/items?apiKey=khejcbpuydkfkvavg5v6q7qb&upc=" + e.data.slice(1))
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              item: {name: responseJson.items[0]["name"], price: parseFloat(responseJson.items[0]["salePrice"].toFixed(2)), quantity: 1},
              //price: responseJson.items[0]["salePrice"].toFixed(2),
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
                    <Text style={styles.textStyle}>{this.state.item.name}</Text>
                    <Text style={styles.bigTextStyle}>{this.state.item.price}</Text>
                    <Button
                        onPress={() => this.closeModal(this.state.item)}
                        title="Put in Cart"
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
    color: '#19A8D9'
  },
  bigTextStyle: {
    textAlign: 'center',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#19A8D9'
  },
  modalContainer: {
    flex: 1,
    marginTop: 200,
    marginBottom: 200,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#24352d',
  },
  modalInner: {
    alignItems: 'center',
  }
});

module.exports = Scanner
