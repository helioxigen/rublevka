import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import SelectGroup from 'core/components/ui/select/selectGroup';

import UI from 'site/ui';
const {
  Grid: { Container, Row, Col },
} = UI;

import s from 'site/styles/components/satellites/filter.css';
import sSlider from 'site/styles/ui/slider.css';
import sUtils from 'site/styles/utils';

const styles = {
  ...s,
  ...sUtils,
  ...sSlider,
};

import { distances } from 'site/constants/leads/options';

const key = `mkadDistance`;

const cssOptions = {
  allowMultiple: true,
};

class Distance extends Component {
  onUpdate(ref, value) {
    const { selected = {} } = this.props;
    const distance = selected[key] || {};
    const stateRef = ref === `min` ? `max` : `min`;

    const options = {
      [stateRef]: distance[stateRef],
      [ref]: value,
    };

    this.props.updateFilter(key, options);
  }

  render() {
    const { selected = {} } = this.props;
    const distance = selected[key] || {};

    return (
      <Container fluid styleName="contentContainer">
        <Row md="middle">
          <Col md="10">
            <div className={s.selectContainer}>
              <SelectGroup
                options={distances}
                selected={distance}
                onUpdate={::this.onUpdate}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CSSModules(Distance, styles, cssOptions);
