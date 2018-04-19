import React, { Component } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import Button from './Button';
import Text from './Text';
import TextInput from './TextInput';

const NewDeckView = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 60px;
`;

class NewDeck extends Component {
  static navigationOptions = {
    title: 'New Deck',
  };

  render() {
    return (
      <NewDeckView>
        <Text big>What is the title of your new deck?</Text>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Deck Title"
          maxLength={30}
        />
        <Button
          onPress={() => {
            Alert.alert('You tapped Submit button!');
          }}
          title="Submit"
        />
      </NewDeckView>
    );
  }
}

export default NewDeck;
