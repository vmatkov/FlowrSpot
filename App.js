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
  View
} from 'react-native';
import { SearchBar } from 'react-native-elements';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ImageBackground
        source={require('./Images/pl_hero_2018-08-30/drawable-mdpi/pl_hero.png')}
        style={styles.container}>
        <View style={styles.view_container}>
          <StatusBar backgroundColor="#e09186" animated={true} />
          <ToolbarAndroid
              style={styles.toolbar}
              title="FlowrSpot"
              navIcon={require("./android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png")}
              onActionSelected={this.onActionSelected}
              titleColor= "#e09186"
              actions = {[
                {title: "About", show: "never"}
              ]}
              />
          <Text style={styles.welcome}>Discover flowers around you</Text>
          <Text style={styles.instructions}>Explore between more than 8.427 sightings</Text>
          <SearchBar
            onChangeText={someMethod}
            onClearText={someMethod}
            placeholder='Looking for something specific?' />
        </View>
      </ImageBackground>
    );
  }
  onActionSelected(position) {
    if (position === 0) { // index of 'Settings'
      showSettings();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 315,
    width: 360,
    justifyContent: 'center'
    //alignItems: 'stretch',
    //backgroundColor: '#F5FCFF',
  },
  view_container: {
    flex: 1,
    alignItems: 'stretch',
  },
  welcome: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    textAlign: 'center',
    color: '#ffffff',
    margin: 55
  },
  instructions: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 15,
    textAlign: 'center',
    color: '#ffffff',
    marginLeft: 34,
    marginRight: 34
  },
  toolbar: {
    backgroundColor: '#ffffff',
    height: 56,
    alignSelf: 'stretch'
  },
});
