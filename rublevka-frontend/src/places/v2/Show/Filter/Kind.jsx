import React, { Component } from 'react';

import { Link } from 'react-router';

import UI from 'ui';

import styled from 'styled-components';
import media from 'styles/media';
import { kinds } from 'constants/places';
import { kindsTranslit } from 'constants/properties/dictionaries';

const {
  Grid: { Container, Row, Col },
  Checkbox,
} = UI;

const FilterWrapperKind = styled.div`
  padding-bottom: 0.2rem;

  ${media.sm`
    padding-bottom: 0;
    padding: 1.6rem 2rem 1.2rem;
  `};
`;

const StCheckbox = styled(Checkbox)`
  margin-bottom: 1.3rem;
  & input {
    background: #f1f1f1;
    border: none;
    margin-right: 0.5rem;
    width: 2rem;
    height: 2rem;
    vertical-align: bottom;
  }
  & label {
    color: ${p => p.theme.doveGray};
    font-size: 1.6rem;
  }

  ${media.sm`
    margin-bottom: 1.2rem;
  `};
`;

const StLink = styled(Link)`
  color: #636363;
  &:active,
  &:focus {
    color: #636363;
  }
`;

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
            </Col>
          </Row>
        </Container>
      </FilterWrapperKind>
    );
  }
}

export default Kind;
