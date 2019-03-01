import React, { Component } from 'react';

import { dealTypes } from 'site/constants/properties/dictionaries';
import { prices } from './options';

import { connect } from 'react-redux';

// actions
import {
  updateDisplayOption,
  resetDisplayOption,
} from 'site/displayOptions/actions';

import SelectGroup from 'core/components/v2019/ui/select/selectGroup';

import UI from 'site/ui/v2019';

import { ControlsContainer, CheckboxWrapper, Title, FilterHeader, IconReset } from './styled';

import { Wrapper } from '../../../v2/List/Filter/styled';

const {
  Grid: { Container },
  RadioButton,
} = UI;


class Price extends Component {
  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.onReset = this.onReset.bind(this);

    this.state = { isOpen: false, currencyTag: 'usd' };
  }

  componentDidMount() {
    const { selected = {}, dealType } = this.props;
    const key = dealTypes[dealType];
    const { currencyPrice } = (selected[key] || {});

    if (currencyPrice) {
      if (currencyPrice === `${key}Offer.multiCurrencyPrice.usd`) {
        this.onChangeCurrency('usd');
      } else if (currencyPrice === `${key}Offer.multiCurrencyPrice.rub`) {
        this.onChangeCurrency('rub');
      }
    }
  }

  onUpdate(ref, value) {
    const { dealType, selected = {} } = this.props;
    const price = selected[dealTypes[dealType]] || {};
    const stateRef = ref === 'min' ? 'max' : 'min';
    const currency = `${dealTypes[dealType]}Offer.multiCurrencyPrice.${this.state.currencyTag}`;

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

  onChangeCurrency(currency) {
    this.setState({
      currencyTag: currency,
    });
  }

  onReset() {
    const { dealType } = this.props;

    this.props.updateFilter(dealTypes[dealType], {});
  }

  render() {
    const { selected = {}, dealType } = this.props;
    const key = dealTypes[dealType];
    const price = selected[key] || {};

    // const current = state.displayOptions.currency;

    const dealPrices = prices[this.state.currencyTag][key] || [];

    return (
      <Wrapper >
        <Container fluid styleName="contentContainer">
          <FilterHeader>
            <Title>Цена</Title>
            {Object.keys(price).length > 0 && <IconReset onClick={this.onReset} icon="times" />}
          </FilterHeader>
          <ControlsContainer>
            <SelectGroup
              options={dealPrices}
              selected={price}
              onUpdate={this.onUpdate}
            />
            <CheckboxWrapper>
              <RadioButton
                checked={this.state.currencyTag === 'usd'}
                name="house"
                handleChange={() => this.onChangeCurrency('usd')}
                text="Доллары ($)"
              />
              <RadioButton
                checked={this.state.currencyTag === 'rub'}
                name="house"
                handleChange={() => this.onChangeCurrency('rub')}
                text="Рубли (₽)"
              />
            </CheckboxWrapper>
          </ControlsContainer>
        </Container>
      </Wrapper>
    );
  }
}

const pickState = ({ displayOptions }) => ({
  state: { displayOptions },
});

export default connect(pickState)(Price);

