import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Text from './Text';

const AnswerView = styled.View`
  align-items: center;
  flex: 1;
  justify-content: space-between;
  padding: 40px;
`;

const AnswerResponse = styled.View`
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;

const Answer = ({
  answer,
  disableFlip,
  flipQuizCard,
  handleResponse,
}) =>
  (
    <AnswerView>
      <Text style={{ flex: 1 }} big>{answer}</Text>
      <AnswerResponse>
        <Button type="positive" title="Correct" onPress={() => handleResponse('correct')} />
        <Button type="negative" title="Incorrect" onPress={() => handleResponse('incorrect')} />
      </AnswerResponse>
      <Text big tertiary disabled={disableFlip} onPress={flipQuizCard}>View Question</Text>
    </AnswerView>
  );

export default Answer;
