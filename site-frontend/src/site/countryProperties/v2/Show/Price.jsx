import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import { updateDisplayOption, resetDisplayOption } from 'site/displayOptions/actions';

import { FormattedCurrency } from 'react-formatted';

import CurrencyToggle from 'site/components/CurrencyToggle';

import { ShowXsSm, HideXsSm } from 'site/styles/mediaUtils';

import styled from 'styled-components';
import media from 'site/styles/media';

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
  font-size: 1.2rem;
  line-height: 1.8rem;
  margin: 0.5rem 1rem 0 0;
  padding: 0;
  vertical-align: top;
  font-weight: 500;
  ${props =>
    props.isActive &&
    `
    color: #ff4c4e;
  `} ${media.sm`
    font-size: 1.4rem;
    margin: 0.5rem 2rem 0 0;
  `};
`;

const Wrapper = styled.div`display: flex;`;

const ToggleWrapper = styled.div`
  margin-left: auto;
  margin-top: 0.2rem;
`;

class PropertyPrice extends Component {
  static propTypes = {
    deal: PropTypes.object.isRequired,
    dealType: PropTypes.string.isRequired,
  };

  handleCurrencyButtonClick(currency) {
    const { state } = this.props;
    const selected = state.displayOptions.currency;

    if (selected === currency) {
      this.props.actions.resetDisplayOption('currency');
    } else {
      this.props.actions.updateDisplayOption('currency', currency);
    }
  }

  render() {
    const { state, deal = {}, dealType } = this.props;
    const currentCurrency = state.displayOptions.currency;

    const dealPrice = deal.multiCurrencyPrice[currentCurrency] || deal.multiCurrencyPrice.usd;

    return (
      <span>
        <HideXsSm>
          <div>
            <FormattedCurrency
              value={dealPrice}
              symbol={currentCurrency && currentCurrency.toUpperCase()}
            />{' '}
            {dealType === 'rent' ? '/ месяц' : ''}
          </div>

          <Button
            isActive={currentCurrency === 'usd'}
            disabled={currentCurrency === 'usd'}
            onClick={() => this.handleCurrencyButtonClick('usd')}
          >
            USD
          </Button>
          <Button
            isActive={currentCurrency === 'rub'}
            disabled={currentCurrency === 'rub'}
            onClick={() => this.handleCurrencyButtonClick('rub')}
          >
            Рубли
          </Button>
        </HideXsSm>

        <ShowXsSm>
          <Wrapper>
            <FormattedCurrency value={dealPrice} symbol={currentCurrency.toUpperCase()} />{' '}
            {dealType === 'rent' ? '/ месяц' : ''}
            <ToggleWrapper>
              <CurrencyToggle />
            </ToggleWrapper>
          </Wrapper>
        </ShowXsSm>
      </span>
    );
  }
}

const pickState = ({ displayOptions }) => ({
  state: { displayOptions },
});

const pickActions = (dispatch) => {
  const actions = {
    updateDisplayOption,
    resetDisplayOption,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(pickState, pickActions)(PropertyPrice);
