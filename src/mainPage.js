import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View,
  AsyncStorage,
  Button,
  TextInput,
  Keyboard,
  Platform} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

export default class MainList extends Component {
	state = {
		names: [], //items of form (name, price, quantity)
        prices: [],
        quantities: [],
        //pictures: [],
		totalprices: 0
	};

    //adds item to cart at the end of cart
	addToCart(name, price, quantity){
		this.setState(
			(prevState) => {
				return {
					names: prevState.names.push(name),
					prices: prevState.prices.push(price),
					quantities: prevState.quantities.push(quantity),
					//pictures: prevState.pictures.push(picture),
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
							//pictures: prevState.pictures.slice(index,1),
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
      <View style = {styles.container}>
      <FlatList
          style={styles.list}
          data={this.state.names}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <Button title="X" onPress={() => this.deleteFromCart(index)} />
              </View>
              <View style={styles.hr} />
            </View>}
        />
        <Button
          onPress={() => navigate('Scanner', { state: this.state })}
          title="Go to Second Screen"
        />
        </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 10,
    paddingTop: 20
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: (Platform.OS == "android") ? 0 : 1,
    width: "100%"
  }
});
module.export = MainList;
