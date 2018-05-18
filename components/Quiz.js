import React, { Component } from 'react';
import { Alert, Animated, ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { clearLocalNotifications, setLocalNotifications } from '../utils/helpers';
import Text from './Text';
import Question from './Question';
import Answer from './Answer';


const QuizView = styled.View`
  flex: 1;
  justify-content: center;
`;

const QuizCardAnimatedView = Animated.createAnimatedComponent(styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 20px;
`);

const QuizCardsCount = styled.View`
  align-items: flex-start;
`;

const QuestionCardAnimatedView = Animated.createAnimatedComponent(styled.View`
  border: 1px solid black;
  flex: 1;
`);

const AnswerCardAnimatedView = Animated.createAnimatedComponent(styled.View`
  border: 1px solid black;
  flex: 1;
`);

class Quiz extends Component {
  state = {
    changingCard: new Animated.Value(1),
    correctCount: 0,
    currentCardIndex: 0,
    displayAnswer: true,
    loading: false,
    rotate: new Animated.Value(0),
  };

  componentDidMount() {
    clearLocalNotifications().then(setLocalNotifications);
  }

  flipQuizCard = () => {
    const { displayAnswer, rotate } = this.state;

    if (displayAnswer) {
      Animated.spring(rotate, {
        toValue: 1,
      }).start();
    } else {
      Animated.spring(rotate, {
        toValue: 0,
      }).start();
    }
    this.setState(prevState => ({ displayAnswer: !prevState.displayAnswer }));
  }

  restartQuiz = () => {
    const { changingCard } = this.state;
    Animated.timing(changingCard, {
      toValue: 0,
      duration: 1,
    }).start(() => {
      this.flipQuizCard();
      this.setState(prevState => {
        const newState = { ...prevState };
        newState.correctCount = 0;
        newState.currentCardIndex = 0;
        newState.loading = true;
        return newState;
      }, () => Animated.timing(changingCard,
        {
          toValue: 1,
          duration: 1000,
        }).start(() => this.setState({ loading: false })));
    }
    );
  }

  handleResponse = (response) => {
    const { deck, navigation } = this.props;
    const { changingCard, currentCardIndex, correctCount } = this.state;
    const totalCards = deck.questions.length;

    if (currentCardIndex === totalCards - 1) {
      // If its the last card then end quiz and display score
      let finalCorrectCount = correctCount;
      if (response === 'correct') {
        finalCorrectCount += 1;
        this.setState(prevState => ({ correctCount: finalCorrectCount }));
      }
      Alert.alert(
        'Quiz score',
        `You answered ${((finalCorrectCount / totalCards) * 100).toFixed(2)}% questions correctly.`,
        [
          { text: 'Restart Quiz', onPress: () => this.restartQuiz() },
          { text: 'Back to Deck', onPress: () => navigation.goBack() }
        ],
        { cancelable: false }
      );
    } else {
      // If its not the last card, then display next quesiton
      // Hide the card and display activityIndicator while it is flipped for next question
      Animated.timing(changingCard, {
        toValue: 0,
        duration: 1,
      }).start(() => {
        this.flipQuizCard();
        this.setState(prevState => {
          const newState = { ...prevState };
          if (response === 'correct') {
            newState.correctCount += 1;
          }
          newState.currentCardIndex += 1;
          newState.loading = true;
          return newState;
        }, () => Animated.timing(changingCard,
          {
            toValue: 1,
            duration: 1000,
          }).start(() => this.setState({ loading: false })));
      }
      );
    }
  }

  render() {
    const { deck } = this.props;
    const { changingCard, currentCardIndex, displayAnswer, rotate, loading } = this.state;
    const currentCard = deck.questions[currentCardIndex];

    const questionAnimatedStyle = {
      opacity: rotate.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      transform: [
        {
          rotateY: rotate.interpolate(
            {
              inputRange: [0, 1],
              outputRange: ['0deg', '-180deg'],
            },
            { perspective: 1000 }
          ),
        },
      ],
    };

    const answerAnimatedStyle = {
      opacity: rotate,
      transform: [
        {
          rotateY: rotate.interpolate(
            {
              inputRange: [0, 1],
              outputRange: ['-180deg', '-360deg'],
            },
            { perspective: 1000 }
          ),
        },
      ],
    };

    return (
      <QuizView>
        {loading &&
          <ActivityIndicator
            style={{ alignSelf: 'center', position: 'absolute' }} size="large" color="black" />}
        <QuizCardAnimatedView style={{ opacity: changingCard }}>
          <QuizCardsCount>
            <Text>{currentCardIndex + 1}/{deck.questions.length}</Text>
          </QuizCardsCount>
          <View style={{ flex: 1 }}>
            {displayAnswer && <QuestionCardAnimatedView style={questionAnimatedStyle}>
              <Question
                disableFlip={!displayAnswer || loading}
                flipQuizCard={this.flipQuizCard}
                question={currentCard.question} />
            </QuestionCardAnimatedView>}
            {!displayAnswer && <AnswerCardAnimatedView style={answerAnimatedStyle}>
              <Answer
                answer={currentCard.answer}
                disableFlip={displayAnswer || loading}
                flipQuizCard={this.flipQuizCard}
                handleResponse={this.handleResponse} />
            </AnswerCardAnimatedView>}
          </View>
        </QuizCardAnimatedView>
      </QuizView>
    );
  }
}

const mapStateToProps = ({ decks, selectedDeck }) => ({ deck: decks[selectedDeck] });

export default connect(mapStateToProps)(Quiz);
