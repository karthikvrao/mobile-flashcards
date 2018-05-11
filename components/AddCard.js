import React, { Component } from 'react';
import { Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from './Button';
import Text from './Text';
import TextInput from './TextInput';
import { addCardToDeckTAC } from '../actions/deckActions';


const AddCardView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
`;

class AddCard extends Component {
  state = {
    card: {
      question: '',
      answer: ''
    },
    errors: {
      blankcardQuestion: false,
      blankcardAnswer: false,
    }
  };

  handleOnChangeQuestion = cardQuestion => {
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.card.question = cardQuestion;
      newState.errors.blankcardQuestion = cardQuestion === '' ? true : false;
      return newState;
    });
  }

  handleOnChangeAnswer = cardAnswer => {
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.card.answer = cardAnswer;
      newState.errors.blankcardAnswer = cardAnswer === '' ? true : false;
      return newState;
    });
  }

  onSubmit = () => {
    const { dispatch, title } = this.props;
    const { card } = this.state;
    const questionTrimmed = card.question.trim();
    const answerTrimmed = card.answer.trim();

    if (questionTrimmed && answerTrimmed) {
      // Save new card and show confirmation dialog to user
      dispatch(addCardToDeckTAC(title, { question: questionTrimmed, answer: answerTrimmed }))
        .then(() => {
          Keyboard.dismiss();
          this.setState({ card: { question: '', answer: '' } });
          Alert.alert("New card has been added!");
        });
    } else {
      this.setState(prevState => {
        const newState = { ...prevState };
        newState.errors.blankcardQuestion = questionTrimmed === '' ? true : false;
        newState.errors.blankcardAnswer = answerTrimmed === '' ? true : false;
        return newState;
      });
    }
  }

  render() {
    const { card, errors } = this.state;

    return (
      <AddCardView>
        <TextInput
          maxLength={50}
          onChangeText={this.handleOnChangeQuestion}
          placeholder="Question"
          underlineColorAndroid="transparent"
          value={card.question}
        />
        {errors.blankcardQuestion && <Text tertiary>Question cannot be empty</Text>}
        <TextInput
          maxLength={100}
          onChangeText={this.handleOnChangeAnswer}
          placeholder="Answer"
          underlineColorAndroid="transparent"
          value={card.answer}
        />
        {errors.blankcardAnswer && <Text tertiary>Answer cannot be empty</Text>}
        <Button
          disabled={errors.blankcardQuestion || errors.blankcardAnswer}
          onPress={this.onSubmit}
          title="Submit" />
      </AddCardView>
    );
  }
}

const mapStateToProps = ({ selectedDeck }) => ({ title: selectedDeck });

export default connect(mapStateToProps)(AddCard);
