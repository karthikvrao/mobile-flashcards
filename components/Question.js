import React from 'react';
import styled from 'styled-components';
import Text from './Text';

const QuestionView = styled.View`
  align-items: center;
  flex: 1;
  justify-content: space-between;
  padding: 40px;
`;

const Question = ({ disableFlip, flipQuizCard, question }) => (
  <QuestionView>
    <Text big>{question}</Text>
    <Text big tertiary disabled={disableFlip} onPress={flipQuizCard}>View Answer</Text>
  </QuestionView>
);

export default Question;
