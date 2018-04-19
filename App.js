import React, { Component } from 'react';
import { Text, View } from 'react-native';
import NewDeck from './NewDeck';

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NewDeck />
      </View>
    );
  }
}
