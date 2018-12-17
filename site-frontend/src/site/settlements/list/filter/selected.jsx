import React, { Component } from 'react';
import global from 'window-or-global';

const isJQ = global.config.domain === 'jq.estate';

import SelectGroup from 'core/components/ui/select/selectGroup';

import UI from 'site/ui';
const { Button, Grid: { Col } } = UI;

import cn from 'classnames';
import s from 'site/styles/settlements/filter';
import st from 'site/styles/themes';
import sUtils from 'site/styles/utils';

import { distances } from 'site/constants/leads/options';

const keyRoute = 'routeId';
const keyDistance = 'mkadDistance';

class Routes extends Component {
  onUpdate(id) {
    const { selected = {} } = this.props;
    const items = selected[keyRoute] || [];
    const index = items.indexOf(id);

    // TODO fix this (move to helpers?)
    if (index === -1) {
      this.props.updateFilter(keyRoute, [...items, id]);
    } else {
      this.props.updateFilter(keyRoute, items.filter((el, i) => i !== index));
    }
  }

  onUpdateDistance(ref, value) {
    const { mkadDistance = {} } = this.props.selected || {};
    const stateRef = ref === 'min' ? 'max' : 'min';

    const options = {
      [stateRef]: mkadDistance[stateRef],
      [ref]: value,
    };

    this.props.updateFilter(keyDistance, options);
  }

  render() {
    const { selected = {} } = this.props;
    const { mkadDistance = {} } = selected;
    const values = selected[keyRoute] || [];

    const isSelected = values.length !== 0 || !!mkadDistance.min || !!mkadDistance.max;

    return (
      <Col xs="12" className={sUtils.resetPadding}>
        <div className={s.inputDistanceContainer}>
          {/* <span className={s.distanceTitle}>От МКАД</span> */}

          <SelectGroup
            options={distances}
            selected={mkadDistance}
            onUpdate={::this.onUpdateDistance}
          />
        </div>

        <div className={s.hollowBtnContainer}>
          {isJQ &&
            global.config.routes.map((route) => {
              const { id, name } = route;
              const index = values.indexOf(id);
              const isActive = index > -1;
              const className = cn(st.settlement.hollowBtn, isActive && st.settlement.active);

              return (
                <Button key={id} className={className} onClick={() => this.onUpdate(id)}>
                  {name}
                </Button>
              );
            })}

          {isSelected && (
            <Button
              className={cn(st.filterSatellites.btnClearAllSettlements, sUtils.textPrimary)}
              onClick={this.props.resetFilter}
            >
              Сбросить
            </Button>
          )}
        </div>
      </Col>
    );
  }
}

export default Routes;
