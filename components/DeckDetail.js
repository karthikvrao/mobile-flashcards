import React from 'react';
import styled from 'styled-components';
import { Alert } from 'react-native';
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

const DeckDetail = () => (
  <DeckDetailView>
    <DeckInfoView>
      <Text big>udacicards</Text>
      <Text secondary big>{3} cards</Text>
    </DeckInfoView>
    <DeckResponseView>
      <Button
        onPress={() => {
          Alert.alert('You tapped Add button!');
        }}
        type="outline"
        title="Add Card"
      />
      <Button
        onPress={() => {
          Alert.alert('You tapped Start button!');
        }}
        title="Start Quiz"
      />
    </DeckResponseView>
  </DeckDetailView>
);

export default DeckDetail;
