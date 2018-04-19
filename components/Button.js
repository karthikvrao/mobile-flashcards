import React from 'react';
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import styled, { css } from 'styled-components';


const ButtonView = styled.View`
  align-items: center;
  background-color: black;
  border-radius: 5;
  margin: 5px;
  ${(props) => {
    if (props.type === 'outline') {
      return css`
        background-color: transparent;
        border-color: black;
        border-width: 2;
      `;
    } else if (props.type === 'positive') {
      return css`
        background-color: green;
      `;
    } else if (props.type === 'negative') {
      return css`
        background-color: red;
      `;
    }
  }}
`;

const ButtonText = styled.Text`
  margin: 20px 60px;
  color: white;
  font-size: 16;
  ${props => props.type === 'outline' && css`
    color: black;
  `}
`;

const Button = ({ onPress, title, type }) => {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity onPress={onPress}>
        <ButtonView type={type}>
          <ButtonText type={type}>{title}</ButtonText>
        </ButtonView>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('grey', false)}
    >
      <ButtonView type={type}>
        <ButtonText type={type}>{title}</ButtonText>
      </ButtonView>
    </TouchableNativeFeedback>
  );
};

export default Button;
