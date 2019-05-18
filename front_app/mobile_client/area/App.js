import React from 'react'

import {
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator,
  createStackNavigator,
  DrawerItems,
  } from 'react-navigation'

import {
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';

//Authentification
import AuthLoading from './screens/AuthLoadingScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import SignUpScreen from './screens/SignUpScreen'

//app screens
import HomeScreen from './screens/HomeScreen'
import ServicesListScreen from './screens/ServicesListScreen'
import UserScreen from './screens/UserScreen'


const {width} = Dimensions.get('window')
const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex:1}}>
    <View></View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)

const AuthStackNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  SignUp: SignUpScreen,
})

const AppStackNavigator = createDrawerNavigator({
  Home: HomeScreen,
  ServicesList: ServicesListScreen,
  User: UserScreen,
}, {
  contentComponent: CustomDrawerComponent,
})

export default createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoading,
  Auth: AuthStackNavigator,
  App: AppStackNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
}))
