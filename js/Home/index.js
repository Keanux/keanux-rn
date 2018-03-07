import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AsyncStorage, TouchableWithoutFeedback, Button, Alert, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Cover from '../Cover';

import BlogScreen from '../Blog';
import WriteScreen from '../Write';
import LogoutScreen from '../Logout';
import ProfileScreen from '../Profile';
import BookmarkScreen from '../Bookmark';

const timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  var time = date + ' ' + month + ' ' + year;
  return time;
}

class BlogItems extends React.Component {
  render() {
    const blogs = this.props.blogs;
    const blogItems = blogs.map(function (blog, index) {
      const { id, post, user, userProfile, avatar } = blog;
      const cover = post.image
      ? <Cover 
          onPress={this.props.onPress}
          uid={post.unique_id}
          image={post.image}
        />
      : null;

      return (
        <View key={index} style={styles.blogItem}>
          <View style={{flex: 1, alignItems: 'center'}}>
            {cover}
          </View>
          <Text 
            style={styles.blogTitle}
            onPress={() => this.props.onPress(post.unique_id)}>
            {post.title}
          </Text>
          <View style={styles.cententLi}>
            <Image 
              style={{height: 40, width: 40}}
              source={{uri: avatar}}
              style={styles.cententImg}
            />
            <View style={styles.rightCentent}>
              <Text style={styles.blogAuthor}>{userProfile.nickname}</Text>
              <Text style={styles.blogPostDate}>{timeConverter(post.create_time)}</Text>
            </View>
          </View>
        </View>
      )
    }, this);

    return (
      <ScrollView style={styles.blogItems}>
        <Text style={styles.h3}>Top stories for you</Text>
        {blogItems}
        <View style={{height: 100}}/>
      </ScrollView>
    )
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };

    this.onPress = this.onPress.bind(this);
  }

  componentWillMount() {    
    return fetch("https://keanux.com/?ajax")
      .then(res => res.json())
      .then((result) => {
        this.setState({blogs: result});
      }, (error) => {});

    AsyncStorage.getItem('username').then((username) => {
      this.setState({ username: username })
    });
  }

  onPress(uid) {
    this.props.navigation.navigate('Blog', {uid: uid})
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{backgroundColor: '#fff'}}>
        <View style={styles.header}>
          <Text style={styles.h1}>Keanux</Text>
        </View>
        <BlogItems 
          blogs={this.state.blogs} 
          onPress={this.onPress}
        />
      </View>
    );
  }
}

export default TabNavigator({
  Home: { screen: HomeScreen },
  // Bookmark: { screen: BookmarkScreen },
  // Write: { screen: WriteScreen },
  // Profile: { screen: ProfileScreen },
  Logout: { screen: LogoutScreen },
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : '-outline'}`;
      } else if (routeName === 'Bookmark') {
        iconName = `ios-bookmark${focused ? '' : '-outline'}`;
      } else if (routeName === 'Write') {
        iconName = `ios-add-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Logout') {
        iconName = `ios-log-out${focused ? '' : '-outline'}`;
      } else if (routeName === 'Profile') {
        iconName = `ios-person${focused ? '' : '-outline'}`;
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    showLabel: true,
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: 'black',
    },
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  initialRouteName: 'Home',
});

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  h1: {
    paddingTop: 40,
    paddingBottom: 3,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Georgia'
  },
  h3: {
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  blogItems: {
    paddingTop: 20, 
    paddingBottom: 0
  },
  blogTitle: {
    paddingLeft: 15, 
    paddingRight: 15,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  blogSubtitle: {
    paddingTop: 10,
    paddingLeft: 15, 
    paddingRight: 15,
    fontSize: 16,
    lineHeight: 24,
    color: '#aaa',
  },
  blogContent: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15, 
    paddingRight: 15,
    fontSize: 16,
    lineHeight: 24,
  },
  blogAuthor: {
    fontSize: 12,
    paddingBottom: 2
  },
  blogPostDate: {
    fontSize: 12,
    color: '#aaa',
  },
  blogItem: {
  },

  centent: {
    flex:1,
    flexDirection:'column',
  },
  cententLi: {
    paddingLeft: 15, 
    paddingRight: 15,
    marginBottom: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cententImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 15,
    marginRight: 5,
  },
  cententTitle: {
    fontSize: 16,
    color: '#232323',
    paddingBottom: 3,
  },
  cententCentent: {
    fontSize: 12,
  },
  rightCentent: {
    flex: 1,
    paddingLeft: 5,
    paddingTop: 13,
    paddingRight: 5,
    paddingBottom: 20,
  },
  cententType: {
    width: 40,
    height: 22,
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
});
