import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from './Button';
import Text from './Text';


const DeckDetailView = styled.View`
  flex: 1;
`;

const DeckInfoView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const DeckResponseView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => (
    {
      title: navigation.getParam('title', 'Deck Detail'),
    }
  );

  render() {
    const { deck, navigation } = this.props;
    const disableQuiz = deck.questions.length === 0;

    return (
      <DeckDetailView>
        <DeckInfoView>
          <Text big>{deck.title}</Text>
          <Text secondary big>{deck.questions.length} cards</Text>
        </DeckInfoView>
        <DeckResponseView>
          <Button
            onPress={() => navigation.navigate('AddCard')}
            type="outline"
            title="Add Card"
          />
          <Button
            disabled={disableQuiz}
            onPress={() => navigation.navigate('Quiz')}
            title="Start Quiz"
          />
        </DeckResponseView>
      </DeckDetailView>
    );
  }
}

const mapStateToProps = ({ decks, selectedDeck }) => ({ deck: decks[selectedDeck] });

export default connect(mapStateToProps)(DeckDetail);
