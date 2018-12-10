import React, { Component } from 'react';

import UI from 'site/ui';

import { FilterWrapperKind, StCheckbox } from './styled';

const { Grid: { Container, Row, Col } } = UI;

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
    const { selected = {}, dealType } = this.props;
    const items = selected[key] || [];

    return (
      <FilterWrapperKind>
        <Container fluid>
          <Row md="middle">
            <Col>
              <StCheckbox
                checked={items.indexOf('house') > -1}
                handleChange={() => this.onUpdate('house')}
              >
                Дом
              </StCheckbox>
              {dealType !== 'arenda' && (
                <StCheckbox
                  checked={items.indexOf('land') > -1}
                  handleChange={() => this.onUpdate('land')}
                >
                  Участок
                </StCheckbox>
              )}
              <StCheckbox
                checked={items.indexOf('townhouse') > -1}
                handleChange={() => this.onUpdate('townhouse')}
              >
                Таунхаус
              </StCheckbox>
              <StCheckbox
                checked={items.indexOf('flat') > -1}
                handleChange={() => this.onUpdate('flat')}
              >
                Квартира
              </StCheckbox>
              {dealType !== 'prodaja' && (
                <StCheckbox
                  checked={items.indexOf('office') > -1}
                  handleChange={() => this.onUpdate('office')}
                >
                  Офис
                </StCheckbox>
              )}
            </Col>
          </Row>
        </Container>
      </FilterWrapperKind>
    );
  }
}

export default Kind;
