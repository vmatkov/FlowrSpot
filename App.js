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
  FlatList
} from 'react-native';
import { Header, SearchBar, Card } from 'react-native-elements';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

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
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }
    else
    {
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
            <FlatList
              data={this.state.dataSource}
              renderItem={
                ({item}) => <Text style={styles.item}>{item.name}, {item.latin_name}, {item.sightings}</Text>
              }
              keyExtractor={(item, index) => index}
              />
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
  item:{
    flex: 2,
    flexDirection: "row"
  }
});

 // adb shell input keyevent 82