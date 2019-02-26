import React, { Component } from 'react';

import { connect } from 'react-redux';

import SelectGroup from 'core/components/ui/select/selectGroup';

import UI from 'site/ui';
const {
  Button,
  Visibility,
  Grid: { Col },
} = UI;

import cn from 'classnames';
import s from 'site/styles/settlements/filter';
import sUtils from 'site/styles/utils';
import st from 'site/styles/themes';

import { prices } from 'site/constants/leads/options';

const keyKind = `kind`;

class SettlementFilter extends Component {
  onUpdate(id) {
    const { selected = {} } = this.props;
    const items = selected[keyKind] || [];
    const index = items.indexOf(id);

    // TODO fix this (move to helpers?)
    if (index === -1) {
      this.props.updateFilter(keyKind, [...items, id]);
    } else {
      this.props.updateFilter(keyKind, items.filter((el, i) => i !== index));
    }
  }

  onUpdatePrice(ref, value) {
    const { dealType, selected = {} } = this.props;
    const price = selected[dealType] || {};
    const stateRef = ref === `min` ? `max` : `min`;

    const options = {
      [stateRef]: price[stateRef],
      [ref]: value,
    };

    this.props.updateFilter(dealType, options);
  }

  render() {
    const { selected = {}, id, state, isResaleProperty, dealType } = this.props;
    const { settlements = {} } = state;
    const settlement = settlements[id] || {};
    const { data = {} } = settlement;
    const { rentProperties = {} } = data.statistics || {};

    const price = selected[dealType] || {};

    const isRentProperties = rentProperties.total > 0;

    const items = selected[keyKind] || [];

    const dealPrices = prices[dealType] || [];

    const isSelected = items.length !== 0 || !!price.min || !!price.max;

    return (
      <Col xs="12" sm="10" className={s.filterContainer}>
        <Visibility xs="hidden" sm="hidden">
          <div className={s.inputFilterContainer}>
            <SelectGroup
              options={dealPrices}
              selected={price}
              onUpdate={::this.onUpdatePrice}
            />
          </div>

          {isResaleProperty && isRentProperties && (
            <Button
              className={cn(
                st.settlement.hollowBtn,
                dealType === `sale` && st.settlement.active,
              )}
              onClick={() => this.props.toggleDealType(`sale`)}
            >
              Продажа
            </Button>
          )}
          {isResaleProperty && isRentProperties && (
            <Button
              className={cn(
                st.settlement.hollowBtn,
                dealType === `rent` && st.settlement.active,
              )}
              onClick={() => this.props.toggleDealType(`rent`)}
            >
              Аренда
            </Button>
          )}
          <Button
            className={cn(
              st.settlement.hollowBtn,
              items.indexOf(`house`) > -1 && st.settlement.active,
            )}
            onClick={() => this.onUpdate(`house`)}
          >
            Дом
          </Button>
          <Button
            className={cn(
              st.settlement.hollowBtn,
              items.indexOf(`land`) > -1 && st.settlement.active,
            )}
            onClick={() => this.onUpdate(`land`)}
          >
            Участок
          </Button>
          {isResaleProperty && (
            <Button
              className={cn(
                st.settlement.hollowBtn,
                items.indexOf(`townhouse`) > -1 && st.settlement.active,
              )}
              onClick={() => this.onUpdate(`townhouse`)}
            >
              Таунхаус
            </Button>
          )}
          {isSelected && (
            <Button
              className={cn(
                st.filterSatellites.btnClearAllSettlements,
                sUtils.textPrimary,
              )}
              onClick={this.props.resetFilter}
            >
              Сбросить
            </Button>
          )}
        </Visibility>

        <Visibility md="hidden" lg="hidden">
          <div className={s.inputFilterContainer}>
            <SelectGroup
              options={dealPrices}
              selected={price}
              onUpdate={::this.onUpdatePrice}
            />
          </div>

          <div className={s.hollowBtnContainer}>
            {isResaleProperty && isRentProperties && (
              <Button
                className={cn(
                  st.settlement.hollowBtn,
                  dealType === `sale` && st.settlement.active,
                )}
                onClick={() => this.props.toggleDealType(`sale`)}
              >
                Продажа
              </Button>
            )}
            {isResaleProperty && isRentProperties && (
              <Button
                className={cn(
                  st.settlement.hollowBtn,
                  dealType === `rent` && st.settlement.active,
                )}
                onClick={() => this.props.toggleDealType(`rent`)}
              >
                Аренда
              </Button>
            )}
            <Button
              className={cn(
                st.settlement.hollowBtn,
                items.indexOf(`house`) > -1 && st.settlement.active,
              )}
              onClick={() => this.onUpdate(`house`)}
            >
              Дом
            </Button>
            <Button
              className={cn(
                st.settlement.hollowBtn,
                items.indexOf(`land`) > -1 && st.settlement.active,
              )}
              onClick={() => this.onUpdate(`land`)}
            >
              Участок
            </Button>
            {isResaleProperty && (
              <Button
                className={cn(
                  st.settlement.hollowBtn,
                  items.indexOf(`townhouse`) > -1 && st.settlement.active,
                )}
                onClick={() => this.onUpdate(`townhouse`)}
              >
                Таунхаус
              </Button>
            )}

            {isSelected && (
              <Button
                className={cn(
                  st.filterSatellites.btnClearAllSettlements,
                  sUtils.textPrimary,
                )}
                onClick={this.props.resetFilter}
              >
                Сбросить
              </Button>
            )}
          </div>
        </Visibility>
      </Col>
    );
  }
}

// redux connectors
const pickState = state => {
  const { settlements } = state;

  return {
    state: {
      settlements,
    },
  };
};

export default connect(pickState)(SettlementFilter);
