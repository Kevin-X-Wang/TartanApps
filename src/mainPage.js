import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, 
  AsyncStorage,
  Button,
  TextInput,
  Keyboard,
  Platform} from 'react-native';

export default class MainList extends Component {
	state = {
		names: [], //items of form (name, price, quantity)
        prices: [],
        quantities: [],
        pictures: [],
		totalprices: 0
	};
    
    //adds item to cart at the end of cart
	addToCart(name, price, quantity, picture){
		this.setState(
			(prevState) => {
				return {
					names: prevState.names.push(name),
					prices: prevState.prices.push(price),
					quantities: prevState.quantities.push(quantity),
					pictures: prevState.pictures.push(picture),
					totalprices: prevState.totalprices + price*quantity,
				};
			},
			() => AsyncStorage.setItem("CART", this.state) //callback
		);
	};

    //removes item from cart at index index
    deleteFromCart(index){
        let requires = index < this.state.names.length

		if(requires) {
			this.setState(
				(prevState) => {
					let quantity = prevState.quantities[index];
					let price = prevState.prices[index];
					if(quantity = 1){
						return{
							names: prevState.names.slice(index,1),
							prices: prevState.prices.slice(index,1),
							quantities: prevState.quantities.slice(index,1),
							pictures: prevState.pictures.slice(index,1),
							totalprices: prevState.totalprices - price,

						};
					};
					prevState.quantities[index] = quantity - 1;
					return {
						names: prevState.names,
						prices: prevState.prices,
						quantities: prevState.quantities,
						pictures: prevState.pictures.slice(index,1),
						totalprices: prevState.totalprices - price,
					};
				},
				() => AsyncStorage.setItem("CART", this.state)//need function in Cart that saves state
			);
		}
    };


  render() {
    return (
      <View>
      	<Text> HEllo World! </Text>
      </View>
    );
  }
    
};


module.export = MainList;