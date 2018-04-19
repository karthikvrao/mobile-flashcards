import React, { Component } from 'react';
import { Text, View } from 'react-native';
import DeckDetail from './DeckDetail';

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <DeckDetail />
      </View>
    );
  }
}
