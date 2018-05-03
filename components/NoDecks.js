import React from 'react';
import styled from 'styled-components';
import Text from './Text';

const NoDecksView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NoDecks = () => (
  <NoDecksView>
    <Text big secondary>No decks here</Text>
  </NoDecksView>
);

export default NoDecks;
