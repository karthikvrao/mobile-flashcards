import React from 'react';
import styled, { css } from 'styled-components';

const Text = styled.Text`
  color: black;
  font-size: ${props => (props.big ? 32 : 24)};
  text-align: center;
  ${props => props.secondary && css`
    color: gray;
    font-size: ${props.big ? 24 : 16};
  `}
  ${props => props.tertiary && css`
    color: red;
    font-size: 16;
  `}
`;

export default Text;
