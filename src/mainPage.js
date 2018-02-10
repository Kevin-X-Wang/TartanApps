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
		items: [], //items of form (name, price, quantity)
		totalprices: 0.00
	};

    //adds item to cart at the end of cart
	addToCart(item){
		this.setState(
			(prevState) => {
				let {items, totalprices} = prevState;
				return {
					items: items.concat(item),
					totalprices: totalprices + item.price
				};
			},
			//() => AsyncStorage.setItem("CART", this.state) //callback
		);
	};

    //removes item from cart at index index
    deleteFromCart(index){
		if(index >= 0) {
			this.setState(
				(prevState) => {
					let {items, totalprices} = prevState;
					const price = items.splice(index, 1)[0].price
					return {
						items: items,
						totalprices: totalprices - price,
					};
				},
				//() => AsyncStorage.setItem("CART", this.state)//need function in Cart that saves state
			);
		}
    };

  render() {
    return (
      <View style = {styles.container}>
      <Text style = {styles.listItem}>{"Total Price: $"+this.state.totalprices}</Text>
      <FlatList
          style={styles.list}
          data={this.state.items}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item.name.slice(0, 20) + "...    $"}
                  {item.price}
                </Text>
                <Button title="X" onPress={() => this.deleteFromCart(index)} />
              </View>
              <View style={styles.hr} />
            </View>}
        />
        <View>
        </View>
        <Button
          onPress={() => this.props.navigation.navigate("Scanner",
                        {addToCart: (item) => this.addToCart(item)})}
          title="Please Scan Your Items"
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
    backgroundColor: "#D7F9F6",
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
