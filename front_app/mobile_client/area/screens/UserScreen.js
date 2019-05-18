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
import axios from 'axios'

export default class UserScreen extends React.Component {
  constructor() {
	super();
	this.state = {
		}
  }

  // Render any loading content that you like here
  render() {
	return (
	  <View style={styles.container}>
			{/* <StatusBar barStyle="default" /> */}
			<Text style={styles.mainTitle}>Profile</Text>
			<Toast ref="toast"></Toast>
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
	color:'white',
	paddingVertical: 40,
	},
  mainTitle: {
	justifyContent: 'center',
	fontSize: 32,
	color: '#fff',
  },
});