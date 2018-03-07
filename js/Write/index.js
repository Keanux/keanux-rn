import React from 'react';
import { TouchableWithoutFeedback, TouchableHighlight, TextInput, Button, Alert, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import Header from '../Header';

export default class WriteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      post: [] 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { title, subtitle, content } = this.state;
    Alert.alert(subtitle);
  
    // if (this.state.title) { // userForm.$form.valid in V1
    //   // submit user here
    // } else {
    //   // show errors
    // }
  }

  render() {
    return (
      <View 
        style={{
          backgroundColor: '#fff', 
        }}>
        <Header navigation={this.props.navigation}/>
        <TextInput
          style={{height: 40}}
          placeholder="Title"
          onChangeText={(title) => this.setState({title})}
          autoFocus={true}
        />
        <TextInput
          style={{height: 40, marginTop: 10}}
          placeholder="Subtitle"
          onChangeText={(subtitle) => this.setState({subtitle})}
        />
        <TextInput
          multiline = {true}
          numberOfLines = {4}
          style={{height: 140, marginTop: 30}}
          placeholder="Content"
          onChangeText={(content) => this.setState({content})}
        />
        <Button onPress={this.handleSubmit} title="Publish"/>
      </View>
    );
  }
}
