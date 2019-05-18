import React from 'react';
import {
	Platform,
	StatusBar,
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
import axios from 'axios'

export default class SignUp extends React.Component {
  constructor() {
	super();
	this.state = {
			email: "",
      password: "",
      username: "",
      password2: "",
		}
  }

  checkSignUp = () => {
		if (!this.state.username || !this.state.email || !this.state.password || !this.state.password2){
			this.refs.toast.show("please fill the form", 1000);
			return;
    }
    if (this.state.password != this.state.password2){
      this.refs.toast.show("passwords doesn't match", 2000);
			return;
    }
		else {
			this.signUp();
		}
	}

	signUp = () => {
		axios.post('https://areaserver.herokuapp.com/user/create', {
			username: this.state.username,
      email: this.state.email,
      password: this.state.password,
		},
		{ headers: {'Content-Type': 'application/json' },
		}).then((response) => {
      console.log("success:", response.message);
      AsyncStorage.setItem('user', "yes");
			this.refs.toast.show("User Succesfuly created", 1000);
		})
		.catch((error) => {
			console.log("success");
			this.refs.toast.show("Registration failed", 1000);
		});
	}
	
	checkEmail = (e) => {
		this.setState({email: e})
  }
  checkUsername = (e) => {
		this.setState({username: e})
  }
	checkPassword = (e) => {
		this.setState({password: e})
  }
  checkConfirmPassword = (e) => {
		this.setState({password2: e})
	}

	redirectToLogin = () => {
    this.props.navigation.navigate('Welcome');
	}
  // Render any loading content that you like here
  render() {
	return (
	  <View style={styles.container}>
			{/* <StatusBar barStyle="default" /> */}
			<Text style={styles.mainTitle}>Create your account</Text>
			<View style={{marginTop: 100}}>
      <TextInput style={styles.inputBox}
					placeholder="username"
					onChangeText={(text) => this.checkUsername(text)}
				/>
				<TextInput style={styles.inputBox}
					placeholder="email"
					onChangeText={(text) => this.checkEmail(text)}
				/>
				<TextInput	style={styles.inputBox}
					placeholder="password"
					onChangeText={(text) => this.checkPassword(text)}
				/>
        <TextInput	style={styles.inputBox}
					placeholder="confirm password"
					onChangeText={(text) => this.checkConfirmPassword(text)}
				/>
				<Button style={styles.buttonAction}
					onPress={this.checkSignUp}
					title="REGISTER"
					color="#0a3d62"
				/>
			</View>
			<View style={styles.signUpText}>
				<Text style={styles.signText}>Already have an account? </Text>
				<Text style={styles.signUp} onPress={this.redirectToLogin}> Log In</Text>
			</View>
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
	backgroundColor: '#3c6382',
	color:'white',
	paddingVertical: 40,
	},
	inputBox: {
		width: 300,
		height:42,
		backgroundColor: 'rgba(255, 255, 255, 0.25)',
		borderRadius: 25,
		paddingHorizontal: 16,
		fontSize: 16,
		color: '#fff',
		marginVertical: 10,
	},
  mainTitle: {
	justifyContent: 'center',
	fontSize: 32,
	color: '#fff',
  },
  signUpText: {
	flexGrow: 1,
	alignItems: 'center',
	justifyContent: 'flex-end',
	// marginVertical: 16,
	flexDirection: 'row',
	},
	signText: {
	fontSize:16,
	color: 'rgba(255,255,255,0.30)',
	},
  signUp: {
	color: '#fff',
	fontSize:16,
	},
	buttonAction: {
		width: 300,
		height:42,
		color: '#0a3d62',
		borderRadius: 25,
		paddingHorizontal: 16,
		marginHorizontal:16,
	}
});