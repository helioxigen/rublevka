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

const key = 'kind';

class Kind extends Component {
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
      <Container fluid styleName="contentContainer">
        <Row md="middle">
          <Col styleName="kindContainer">
            <Button
              className={cn(
                theme.hollowBtn,
                items.indexOf('flat') > -1 && theme.active,
              )}
              onClick={() => this.onUpdate('flat')}
            >
              Квартира
            </Button>
            <Button
              className={cn(
                theme.hollowBtn,
                items.indexOf('apartment') > -1 && theme.active,
              )}
              onClick={() => this.onUpdate('apartment')}
            >
              Апартаменты
            </Button>
            <Button
              className={cn(
                theme.hollowBtn,
                items.indexOf('penthouse') > -1 && theme.active,
              )}
              onClick={() => this.onUpdate('penthouse')}
            >
              Пентхаус
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CSSModules(Kind, styles, cssOptions);
