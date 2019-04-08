/* eslint-disable camelcase */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import UI from 'ui';
const {
  Button,
  Grid: { Container, Row, Col },
} = UI;

import cn from 'classnames';
import s from 'styles/components/satellites/filter.css';
import sUtils from 'styles/utils';
import st from 'styles/themes';
const styles = {
  ...s,
  ...sUtils,
};

const cssOptions = {
  allowMultiple: true,
};

const key = 'renovate';

class Renovate extends Component {
  onUpdate(value) {
    const { selected = {} } = this.props;
    const items = selected[key] || [];
    const index = items.indexOf(value);

    // TODO fix this (move to helpers?)
    if (index === -1) {
      this.props.updateFilter(key, [...items, value]);
    } else {
      this.props.updateFilter(key, items.filter((el, i) => i !== index));
    }
  }

  render() {
    const theme = st.filterSatellites;
    const { selected = {} } = this.props;
    const items = selected[key] || [];

    return (
      <div>
        <Container fluid styleName="contentContainer">
          <Row md="middle">
            <Col styleName="kindContainer">
              <Button
                className={cn(
                  theme.hollowBtn,
                  items.indexOf('full_construction') > -1 && theme.active,
                )}
                onClick={() => this.onUpdate('full_construction')}
              >
                Под ключ
              </Button>
              <Button
                className={cn(
                  theme.hollowBtn,
                  items.indexOf('partly_turnkey') > -1 && theme.active,
                )}
                onClick={() => this.onUpdate('partly_turnkey')}
              >
                Частично под ключ
              </Button>
              <Button
                className={cn(
                  theme.hollowBtn,
                  items.indexOf('rough_finish') > -1 && theme.active,
                )}
                onClick={() => this.onUpdate('rough_finish')}
              >
                Черновая отделка
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CSSModules(Renovate, styles, cssOptions);
