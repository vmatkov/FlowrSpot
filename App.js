/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Toolbar from './lib/Toolbar';
import { getColor } from './lib/helpers';
import {
  Platform,
  StyleSheet,
  Text,
  StatusBar,
  ToolbarAndroid,
  View
} from 'react-native';

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
      <View style={styles.container}>
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
        <StatusBar backgroundColor="#e09186" animated={true} />
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
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
    //justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  toolbar: {
    backgroundColor: '#ffffff',
    height: 56,
    alignSelf: 'stretch',
  },
});
