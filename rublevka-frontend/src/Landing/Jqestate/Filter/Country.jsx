import React, { Component } from 'react';

import cn from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import * as FilterActions from 'core/actions/filters';
import { push } from 'react-router-redux';

import PriceSelect from 'ui/priceSelect';

import { track } from 'core/analytics';
import * as analyticsEvents from 'core/analytics/constants';

import UI from 'ui';
const {
  Button,
  Select,
  Visibility,
  Form,
  Grid: { Col },
} = UI;

import sSelect from 'styles/ui/select';
import s from 'styles/landing/jqestate/list';

import * as options from 'constants/leads/options';
import { dealTypes } from 'constants/properties/dictionaries';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dealType: `prodaja`,
      kind: `house`,
      priceRange: {
        min: 0,
        max: 30.02,
      },
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const { dealType, kind, priceRange } = this.state;

    const isPriceFilterEnabled =
      priceRange &&
      (priceRange.min || (priceRange.max && priceRange.max >= 31));

    const price = isPriceFilterEnabled
      ? {
          min: priceRange.min !== 0 ? priceRange.min : undefined,
          max:
            priceRange.max === 30.02 || priceRange.max === 100.02
              ? undefined
              : priceRange.max,
        }
      : undefined;

    this.props.actions.updateFilter(
      `countryProperties.${dealTypes[dealType]}`,
      {
        [dealTypes[dealType]]: price,
        kind: [kind],
      },
    );

    track(analyticsEvents.landingSearchSubmitted());
    this.props.actions.push(`/zagorodnaya/${dealType}`);
  }

  onChange(ref, value) {
    this.setState({
      [ref]: value,
    });
  }

  render() {
    const { kind, priceRange } = this.state;
    const dealType = dealTypes[this.state.dealType];
    const kindOptions = options.kinds.country.filter(
      item => !(dealType === `rent` && item.value === `land`),
    );

    return (
      <Col xs="12">
        <Form.Container className={s.tabContainer} onSubmit={::this.onSubmit}>
          <Visibility xs="hidden" sm="hidden">
            <Select
              value={this.state.dealType}
              className={cn(sSelect.landingSelect, s.width16)}
              placeholder="Купить"
              options={options.dealType}
              onChange={value => this.onChange(`dealType`, value)}
              disableReset
            />

            <Select
              value={kind}
              className={cn(sSelect.landingSelect, s.width25)}
              placeholder="Тип недвижимости"
              options={kindOptions}
              onChange={value => this.onChange(`kind`, value)}
              disableReset
            />

            <PriceSelect
              value={priceRange}
              onChange={value => this.onChange(`priceRange`, value)}
              dealType={dealType}
            />

            <Button
              size="lg"
              kind="primary"
              className={cn(s.btnPrimary, s.resetLeftBorderRadius)}
              type="submit"
            >
              Найти
            </Button>
          </Visibility>
          <Visibility md="hidden" lg="hidden">
            <Button
              kind="primary"
              size="xlg"
              type="submit"
              to="/zagorodnaya/prodaja"
            >
              Начать поиск
            </Button>
          </Visibility>
        </Form.Container>
      </Col>
    );
  }
}

const pickActions = dispatch => {
  const actions = {
    ...FilterActions,
    push,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  null,
  pickActions,
)(Filter);
