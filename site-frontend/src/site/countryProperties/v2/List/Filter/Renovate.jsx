/* eslint-disable camelcase */
import React, { Component } from 'react';

import UI from 'site/ui';

import { FilterWrapper, StCheckbox } from './styled';

const { Grid: { Container, Row, Col } } = UI;

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
    const { selected = {} } = this.props;
    const items = selected[key] || [];

    return (
      <FilterWrapper>
        <Container fluid>
          <Row md="middle">
            <Col>
              <StCheckbox
                checked={items.indexOf('full_construction') > -1}
                handleChange={() => this.onUpdate('full_construction')}
              >
                Под ключ
              </StCheckbox>
              <StCheckbox
                checked={items.indexOf('partly_turnkey') > -1}
                handleChange={() => this.onUpdate('partly_turnkey')}
              >
                Частично под ключ
              </StCheckbox>
              <StCheckbox
                checked={items.indexOf('rough_finish') > -1}
                handleChange={() => this.onUpdate('rough_finish')}
              >
                Черновая отделка
              </StCheckbox>
            </Col>
          </Row>
        </Container>
      </FilterWrapper>
    );
  }
}

export default Renovate;
