import React from 'react';
import { AsyncStorage, TextInput, Button, Alert, ScrollView, StyleSheet, Text, View, Image } from 'react-native';

export default class BookmarkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  componentWillMount() {    
    AsyncStorage.getItem('username').then((username) => {
      this.setState({ username: username })
    });
  }

  render() {
    const { username } = this.state;
    return (
      <View>
        <Text>{username}</Text>
      </View>
    );
  }
}
