import React, { Component } from 'react';
import global from 'window-or-global';

import UI from 'site/ui';

import styled from 'styled-components';
import media from 'site/styles/media';

const {
  Grid: { Container, Row, Col },
  Checkbox,
} = UI;

const FilterWrapper = styled.div`
  padding: 1.6rem 2rem 1.2rem;
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

const keyRoute = 'routeId';

class Route extends Component {
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

  render() {
    const { selected = {} } = this.props;
    const values = selected[keyRoute] || [];

    return (
      <FilterWrapper>
        <Container fluid>
          <Row md="middle">
            <Col>
              {global.config.routes.map(route => {
                const { id, name } = route;
                const index = values.indexOf(id);
                const isActive = index > -1;
                return (
                  <StCheckbox
                    key={id}
                    checked={isActive}
                    handleChange={() => this.onUpdate(id)}
                  >
                    {name}
                  </StCheckbox>
                );
              })}
            </Col>
          </Row>
        </Container>
      </FilterWrapper>
    );
  }
}

export default Route;
