import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
	AsyncStorage,
} from 'react-native';

import  { Header, Left, Right, Icon } from 'native-base'

import axios from 'axios'

export default class HomeScreen extends React.Component {
  constructor() {
	super();
	this.state = {
		}
  }

	componentDidMount() {
		// console.log("user:", AsyncStorage.getItem('user'));
	}

  // Render any loading content that you like here
  render() {
	return (
	  <View style={{flex: 1}}>
            <Header style={{backgroundColor: '#6a89cc', height:70, flexDirection: 'row'}}>
                <Left><Icon style={{marginTop: 10, marginRight: 30, color: '#fff'}} name="menu" onPress={() => this.props.navigation.openDrawer()}/></Left>
                <Right><Icon style={{marginTop: 10, marginRight: 30, color: '#fff'}} name="person" onPress={() => this.props.navigation.navigate('User')}/></Right>
            </Header>
            <View style={styles.container}>
			    <Text style={styles.mainTitle}>Welcome to HOME PAGE</Text>
            </View>
	  </View>
	);
  }
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#fff',
	color:'black',
	},
  mainTitle: {
	justifyContent: 'center',
	fontSize: 32,
	color: 'black',
  },
});