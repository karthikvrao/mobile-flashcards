import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DeckItem from './DeckItem';
import NoDecks from './NoDecks';
import { getDecksTAC } from '../actions/deckActions';

const ItemSeparator = styled.View`
  height: 1;
  background-color: grey;
`;
const ListFooter = styled.View`
  border-top-width: 1;
  border-top-color: grey;
`;

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getDecksTAC());
  }

  render() {
    const { decks, navigation } = this.props;
    const deckList = Object.values(decks).map(deck => ({
      title: deck.title,
      cardsCount: deck.questions.length,
    }));
    const noDecks = deckList === undefined || deckList.length === 0;

    return (
      <View style={{ flex: 1 }}>
        {noDecks ?
          <NoDecks /> :
          <FlatList
            data={deckList}
            ItemSeparatorComponent={() => <ItemSeparator />}
            keyExtractor={item => item.title}
            ListFooterComponent={() => <ListFooter />}
            renderItem={({ item }) => <DeckItem deck={item} navigation={navigation} />}
          />
        }
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(DeckList);
