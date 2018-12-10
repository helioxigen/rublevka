import React, { Component } from 'react';

import { dealTypes } from 'site/constants/properties/dictionaries';
import { prices } from '../../v2/List/Filter/options';

import { connect } from 'react-redux';

// actions
import { updateDisplayOption, resetDisplayOption } from 'site/displayOptions/actions';

import SelectGroup from 'core/components/ui/select/selectGroup';

import UI from 'site/ui';

import { Wrapper, SelectWrapper } from '../../v2/List/Filter/styled';

const { Grid: { Container, Row, Col } } = UI;

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
    const currency = `${dealTypes[dealType]}Offer.multiCurrencyPrice.usd`;

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
                <SelectGroup options={dealPrices} selected={price} onUpdate={this.onUpdate} />
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
