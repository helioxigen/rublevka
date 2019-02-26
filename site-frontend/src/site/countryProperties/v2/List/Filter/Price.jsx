import React, { Component } from 'react';

import { dealTypes } from 'site/constants/properties/dictionaries';
import { prices } from './options';

import { connect } from 'react-redux';

// actions
import {
  updateDisplayOption,
  resetDisplayOption,
} from 'site/displayOptions/actions';

import SelectGroup from './SelectGroup';

import UI from 'site/ui';

import {
  Wrapper,
  SelectWrapper,
  CurrencySelect,
  CurrencySelectMobile,
  SelectedCurrency,
  CurrencyOptions,
  CurrencyItem,
  CurrencyItemLast,
} from './styled';

const {
  Visibility,
  Grid: { Container, Row, Col },
} = UI;

class Price extends Component {
  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);

    this.state = { isOpen: false };
  }

  onUpdate(ref, value) {
    const { state, dealType, selected = {} } = this.props;
    const price = selected[dealTypes[dealType]] || {};
    const stateRef = ref === 'min' ? 'max' : 'min';
    const currency = `${dealTypes[dealType]}Offer.multiCurrencyPrice.${
      state.displayOptions.currency
    }`;

    const options = {
      [stateRef]: price[stateRef],
      [ref]: value,
      currencyPrice: currency,
    };

    this.props.updateFilter(dealTypes[dealType], options);
  }

  toggleSelect() {
    if (!this.state.isOpen) {
      document.addEventListener('click', this.toggleSelect, false);
    } else {
      document.removeEventListener('click', this.toggleSelect, false);
    }
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  handleCurrencyButtonClick(currency) {
    const { state } = this.props;
    const selected = state.displayOptions.currency;

    if (selected === currency) {
      this.props.dispatch(resetDisplayOption('currency'));
    } else {
      this.props.dispatch(updateDisplayOption('currency', currency));
    }

    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { selected = {}, dealType, state } = this.props;
    const key = dealTypes[dealType];
    const price = selected[key] || {};

    const current = state.displayOptions.currency;

    const dealPrices = prices[current][key] || [];

    return (
      <Wrapper>
        <Container fluid>
          <Row md="middle">
            <Col md="5">
              <SelectWrapper>
                <SelectGroup
                  options={dealPrices}
                  selected={price}
                  onUpdate={this.onUpdate}
                />
                <CurrencySelect>
                  <Visibility xs="hidden" sm="hidden" md="hidden">
                    <SelectedCurrency
                      onClick={this.toggleSelect}
                      isActive={this.state.isOpen}
                    >
                      {current === 'rub' ? '₽' : '$'}
                    </SelectedCurrency>

                    <CurrencyOptions isHidden={!this.state.isOpen}>
                      <CurrencyItem
                        isActive={current === 'rub'}
                        onClick={() => this.handleCurrencyButtonClick('rub')}
                      >
                        ₽
                      </CurrencyItem>

                      <CurrencyItemLast
                        isActive={current === 'usd'}
                        onClick={() => this.handleCurrencyButtonClick('usd')}
                      >
                        $
                      </CurrencyItemLast>
                    </CurrencyOptions>
                  </Visibility>

                  <Visibility lg="hidden">
                    <CurrencySelectMobile
                      onChange={e =>
                        this.handleCurrencyButtonClick(e.target.value)
                      }
                    >
                      <option
                        value="usd"
                        selected={current === 'usd' && 'selected'}
                      >
                        $
                      </option>
                      <option
                        selected={current === 'rub' && 'selected'}
                        value="rub"
                      >
                        ₽
                      </option>
                    </CurrencySelectMobile>
                  </Visibility>
                </CurrencySelect>
              </SelectWrapper>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

const pickState = ({ displayOptions }) => ({
  state: { displayOptions },
});

export default connect(pickState)(Price);
