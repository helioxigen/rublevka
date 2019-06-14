import React from 'react';

import styled, { css } from 'styled-components';
import media from '../../../styles/media';

import UI from '../../../ui';

import greySearchIcon from './searchGrey.png';

const { Icon } = UI;

export const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -9px;
  margin-left: -4px;
  margin-right: -4px;
  width: calc(100% + 8px);
  min-height: 40px;

  ${media.md`
    margin: 0;
    flex-basis: 83.33333333%;
    flex-wrap: nowrap;
    width: 100%;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: #fff;
    min-height: 68px;
  `}
`;

export const Input = styled.input`
  flex-grow: 1;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #eeeeee;
  appearance: none;
  outline: none;
  padding: 18.5px 15px;
  margin: 0 4px;
  margin-top: 9px;
  width: 100%;

  line-height: 19px;
  font-size: 16px;
  font-weight: bold;

  ::-webkit-input-placeholder {
    color: #aaaaaa;
  }

  &:focus {
    border: 1px solid #f44336;
  }

  ${media.md`
    margin: 0;
    padding: 0;
    border: 0;
    flex-basis: 76.77777777%;
    border: 1.5px solid #fff;
    background: url(${greySearchIcon}) no-repeat 18px 19.5px;
    padding-left: 54.5px;
    border-radius: 12px 0px 0px 12px;

    line-height: 21px;
    font-size: 18px;

    color: ${p => p.theme.brandBlack};

    &::-webkit-unput-placeholder {
      color: #aaaaaa;
    }

    &:focus {
      border: 1.5px solid #f44336;
    }

    &:last-child {
      border-radius: 12px;
    }
  `}
`;

export const Dropdown = styled.div`
  margin-top: 8px;
  margin-left: 4px;
  margin-right: 4px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  outline: none;
  flex-basis: calc(50% - 8px);
  width: 100%;

  &:first-child,
  &:first-of-type {
    flex-basis: 100%;
  }

  ${media.xs`
    position: relative;
  `}

  ${media.md`
    margin: 0px;
    flex-basis: 33.3333333%;
    border: ${({ isOpen }) => (isOpen ? '1.5px solid #f44336' : 'none')};
    border-radius: 0px;
    padding: ${({ isOpen }) => (isOpen ? '0px' : '1.5px')};

    &:first-child {
      border-right: ${({ isOpen }) =>
        isOpen ? '1.5px solid #f44336' : '1px solid #eaeaea'};
      border-radius: 12px 0px 0px 12px;
      flex-basis: 33.3333333%;
    }

    &:first-of-type {
      flex-basis: 33.3333333%;
    }

    &:last-child {
      border-left: ${({ isOpen }) =>
        isOpen ? '1.5px solid #f44336' : '1px solid #eaeaea'};
      border-radius: 0px 12px 12px 0px;
      padding-left: ${({ isOpen }) => (isOpen ? '1px' : '1.5px')};
    }

    &:hover {
      cursor: pointer;
    }
  `}
`;

export const Selector = styled.div`
  padding: 10px 15px;
  width: 100%;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  border: none;

  ${media.md`
    padding: 11.5px 18.5px;
  `}
`;

export const SelectorName = styled.p`
  margin: 0;
  font-weight: bold;
  line-height: 13px;
  font-size: 11px;
  text-transform: uppercase;

  color: #aaaaaa;

  ${media.md`
    line-height: 15px;
    font-size: 13px;
  `}
`;

export const SelectorValue = styled.p`
  margin: 0;
  margin-top: 4px;
  line-height: 19px;
  font-size: 16px;

  color: #232323;

  ${media.md`
    margin-top: 6px;
    line-height: 21px;
    font-size: 18px;
  `}
`;

const OptionsWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  z-index: 3;

  ${media.xs`
    padding: 0;
    position: absolute;
    top: 60px;
  `}

  ${media.md`
    top: 71px;
  `}
`;

const OptionsHeader = styled.div`
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.xs`
    display: none;  
  `}
`;

const CloseButton = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;

  ${media.xs`
    display: none;  
  `}
`;

const ResetButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  line-height: 19px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ isActive }) => (isActive ? '#F44336' : 'rgba(244, 67, 54, 0.3)')};

  ${media.xs`
    display: none;  
  `}
`;

