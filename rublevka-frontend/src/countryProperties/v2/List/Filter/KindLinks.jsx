import React, { Component } from 'react';

import UI from 'ui';

import { kinds } from 'constants/places';
import { kindsTranslit } from 'constants/properties/dictionaries';

import { FilterWrapperKind, StCheckbox, StLink } from './styled';

const {
  Grid: { Container, Row, Col },
} = UI;

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

  generateLink(kind) {
    const { selected = {}, location } = this.props;
    const urlPath = location.pathname;
    const items = selected[key] || [];

    if (items.indexOf(kind) > -1 || items.length !== 0) {
      return kinds[kind];
    }
    return (
      <StLink
        onClick={() => this.onUpdate(kind)}
        to={`${urlPath}/${kindsTranslit[kind]}`}
      >
        {kinds[kind]}
      </StLink>
    );
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
                {this.generateLink('house')}
              </StCheckbox>
              {dealType !== 'arenda' && (
                <StCheckbox
                  checked={items.indexOf('land') > -1}
                  handleChange={() => this.onUpdate('land')}
                >
                  {this.generateLink('land')}
                </StCheckbox>
              )}
              <StCheckbox
                checked={items.indexOf('townhouse') > -1}
                handleChange={() => this.onUpdate('townhouse')}
              >
                {this.generateLink('townhouse')}
              </StCheckbox>
              <StCheckbox
                checked={items.indexOf('flat') > -1}
                handleChange={() => this.onUpdate('flat')}
              >
                {this.generateLink('flat')}
              </StCheckbox>
              {dealType !== 'prodaja' && (
                <StCheckbox
                  checked={items.indexOf('office') > -1}
                  handleChange={() => this.onUpdate('office')}
                >
                  {this.generateLink('office')}
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
