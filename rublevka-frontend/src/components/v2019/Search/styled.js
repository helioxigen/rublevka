import styled from 'styled-components';

import { Link } from 'react-router';

import media from 'styles/media';

import UI from 'ui';

const { Icon, Button } = UI;

export const Wrapper = styled.div`
  background: ${p => p.theme.brandWhite};
  padding: 0 0 2.2rem;
  ${media.sm`
    background: none;
  `};
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  padding: 0 0.5rem;
  width: 100%;

  ${media.sm`
    margin: 0 auto;
    padding: 0;
    width: ${p => (p.fluidWidth ? '100%' : '72rem')};
  `} ${media.md`
    width: ${p => (p.fluidWidth ? '100%' : '80rem')};
  `};
`;

export const SearchButton = styled(Button)`
  display: none;
  height: 100%;
  margin-left: -1px;
  padding: 2.1rem 4.5rem;
  font-size: 1.6rem;
  background: ${p => p.theme.brandPrimary};
  color: ${p => p.theme.brandWhite};
  border: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &:hover,
  &:focus,
  &:active {
    background: ${p => p.theme.brandPrimary};
    color: ${p => p.theme.brandWhite};
  }

  ${media.sm`
    display: inline-block;
  `};
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 1.2rem 3rem;
  min-height: 3.5rem;
  font-size: 1.4rem;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid ${p => p.theme.grey};
  outline: none;
  ::-webkit-input-placeholder {
    color: ${p => p.theme.starDust};
  }

  ${p =>
    p.mobileRound &&
    `
    border: 1px solid #ccc;
    border-radius: 10rem;
    padding: 1.5rem 2rem 1.5rem 4.5rem;
  `} ${media.sm`
    border-radius: 0.4rem;
    padding: 1.5rem 4.5rem 1.4rem;
  `} ${media.md`
    border-radius: 0;
    padding: 1.6rem 6.5rem;
    min-height: 5.8rem;
    font-size: 1.6rem;
    border: 1px solid ${p => p.theme.grey};
    border-top-left-radius: .4rem;
    border-bottom-left-radius: .4rem;
      ${p =>
        p.withoutBorder &&
        `
        border: 0;
      `};
  `};
`;

export const SearchIcon = styled(Icon)`
  position: absolute;
  top: -5.4rem;
  left: 1rem;
  z-index: 2;
  width: 1.5rem;
  fill: ${p => p.theme.greyBlue};

  ${p =>
    p.mobileRound &&
    `
    top: -5rem;
    left: 2.5rem;
  `} ${media.sm`
    left: 2.2rem;
    top: -5rem;
  `} ${media.md`
    left: 2.4rem;
    top: -4.5rem;
    width: 2rem;
  `};
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 6rem;
  left: 0;
  z-index: 3;
  width: 100%;
  padding: 0.5rem 3rem 1rem;
  background: ${p => p.theme.brandWhite};
  border: 1px solid $grey;
  border-radius: 0.4rem;
  box-shadow: 0 1px 8px rgba(173, 173, 173, 0.2);
  text-align: left;

  ${media.sm`
    width: ${p => (p.fluidWidth ? '100%' : '58.5rem')};
  `} ${media.md`
    width: ${p => (p.fluidWidth ? '100%' : '66.5rem')};
  `};
`;

export const DropdownTitle = styled.div`
  font-size: 1.6rem;
  line-height: 1;
  font-weight: 500;
  color: ${p => p.theme.greyBlueDark};
  margin: 2rem 0 1.8rem;
`;

export const DropdownLink = styled(Link)`
  display: block;
  font-size: 1.6rem;
  font-weight: normal;
  color: ${p => p.theme.greyBlueDark};
  line-height: 1;
  margin-bottom: 1.2rem;
  cursor: pointer;

  &:hover {
    color: ${p => p.theme.brandPrimary};
    transition: 0.2s;
  }
`;
