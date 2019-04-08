import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import cn from 'classnames';
import s from 'styles/components/satellites/filter.css';
import sUtils from 'styles/utils.css';
import st from 'styles/themes';

import UI from 'ui';

const {
  Button,
  Grid: { Container, Row, Col },
} = UI;

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
    const { selected = {}, dealType } = this.props;
    const items = selected[key] || [];

    return (
      <div>
        <Container fluid styleName="contentContainer">
          <Row md="middle">
            <Col styleName="kindContainer">
              <Button
                className={cn(
                  theme.hollowBtn,
                  items.indexOf('house') > -1 && theme.active,
                )}
                onClick={() => this.onUpdate('house')}
              >
                Дом
              </Button>
              {dealType !== 'arenda' && (
                <Button
                  className={cn(
                    theme.hollowBtn,
                    items.indexOf('land') > -1 && theme.active,
                  )}
                  onClick={() => this.onUpdate('land')}
                >
                  Участок
                </Button>
              )}
              <Button
                className={cn(
                  theme.hollowBtn,
                  items.indexOf('townhouse') > -1 && theme.active,
                )}
                onClick={() => this.onUpdate('townhouse')}
              >
                Таунхаус
              </Button>
              <Button
                className={cn(
                  theme.hollowBtn,
                  items.indexOf('flat') > -1 && theme.active,
                )}
                onClick={() => this.onUpdate('flat')}
              >
                Квартира
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CSSModules(Kind, styles, cssOptions);
