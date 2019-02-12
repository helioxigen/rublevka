import React, { Component } from 'react';

import { connect } from 'react-redux';

// actions
import {
  updateDisplayOption,
  resetDisplayOption,
} from 'site/displayOptions/actions';

import styled from 'styled-components';
import media from 'site/styles/media';

const Wrapper = styled.div`
  margin-right: 0;
  position: relative;
  max-width: 5.2rem;
  max-height: 2.6rem;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: -0.1rem;
    right: -0.1rem;
    border: 1px solid ${p => p.theme.grey};
    border-radius: 10rem;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 10rem;
    background: ${p => p.theme.brandPrimary};
    z-index: 1;
    transition: left 0.2s cubic-bezier(0.5, 0, 0.5, 1);

    ${p =>
      p.isActive &&
      `
      left: 2.5rem;
    `};
    ${media.sm`
    width: 5.2rem;
    height: 5.2rem;
    ${p =>
      p.isActive &&
      `
      left: 5.2rem;
    `};
  `};
  }

  ${media.sm`
    margin-right: 1.8rem;
    max-width: 10.6rem;
    max-height: unset;
  `};
`;

const Currency = styled.span`
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: ${p => p.isActive && '#fff'};
  transition: all 0.3s ease;
  vertical-align: text-bottom;

  ${media.sm`
    vertical-align: unset;
    font-size: 18px;
    line-height: 21px;
  `};
`;

const StButton = styled.button`
  border: none;
  outline: none;
  border-radius: 10rem;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  background: transparent;
  position: relative;
  z-index: 2;
  padding: 0;

  ${p =>
    p.isActive &&
    `
    pointer-events: none;
    cursor: default;
  `};
  }

  ${media.sm`
    width: 5.2rem;
    height: 5.2rem;

    &:hover {
      ${Currency} {
        color: #000;
      }
  `};
`;

class CurrencyToggle extends Component {
  handleCurrencyButtonClick(currency) {
    const { state } = this.props;
    const selected = state.displayOptions.currency;

    if (selected === currency) {
      this.props.dispatch(resetDisplayOption('currency'));
    } else {
      this.props.dispatch(updateDisplayOption('currency', currency));
    }
  }

  render() {
    const { state } = this.props;
    const selected = state.displayOptions.currency || 'usd';

    return (
      <Wrapper isActive={selected === 'rub'}>
        <StButton
          isActive={selected === 'usd'}
          onClick={() => this.handleCurrencyButtonClick('usd')}
        >
          <Currency isActive={selected === 'usd'}>$</Currency>
        </StButton>
        <StButton
          isActive={selected === 'rub'}
          onClick={() => this.handleCurrencyButtonClick('rub')}
        >
          <Currency isActive={selected === 'rub'}>₽</Currency>
        </StButton>
      </Wrapper>
    );
  }
}

const pickState = ({ displayOptions }) => ({
  state: { displayOptions },
});

export default connect(pickState)(CurrencyToggle);
