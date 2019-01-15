import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './images/logo.svg';
import theme from './theme';

export { Title, Paragraph, ErrorMessage } from './Typography';
export { default as theme } from './theme';

export const Main = styled.main`
  font-family: 'FSElliotPro', sans-serif;
`;

export const Input = styled.input`
  outline: none;
  width: 100%;
  display: block;
  transition: border-bottom 0.3s ease-in-out;
  border: none;
  border-bottom: 2px solid ${({ errors }) => (errors ? theme.red : theme.alto)};
  padding: 10px 0px;
  font-family: 'FSElliotPro';
  color: #333;
  font-size: 31px;
  background-color: transparent;

  &:focus {
    border-bottom: 2px solid ${({ errors }) => (errors ? theme.red : theme.blue)};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Button = styled.button`
  background-color: ${theme.blue};
  border: none;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  font-size: 19px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  padding: 14px 0px;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const LogoContainer = styled(Link)`
  color: #fff;
  &:hover {
    opacity: 0.7;
  }
`;

const LogoImage = styled.img`
  width: 38px;
  height: 33px;
`;

export const Logo = () => (
  <LogoContainer to="/">
    <LogoImage src={logo} alt="JQEstate Logo" />
  </LogoContainer>
);
