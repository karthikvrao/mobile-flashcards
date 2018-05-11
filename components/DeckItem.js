import React, { Component } from 'react';
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import setSelectedDeck from '../actions/selectedDeckActions';

const DeckItemView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const DeckTitleText = styled.Text`
  font-size: 24;
`;

const CardsCountText = styled.Text`
  color: grey;
  font-size: 16;
`;

class DeckItem extends Component {
  handlePress = () => {
    const { deck, dispatch, navigation } = this.props;
    dispatch(setSelectedDeck(deck.title));
    navigation.navigate('DeckDetail', { title: deck.title });
  }

  render() {
    const { deck } = this.props;

    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity onPress={this.handlePress}>
          <DeckItemView>
            <DeckTitleText>{deck.title}</DeckTitleText>
            <CardsCountText>{deck.cardsCount} cards</CardsCountText>
          </DeckItemView>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableNativeFeedback
        onPress={this.handlePress}
        background={TouchableNativeFeedback.Ripple('grey', false)}
      >
        <DeckItemView>
          <DeckTitleText>{deck.title}</DeckTitleText>
          <CardsCountText>{deck.cardsCount} cards</CardsCountText>
        </DeckItemView>
      </TouchableNativeFeedback>
    );
  }
}

export default connect()(DeckItem);
