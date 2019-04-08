import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import SelectGroup from 'core/components/ui/select/selectGroup';

import UI from 'ui';
const {
  Grid: { Container, Row, Col },
} = UI;

import s from 'styles/components/satellites/filter.css';
import sSlider from 'styles/ui/slider.css';
import sUtils from 'styles/utils.css';

import { dealTypes } from 'constants/properties/dictionaries';
import { prices } from 'constants/leads/options';

const styles = {
  ...s,
  ...sUtils,
  ...sSlider,
};

const cssOptions = {
  allowMultiple: true,
};

class Price extends Component {
  onUpdate(ref, value) {
    const { dealType, selected = {} } = this.props;
    const price = selected[dealTypes[dealType]] || {};
    const stateRef = ref === `min` ? `max` : `min`;

    const options = {
      [stateRef]: price[stateRef],
      [ref]: value,
    };

    this.props.updateFilter(dealTypes[dealType], options);
  }

  render() {
    const { selected = {}, dealType } = this.props;
    const key = dealTypes[dealType];
    const price = selected[key] || {};

    const dealPrices = prices[key] || [];

    return (
      <Container fluid styleName="contentContainer">
        <Row md="middle">
          <Col md="5">
            <div className={s.selectContainer}>
              <SelectGroup
                options={dealPrices}
                selected={price}
                onUpdate={::this.onUpdate}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CSSModules(Price, styles, cssOptions);
