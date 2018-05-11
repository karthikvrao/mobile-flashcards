import React from 'react';
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import styled, { css } from 'styled-components';


const ButtonView = styled.View`
  align-items: center;
  background-color: black;
  border-radius: 5;
  margin: 5px;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  width: 200;
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
  margin: 20px;
  color: white;
  font-size: 16;
  ${props => props.type === 'outline' && css`
    color: black;
  `}
`;

const Button = ({ disabled, onPress, title, type }) => {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <ButtonView disabled={disabled} type={type}>
          <ButtonText type={type}>{title}</ButtonText>
        </ButtonView>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableNativeFeedback
      disabled={disabled}
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('grey', false)}
    >
      <ButtonView disabled={disabled} type={type}>
        <ButtonText type={type}>{title}</ButtonText>
      </ButtonView>
    </TouchableNativeFeedback>
  );
};

export default Button;
