/* React library has a set of code which tells us how different components work 
together. no curly barckets are used in line 2 because we have imported the whole
library. */
import React from 'react';
/* React-native library knows how to take information from those components and 
use it to actually show some content on the mobile device. Curly brackets are 
used in line 8nbecause we want to import only some components from the library. 
React-navigation library is use dto show different screens to the user.*/
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TransactionScreen from './screens/BookTransactionScreen';
import SearchScreen from './screens/SearchScreen';
import LoginScreen from './screens/LoginScreen';


export default class App extends React.Component {
  render(){
    return (
      
        <AppContainer />
      
    );
  }   
}

const TabNavigator = createBottomTabNavigator({
  Transactions: {screen: TransactionScreen},
  Search: {screen: SearchScreen},
},
{

defaultNavigationOptions : ({navigation}) => ({
  tabBarIcon : () => {
    const routeName = navigation.state.routeName
    console.log(routeName);
    if(routeName === "Transactions"){
      return(
        <Image source = {require("./Images/book.png")} 
        style = {{width : 40, height : 40}}
        />
      )
    }
    else if(routeName === "Search") {
      return(
        <Image source = {require("./Images/searchingbook.png")}
        style = {{width : 40, height : 40}}
        />
      )
    }
  }
})
}
);

const SwitchNavigator = createSwitchNavigator({
  LoginScreen : {screen : LoginScreen},
  TabNavigator : {screen : TabNavigator}
})

const AppContainer =  createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
