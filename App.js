/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  StatusBar,
  ToolbarAndroid,
  ImageBackground,
  View,
  ActivityIndicator,
  Image,
  ScrollView
} from 'react-native';
import { SearchBar, Card } from 'react-native-elements';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount(){
    
    let req = new Request('http://flowrspot-api.herokuapp.com/api/v1/flowers');
    return fetch(req)
      .then( (response) => response.json() )
      .then( (responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson.flowers
          })
      })
      .catch((error) => {
        console.log(error)
      });
  }


  render() {

    if(this.state.isLoading)
    {
      return(
        <View style={styles.loader}>
          <ActivityIndicator/>
        </View>
      )
    }
    else
    {
      let flowers = this.state.dataSource.map((val, key) => {
        //let profilePicture = 'https' + val.profile_picture;
        return  <View key={key}>
        <Image style={styles.image} source={{uri: 'https:'+val.profile_picture}}>
        
        </Image>
        </View>
      });

      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#e09186" animated={true} />
          <ToolbarAndroid
            style={styles.toolbar}
              title="FlowrSpot"
              navIcon={{uri: 'pl_flowr'}}
              //onActionSelected={this.onActionSelected}
              titleColor= "#e09186"
              actions = {[
                {title: "About", show: "never"}
              ]}
          />
          <ImageBackground
            source={{uri: 'pl_hero'}}
            style={styles.imageContainer}>
            <Text style={styles.welcome}>Discover flowers around you</Text>
            <Text style={styles.instructions}>Explore between more than 8.427 sightings</Text>
            <SearchBar
                round
                style={styles.searchbar}              
                icon={{ type: 'FontAwesome', name: 'search' }}
                placeholder='Looking for something specific?' />
          </ImageBackground>
          <View style={styles.boxContainer}>
            <ScrollView style={styles.scroll}>
              {flowers}
            </ScrollView>
          </View>
        </View>
      );
    }
  }

//  onActionSelected(position) {
//    if (position === 0) { // index of 'Settings'
//      showSettings();
//    }
//  }

}

const styles = StyleSheet.create({
  loader:{
    flex: 1,
    justifyContent: "center"
  },
  toolbar: {
    backgroundColor: '#ffffff',
    height: 45,
    alignSelf: 'stretch'
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  imageContainer: {
    flex: 1,
    //width: 360,
    //height: 315,
    //justifyContent: 'space-around'
  },
  welcome: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 61,
    marginLeft: 56,
    marginRight: 57
  },
  instructions: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 15,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 26,
    marginLeft: 34,
    marginRight: 34
  },
  searchbar: {
    backgroundColor: '#ffffff',
    marginTop: 29,
    marginLeft: 24,
    marginRight: 24
  },
  boxContainer: {
    flex: 1
  },
  scroll:{
    flex: 1,
    flexDirection: "column"
  },
  item:{
    flex: 2,
    flexDirection: "column"
  },
  image:{
    width: 160,
    height: 203
  }
});

 // adb shell input keyevent 82