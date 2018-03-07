import React from 'react';
import { TextInput, Button, Alert, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PasswordScreen from './Password';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { username } = this.state;
  
    if (username) {
      this.props.navigation.navigate('Password', {username: username})
    } else {
      // show errors
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.h1}>Keanux</Text>
        </View>
        <TextInput
          style={styles.username}
          placeholder="Enter your username"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(username) => this.setState({username})}
        />
        <View style={styles.button}>
          <Button 
            color="#fff" 
            onPress={this.handleSubmit} 
            title="Next"
          />
        </View>
      </View>
    );
  }
}

export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Password: {
    screen: PasswordScreen,
  },
},
{
  headerMode: 'none',
});

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff', 
    paddingLeft: 30,
    paddingRight: 30,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center'
  },
  header: {
    alignItems: 'center',
  },
  h1: {
    paddingTop: 40,
    paddingBottom: 3,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Georgia'
  },
  username: {
    marginTop: 30,
    height: 30, 
    borderBottomColor: '#ccc', 
    borderBottomWidth: 1
  },
  button: {
    marginTop: 30,
    backgroundColor: 'blue',
  }
});