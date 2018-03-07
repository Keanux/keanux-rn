import React from 'react';
import { TouchableWithoutFeedback, Button, Alert, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const iconLeft = (<Icon name="chevron-left" size={30} color="#000" />)

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
          {iconLeft}
        </TouchableWithoutFeedback>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 80,
    paddingTop: 40,
    paddingLeft: 10,
  }
});