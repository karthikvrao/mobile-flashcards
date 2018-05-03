import React, { Component } from 'react';
import { Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addDeckTAC } from '../actions/deckActions';
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
  state = {
    deckTitle: '',
  };

  handleOnChangeText = deckTitle => {
    this.setState({ deckTitle });
  }

  onSubmit = () => {
    const { dispatch } = this.props;
    dispatch(addDeckTAC(this.state.deckTitle)).then(() => {
      Keyboard.dismiss();
      this.setState({ deckTitle: '' });
      Alert.alert("New Deck has been created!");
    });
  }

  render() {
    return (
      <NewDeckView>
        <Text big>What is the title of your new deck?</Text>
        <TextInput
          maxLength={30}
          onChangeText={this.handleOnChangeText}
          placeholder="Deck Title"
          underlineColorAndroid="transparent"
          value={this.state.deckTitle}
        />
        <Button
          onPress={this.onSubmit}
          title="Submit"
        />
      </NewDeckView>
    );
  }
}

export default connect()(NewDeck);
