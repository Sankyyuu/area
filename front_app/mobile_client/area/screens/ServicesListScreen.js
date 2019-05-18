import React from 'react';
import {
	StatusBar,
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
import TrelloLogin from "react-native-trello-login";
import axios from 'axios'

export default class ServicesListScreen extends React.Component {
  constructor() {
	super();
	this.state = {
		}
	}
	
	handleLoginSuccess = trelloAuthToken => {
    // The user authenticated successfully.
		// From now on you'll be able to use the Trello APIs using `trelloAuthToken`
		console.log("token trello:", trelloAuthToken);
  };

  handleLoginFailure = message => {
		// Handle the authentication failure (maybe by showing an alert?)
		console.log("trello failure:", message);
  };

  // Render any loading content that you like here
  render() {
	console.log("wtftttftf");
	return (
	  <View style={styles.container}>
			{/* <StatusBar barStyle="default" /> */}
			{/* <Text style={styles.mainTitle}>Choose your services</Text> */}
			<TrelloLogin
          applicationName="React Native Trello Login Example"
          onLoginSuccess={this.handleLoginSuccess}
          onLoginFailure={this.handleLoginFailure}
					trelloApiKey={"3dd511e3e9cf1694e070ecdfcc1d200f"}
					debugEnabled={true}
        />
			{/* <Toast ref="toast"></Toast> */}
	  </View>
	);
  }
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#3c6382',
	color:'white',
	paddingVertical: 40,
	},
  mainTitle: {
	justifyContent: 'center',
	fontSize: 32,
	color: '#fff',
  },
});