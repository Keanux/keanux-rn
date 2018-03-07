import React from 'react';
import { TouchableWithoutFeedback, Button, Alert, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import Cover from '../Cover';
import Header from '../Header';

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

export default class BlogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };
  }

  componentDidMount() {
    const {state} = this.props.navigation;
    const uid = state.params ? state.params.uid : "<undefined>";
    if (uid !== '<undefined>') {
      fetch("https://keanux.com/post/view/id/"+uid+"?ajax")
        .then(res => res.json())
        .then((result) => {
          this.setState({blogs: result});
        }, (error) => {});
    }
  }

  render() {
    const blogs = this.state.blogs;
    const blogItems = blogs.map(function (blog, index) {
      const { id, post, user, userProfile, avatar } = blog;
      const cover = post.image
      ? <View style={{flex: 1, alignItems: 'center'}}>
          <Cover 
            image={post.image}
          />
        </View>
      : null;

      const content = post.content
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '')
        .replace(/<br>/g, '\n\n')
        .replace(/<div>/g, '')
        .replace(/<\/div>/g, '');

      const subtitle = post.subtitle
      ? <Text style={styles.blogSubtitle}>{post.subtitle}</Text>
      : null;

      return (
        <View 
          key={post.id} 
          style={{
            backgroundColor: '#fff', 
          }}>
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
          {cover}
          <Text style={styles.blogTitle}>{post.title}</Text>
          {subtitle}
          <Text style={styles.blogContent}>{content}</Text>
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
      );
    });

    return (
      <View>
        <Header navigation={this.props.navigation}/>
        <ScrollView style={styles.blogItems}>
          {blogItems}
          <View style={{backgroundColor: 'white', height: 100}}/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 80,
    paddingTop: 40,
    paddingLeft: 10,
  },
  footer: {
    position: 'absolute',
    top: 740,
    height: 80,
    width: 400,
    backgroundColor: '#000',
    zIndex: 100,
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
    paddingBottom: 30
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