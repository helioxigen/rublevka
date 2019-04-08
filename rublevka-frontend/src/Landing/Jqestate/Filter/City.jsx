import React, { Component } from 'react';

import cn from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import * as FilterActions from 'core/actions/filters';
import { push } from 'react-router-redux';

import { track } from 'core/analytics';
import * as analyticsEvents from 'core/analytics/constants';

import PriceSelect from 'ui/priceSelect';
import RoomSelect from 'ui/roomSelect';

import UI from 'ui';
const {
  Form,
  Button,
  Select,
  Visibility,
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
      rooms: [],
      priceRange: {
        min: 0,
        max: 30.02,
      },
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const { dealType, rooms, priceRange } = this.state;

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

    this.props.actions.updateFilter(`cityProperties.${dealTypes[dealType]}`, {
      [dealTypes[dealType]]: price,
      rooms,
    });

    track(analyticsEvents.landingSearchSubmitted());
    this.props.actions.push(`/gorodskaya/${dealType}`);
  }

  onChange(ref, value) {
    this.setState({
      [ref]: value,
    });
  }

  render() {
    const { rooms, priceRange } = this.state;
    const dealType = dealTypes[this.state.dealType];

    return (
      <Col xs="12">
        <Form.Container className={s.tabContainer} onSubmit={::this.onSubmit}>
          <Visibility xs="hidden" sm="hidden">
            <Select
              className={cn(sSelect.landingSelect, s.width13_7)}
              placeholder="Купить"
              options={options.dealType}
              value={this.state.dealType}
              onChange={value => this.onChange(`dealType`, value)}
              disableReset
            />

            <RoomSelect
              className={s.btnGroup}
              buttonClassName={s.btn}
              buttonActiveClassName={s.active}
              lastButtonClassName={s.resetRightBorderRadius}
              value={rooms}
              onChange={(ref, value) => this.onChange(`rooms`, value)}
              showTitle
            >
              <span className={s.btnGroupTitle}>Комнат</span>
            </RoomSelect>

            <PriceSelect
              dealType={dealType}
              value={priceRange}
              onChange={value => this.onChange(`priceRange`, value)}
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
            <Button kind="primary" size="xlg" type="submit">
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