const SaveButton = styled(ResetButton)`
  width: 100%;
  text-align: center;
  margin-top: 32px;
  line-height: 20px;
  text-transform: uppercase;
  color: #f44336;
`;

const StIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  fill: rgba(8, 8, 8, 0.3);
`;

const OptionsList = styled.ul`
  min-width: 100%;
  padding: 0;
  list-style: none;
  margin: 0;
  font-weight: 500;

  ${media.xs`
    background-color: #fff;
    padding: 16px 20px;
    box-sizing: border-box;
    border-radius: 8px;
    max-height: 300px;
    border: 1px solid #d9d9d9;
  `}
`;

export const Option = styled.li`
  line-height: 18px;
  font-size: 15px;
  text-transform: uppercase;
  padding: 8px 0px;
  color: ${({ selected }) => (selected ? '#f44336' : '#232323')};
  font-weight: bold;

  &:hover {
    color: #f44336;
    cursor: pointer;
  }
`;

export const SearchContainer = styled.button`
  margin-top: 16px;
  padding: 19px 0px;
  background: ${({ green }) => (green ? '#47b34c' : '#f44336')};
  border-radius: 12px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;

  ${media.xs`
    margin-bottom: 80px;  
  `}

  ${media.md`
    margin: 0;
    padding: 0;
    flex-grow: 0;
    justify-content: flex-start;
    margin-left: 8px;
    width: 138px;
  `}
`;

export const SearchIcon = styled.span`
  display: none;
  width: 28px;
  height: 28px;
  background-image: url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='3' y='4' width='21' height='22'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.1617 17.5H18.0833L23.905 23.3333L22.1667 25.0717L16.3333 19.25V18.3283L16.0183 18.0017C14.6883 19.145 12.9617 19.8333 11.0833 19.8333C6.895 19.8333 3.5 16.4383 3.5 12.25C3.5 8.06166 6.895 4.66666 11.0833 4.66666C15.2717 4.66666 18.6667 8.06166 18.6667 12.25C18.6667 14.1283 17.9783 15.855 16.835 17.185L17.1617 17.5ZM5.83333 12.25C5.83333 15.155 8.17833 17.5 11.0833 17.5C13.9883 17.5 16.3333 15.155 16.3333 12.25C16.3333 9.34499 13.9883 6.99999 11.0833 6.99999C8.17833 6.99999 5.83333 9.34499 5.83333 12.25Z' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23mask0)'%3E%3Crect y='1.16666' width='28' height='28' fill='white'/%3E%3C/g%3E%3C/svg%3E%0A");

  ${media.md`
    margin-left: 18px;
    display: block;
  `}
`;

export const Text = styled.p`
  margin: 0;
  line-height: 18px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  margin-top: 2px;
  margin-left: 5px;

  ${media.md`
    margin-left: 8px;
    font-size: 20px;
    line-height: 20px;
    font-weight: 500;
    text-transform: capitalize;
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  position: relative;

  ${p => p.outline && css`
    outline: 1px;
    outline-color: #ccc;
    ${SearchContainer} {
      position: absolute;
    }
  `}

  ${media.md`
    flex-wrap: nowrap;
  `}
`;

export const Options = ({
  children,
  getToggleButtonProps,
  getMenuProps,
  withSaveButton,
  isResetButtonActive,
  resetButtonCallback,
}) => (
  <OptionsWrapper>
    <OptionsHeader>
      <CloseButton {...getToggleButtonProps({ refKey: 'innerRef' })}>
        <StIcon icon="close-button" />
      </CloseButton>
      <ResetButton
        isActive={isResetButtonActive}
        onClick={() => (isResetButtonActive ? resetButtonCallback() : null)}
      >
        Сбросить
      </ResetButton>
    </OptionsHeader>
    <OptionsList {...getMenuProps({ refKey: 'innerRef' })}>
      {children}
    </OptionsList>
    {withSaveButton && (
      <SaveButton {...getToggleButtonProps({ refKey: 'innerRef' })}>
        Применить
      </SaveButton>
    )}
  </OptionsWrapper>
);

export const Search = ({ onClick, green, label = 'найти', type }) => (
  <SearchContainer green={green} type={type} onClick={onClick || null}>
    <SearchIcon alt="Search icon" />
    <Text>{label}</Text>
  </SearchContainer>
);

