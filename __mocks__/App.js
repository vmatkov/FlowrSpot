/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  ToolbarAndroid,
  ImageBackground,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: null
    }
  }

  contains = ({name, latin_name}, query) => {
    let name_lower = name.toLowerCase();
    let latin_lower = latin_name.toLowerCase();
    if( name_lower.includes(query) || latin_lower.includes(query)) return true;
    return false;
  }

  componentDidMount () {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = _.debounce(() => {
    let req = new Request('http://flowrspot-api.herokuapp.com/api/v1/flowers');
    return fetch(req)
      .then( (response) => response.json() )
      .then( (responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson.flowers,
            query: "",
            fullData: responseJson.flowers
          })
      })
      .catch((error) => {
        console.log(error)
      });
  }, 250);

  onTextChange = (text) => {
    const formatQuery = text.toLowerCase();
    const dataSource = _.filter(this.state.fullData, flower => {
      return this.contains(flower, formatQuery);
    })
    let a = 0;
    this.setState({query: formatQuery, dataSource});
    console.log("text: ", formatQuery);
  }

  getFlowers = (data) => {
    return data.map((val, key) => {
      let profilePicture = 'https:' + val.profile_picture;
      return  <View key={key}>
      <ImageBackground style={styles.image} imageStyle={{ borderRadius: 2.4 }} source={{uri: profilePicture}}>
      <Text style={styles.item}>{val.name}</Text>
      <Text style={[styles.subItem, {marginTop: 9, fontFamily: 'Ubuntu-Italic'}]}>{val.latin_name}</Text>
      <Text style={[styles.subItem, {marginTop: 9, fontFamily: 'Ubuntu-Regular'}]}>{val.sightings} sightings</Text>
      </ImageBackground>
      </View>
    });
  }

  render () {

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

      let flowers = this.getFlowers(this.state.dataSource);

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
                {title: "Login", show: "never"},
                {title: "Create an Account", show: "never"}
              ]}
          />
          <ScrollView bouncesZoom style={styles.scroll}>
            <ImageBackground
              source={{uri: 'pl_hero'}}
              style={styles.imageContainer}>
              <Text style={styles.welcome}>Discover flowers around you</Text>
              <Text style={styles.instructions}>Explore between more than 8.427 sightings</Text>
              <SearchBar
                  platform="android"
                  onChangeText={this.onTextChange}
                  containerStyle={styles.searchBar}
                  inputStyle={styles.searchBarInput}
                  icon={{ type: 'font-awesome', name: 'search' }}
                  cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                  placeholder='Looking for something specific?' />
            </ImageBackground>
            <View style={styles.boxContainer}>
              {flowers}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity onPress={()=>{alert("Favorites")}}>
              <Image style={styles.button} source={{uri: 'favorites_icons'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{alert("Comment")}}>
              <Image style={styles.button} source={{uri: 'comment_icon'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{alert("New Sighting")}}>
              <Image style={styles.button} source={{uri: 'new_sighting_icon'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{alert("Sighting List")}}>
              <Image style={styles.button} source={{uri: 'sighting_list_icon'}}/>
            </TouchableOpacity>
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
    flexDirection: "column",
    backgroundColor: '#f1f1f1'
  },
  imageContainer: {
    flex: 1,
    width: 360,
    height: 315
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
  searchBar: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 3,
    width: 312,
    height: 48,
    marginTop: 29,
    marginLeft: 24,
    marginRight: 24
  },
  searchBarInput: {
    fontFamily: 'Ubuntu-Light',
    fontSize: 14
  },
  boxContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  scroll:{
    flex: 1
  },
  item:{
    fontFamily: 'Ubuntu-Regular',
    fontSize: 16,
    marginTop: 117,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  subItem:{
    fontSize: 9.6,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  image:{
    width: 160,
    height: 203,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    height: 49,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    marginTop: 10,
    width: 30,
    height: 30
  }
});

 // adb shell input keyevent 82