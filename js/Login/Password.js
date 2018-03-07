import React from 'react';
import { AsyncStorage, TextInput, Button, ScrollView, StyleSheet, Text, View, Image } from 'react-native';

export default class PasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      error: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('username').then((username) => {
      this.setState({ username: username })
    });
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  handleSubmit() {
    const { password } = this.state;
    const {state} = this.props.navigation;
    const username = state.params ? state.params.username : "";
    const data = 'LoginForm[username]=' + username + '&LoginForm[password]=' + password;
    this.setState({error: ""});

    if (password) {
      fetch("https://keanux.com/site/login?ajax=1", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      }).then(res => res.json())
      .then((result) => {
        if (result.data === 'success') {
          this.saveItem('username', username);
          this.props.navigation.navigate('Home');
        }
      }, (error) => {});
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.h1}>Keanux</Text>
        </View>
        <TextInput
          style={styles.password}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />
        <View style={styles.button}>
          <Button 
            color="#fff" 
            onPress={this.handleSubmit} 
            title="Login"
          />
        </View>
      </View>
    );
  }
}

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
  password: {
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