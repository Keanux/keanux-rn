import React from 'react';
import { TouchableWithoutFeedback, Button, Alert, ScrollView, StyleSheet, Text, View, Image } from 'react-native';

export default class Cover extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.onPress(this.props.uid)}>
        <Image 
          style={{flex: 1, height: 200, width: 400, marginTop: 15, marginBottom: 15}}
          source={{uri: this.props.image}}
        />
      </TouchableWithoutFeedback>
    );
  }
}