import React from 'react';
import { AsyncStorage, TextInput, Button, Alert, ScrollView, StyleSheet, Text, View, Image } from 'react-native';

export default class LogoutScreen extends React.Component {
  constructor(props) {
    super(props);
    AsyncStorage.removeItem('username');
    this.props.navigation.navigate('Login');
  }

  render() {
    return null;
  }
}
