import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './images/logo.svg';
import theme from './theme';

export {
  Title,
  Title2,
  Body,
  BodyBold,
  BodyBig,
  BodyBigBold,
  ErrorMessage,
  Label,
  LabelRegular,
  LabelSmall,
} from './Typography';
export { default as theme } from './theme';

export const Main = styled.main`
  font-family: 'FSElliotPro', sans-serif;
  height: 100%;
`;

export const Layout = styled.div`
  padding-top: 54px;
  padding-bottom: 54px;
  width: 100%;
`;

const LogoContainer = styled(Link)`
  &:hover {
    opacity: 0.7;
  }
`;

const LogoImage = styled.img`
  max-width: 100%;
  height: 24px;
`;

export const Input = styled.input`
  outline: none;
  width: 100%;
  display: block;
  transition: border-bottom 0.3s ease-in-out;
  border: none;
  border-bottom: 1px solid ${({ errors }) => (errors ? theme.red : theme.alto)};
  padding: 10px 0px;
  font-family: 'FSElliotPro';
  color: #333;
  font-size: 20px;
  background-color: transparent;

  &:focus {
    border-bottom: 2px solid
      ${({ errors }) => (errors ? theme.red : theme.blue)};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &::placeholder {
    opacity: .25;
  }
}
`;

export const Button = styled.button`
  background-color: ${theme.blue};
  border: none;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  font-size: 19px;
  color: ${p => p.textColor || '#fff'};
  text-align: center;
  padding: 14px 24px;

  &:hover {
    cursor: pointer;
  }
`;

export const HollowButton = styled(Button)`
  box-shadow: none;
  background: transparent;
  border: 1px solid ${theme.blue};
  color: ${theme.blue};

  &:hover {
    box-shadow: 0px 3px 7px 1px rgba(49, 116, 246, 0.2);
  }
`;

export const Logo = () => (
  <LogoContainer to="/">
    <LogoImage src={logo} alt="" />
  </LogoContainer>
);
