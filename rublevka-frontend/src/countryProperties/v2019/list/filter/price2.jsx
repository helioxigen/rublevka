import React, { Component } from 'react';
import { connect } from 'react-redux';

import { dealTypes } from '../../../../constants/properties/dictionaries';
import { prices } from './options';

// actions
import { updateDisplayOption } from '../../../../displayOptions/actions';

import SelectGroup from '../../../../core/components/v2019/ui/select/selectGroup';

import UI from '../../../../ui/v2019';

import {
  ControlsContainer,
  CheckboxWrapper,
  Title,
  FilterHeader,
  IconReset,
} from './styled';

const {
  Grid: { Container },
  RadioButton,
} = UI;

class Price extends Component {
  onUpdate = (ref, value) => {
    const {
      dealType,
      selected = {},
      displayOptions: { currency: selectedCurrency },
    } = this.props;
    const price = selected[dealTypes[dealType]] || {};
    const stateRef = ref === 'min' ? 'max' : 'min';
    const currency = `${
      dealTypes[dealType]
    }Offer.multiCurrencyPrice.${selectedCurrency}`;

    const options = {
      [stateRef]: price[stateRef],
      [ref]: value,
      currencyPrice: currency,
    };

    this.props.updateFilter(dealTypes[dealType], options);
  };

  handleCurrencyButtonClick(currency) {
    const { dispatch } = this.props;

    dispatch(updateDisplayOption('currency', currency));
  }

  onReset = () => {
    const { dealType } = this.props;

    this.props.updateFilter(dealTypes[dealType], {});
  };

  render() {
    const {
      selected = {},
      dealType,
      displayOptions: { currency },
    } = this.props;
    const key = dealTypes[dealType];
    const price = selected[key] || {};

    const dealPrices = prices[currency][key] || [];

    return (
      <section>
        <Container fluid>
          <FilterHeader>
            <Title>Цена</Title>
            {Object.keys(price).length > 0 && (
              <IconReset onClick={this.onReset} icon="times" />
            )}
          </FilterHeader>
          <ControlsContainer>
            <SelectGroup
              options={dealPrices}
              selected={price}
              onUpdate={this.onUpdate}
            />
            <CheckboxWrapper>
              <RadioButton
                name="currency"
                text="Доллары ($)"
                value="usd"
                checked={currency === 'usd'}
                handleChange={() => this.handleCurrencyButtonClick('usd')}
              />
              <RadioButton
                name="currency"
                text="Рубли (₽)"
                value="rub"
                checked={currency === 'rub'}
                handleChange={() => this.handleCurrencyButtonClick('rub')}
              />
              <RadioButton
                name="currency"
                text="Евро (€)"
                value="eur"
                checked={currency === 'eur'}
                handleChange={() => this.handleCurrencyButtonClick('eur')}
              />
            </CheckboxWrapper>
          </ControlsContainer>
        </Container>
      </section>
    );
  }
}

const pickState = ({ displayOptions }) => ({ displayOptions });

export default connect(pickState)(Price);
