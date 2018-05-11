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
    errors: {
      blankDeckTitle: false,
    }
  };

  handleOnChangeTitle = deckTitle => {
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.deckTitle = deckTitle;
      newState.errors.blankDeckTitle = deckTitle === '' ? true : false;
      return newState;
    });
  }

  onSubmit = () => {
    const { dispatch } = this.props;
    const { deckTitle } = this.state;

    const deckTitleTrimmed = deckTitle.trim();
    if (deckTitleTrimmed) {
      // Save new deck and show confirmation dialog to user
      dispatch(addDeckTAC(deckTitleTrimmed)).then(() => {
        Keyboard.dismiss();
        this.setState({ deckTitle: '' });
        Alert.alert("New Deck has been created!");
      });
    } else {
      this.setState(prevState => {
        const newState = { ...prevState };
        newState.errors.blankDeckTitle = true;
        return newState;
      });
    }
  }

  render() {
    const { deckTitle, errors } = this.state;

    return (
      <NewDeckView>
        <Text big>What is the title of your new deck?</Text>
        <TextInput
          maxLength={30}
          onChangeText={this.handleOnChangeTitle}
          placeholder="Deck Title"
          underlineColorAndroid="transparent"
          value={deckTitle}
        />
        {errors.blankDeckTitle && <Text tertiary>Deck title cannot be empty</Text>}
        <Button
          disabled={errors.blankDeckTitle}
          onPress={this.onSubmit}
          title="Submit"
        />
      </NewDeckView>
    );
  }
}

export default connect()(NewDeck);
