import React from 'react';
import { AsyncStorage, TextInput, Button, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './js/Home';
import BlogScreen from './js/Blog';
import WriteScreen from './js/Write';
import LoginScreen from './js/Login';
import LogoutScreen from './js/Logout';
import ProfileScreen from './js/Profile';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('username').then((username) => {
      this.setState({ username: username })
    });
  }

  render() {
    const initialRouteName = this.state.username ? 'Home' : 'Login';
    const StackNav = StackNavigator({
      Home: {
        screen: HomeScreen,
      },
      Blog: {
        screen: BlogScreen,
      },
      Login: {
        screen: LoginScreen,
      },
    },
    {
      initialRouteName: initialRouteName,
      headerMode: 'none',
    });

    return (
      <StackNav/>
    );
  }
}
