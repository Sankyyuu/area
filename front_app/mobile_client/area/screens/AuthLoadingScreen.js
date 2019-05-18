import React from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    AsyncStorage
  } from 'react-native';

export default class AuthLoading extends React.Component {
  constructor() {
    super();
    this.loadApp();
  }

  // Fetch the token from storage then navigate to our appropriate place
  loadApp = async () => {
    const user = await AsyncStorage.getItem('user');
    this.props.navigation.navigate(user ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        {/* <Text style={styles.mainTitle}>Welcome!</Text> */}
        <ActivityIndicator style={styles.loader} size="large" color="#60a3bc"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3c6382'
  },
  mainTitle: {
    justifyContent: 'center',
    fontSize: 32,
    color: '#fff',
  },
  loader: {
    marginTop: 60,
  }
});
