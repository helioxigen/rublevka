import React, { Component } from 'react';

import { connect } from 'react-redux';

import SelectGroup from 'core/components/ui/select/selectGroup';

import UI from 'site/ui';
const {
  Button, Visibility,
  Grid: { Col },
} = UI;

import cn from 'classnames';
import s from 'landing/styles/properties/filter';

import { prices } from 'landing/properties/options';

const keyKind = `kind`;
const keyGroup = `isResale`;

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

  onUpdateGroup() {
    const { selected = {} } = this.props;
    const isPrimary = selected[keyGroup] === `false`;

    if (!isPrimary) {
      this.props.updateFilter(keyGroup, `false`);
    } else {
      this.props.removeFilter(keyGroup);
    }
  }

  render() {
    const { selected = {}, isResaleProperty, dealType } = this.props;

    const price = selected[dealType] || {};
    const items = selected[keyKind] || [];
    const isPrimary = selected[keyGroup] === `false`;

    const dealPrices = prices[dealType] || [];

    const isSelected = items.length !== 0 || !!price.min || !!price.max || isPrimary;

    return (
      <Col xs="12" sm="10" className={s.filterContainer}>
        <Visibility xs="hidden" sm="hidden" md="hidden">
          <div className={s.inputFilterContainer}>
            <SelectGroup
              options={dealPrices}
              selected={price}
              onUpdate={::this.onUpdatePrice}
            />
          </div>

          <Button className={cn(s.hollowBtn, items.indexOf(`house`) > -1 && s.active)} onClick={() => this.onUpdate(`house`)}>
            Дом
          </Button>
          <Button className={cn(s.hollowBtn, items.indexOf(`land`) > -1 && s.active)} onClick={() => this.onUpdate(`land`)}>
            Участок
          </Button>
          {/* {isResaleProperty &&
            <Button className={cn(s.hollowBtn, items.indexOf(`townhouse`) > -1 && s.active)} onClick={() => this.onUpdate(`townhouse`)}>
              Таунхаус
            </Button>
          } */}
          <Button className={cn(s.hollowBtn, isPrimary && s.active)} onClick={() => this.onUpdateGroup()}>
            Первичные предложения
          </Button>
          {isSelected && (
            <Button className={s.btnClearAll} onClick={this.props.resetFilter}>
              Сбросить
            </Button>
          )}
        </Visibility>

        <Visibility lg="hidden">
          <div className={s.inputFilterContainer}>
            <SelectGroup
              options={dealPrices}
              selected={price}
              onUpdate={::this.onUpdatePrice}
            />
          </div>

          <div className={s.hollowBtnContainer}>
            <Button className={cn(s.hollowBtn, items.indexOf(`house`) > -1 && s.active)} onClick={() => this.onUpdate(`house`)}>
              Дом
            </Button>
            <Button className={cn(s.hollowBtn, items.indexOf(`land`) > -1 && s.active)} onClick={() => this.onUpdate(`land`)}>
              Участок
            </Button>
            {isResaleProperty &&
              <Button className={cn(s.hollowBtn, items.indexOf(`townhouse`) > -1 && s.active)} onClick={() => this.onUpdate(`townhouse`)}>
                Таунхаус
              </Button>
            }
            <Button className={cn(s.hollowBtn, isPrimary && s.active)} onClick={() => this.onUpdateGroup()}>
              Первичные предложения
            </Button>

            {isSelected && (
              <Button className={s.btnClearAll} onClick={this.props.resetFilter}>
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
const pickState = (state) => {
  const { settlements } = state;

  return {
    state: {
      settlements,
    },
  };
};

export default connect(pickState)(SettlementFilter);
