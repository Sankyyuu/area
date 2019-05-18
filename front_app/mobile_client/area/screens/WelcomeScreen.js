import React from 'react';
import {
	Platform,
	StatusBar,
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
	AsyncStorage,
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
import axios from 'axios'
import { Google } from 'expo';
// import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

const clientId = "438137435190-dstnk73mnt21e7sd2ijvuvj3e2q9bs0m.apps.googleusercontent.com";

export default class Auth extends React.Component {
  constructor() {
	super();
	this.state = {
			email: "",
			password: "",
			google_token: "",
		}
  }

  login = () => {
		if (!this.state.email || !this.state.password){
			this.refs.toast.show("please fill the form", 1000);
		}
		else {
			this.loginIn();
		}
	}

	loginIn = () => {
		axios.post('https://areaserver.herokuapp.com/login', {
			email: this.state.email,
			password: this.state.password
		},
		{ headers: {'Content-Type': 'application/json' }
		})
		.then((response) => {
			console.log("success");
			this.refs.toast.show("Succesfuly connected", 1000);
			//  AsyncStorage.setItem('user', response);
			this.props.navigation.navigate('Home');
		})
		.catch((error) => {
			console.log("failed:", error);
			this.refs.toast.show("log in failed, wrong email or password", 1000);
		});
	}
	
	loginGoogle = (token) => {
		console.log("token:", token)
		axios.post('https://areaserver.herokuapp.com/login/google', {} ,
		{ headers: {'Content-Type': 'application/json', 'access_token': token}
		})
		.then((response) => {
			console.log("success");
			this.refs.toast.show("Succesfuly connected with google", 1000);
			AsyncStorage.setItem('user', response);
			this.props.navigation.navigate('Home');
		})
		.catch((error) => {
			console.log("failed:", error);
			this.refs.toast.show("log in failed with Google", 1000);
		});
	}

	googleAuth = async () => {
		try {
			const result = await Expo.Google.logInAsync({
				androidClientId: clientId,
				//iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
				scopes: ["profile", "email"]

			})
			if (result.type === "success") {
				console.log("resulst:", result);
				this.loginGoogle(result.accessToken);
				//  this.props.navigation.navigate('Where you want to go');
 			} else {
	 console.log("cancelled")
 		}
		} catch (e) {
			console.log("error", e)
		}
	}

	checkEmail = (e) => {
		this.setState({email: e})
	}
	checkPassword = (e) => {
		this.setState({password: e})
	}

	redirectToSignUp = () => {
    this.props.navigation.navigate('SignUp');
	}
  // Render any loading content that you like here
  render() {
	return (
	  <View style={styles.container}>
			{/* <StatusBar barStyle="default" /> */}
			<Text style={styles.mainTitle}>Welcome to AREA</Text>
			<View style={{marginTop: 100}}>
				<TextInput style={styles.inputBox}
					placeholder="email"
					onChangeText={(text) => this.checkEmail(text)}
				/>
				<TextInput	style={styles.inputBox}
					placeholder="password"
					onChangeText={(text) => this.checkPassword(text)}
				/>
				<Button style={styles.buttonAction}
					onPress={this.login}
					title="LOGIN"
					color="#0a3d62"
				/>
				<Button style={styles.buttonAction}
					onPress={this.googleAuth}
					title="login with Google"
					color="#0a3d62"
				/>
				{/* <GoogleSigninButton
    			style={{ width: 192, height: 48 }}
    			size={GoogleSigninButton.Size.Wide}
    			color={GoogleSigninButton.Color.Dark}
    			onPress={this.googleAuth} /> */}
			</View>
			<Text>{this.state.google_token.accessToken}</Text>
			<View style={styles.signUpText}>
				<Text style={styles.signText}>Don't have an account yet? </Text>
				<Text style={styles.signUp} onPress={this.redirectToSignUp}> Sign Up</Text>
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