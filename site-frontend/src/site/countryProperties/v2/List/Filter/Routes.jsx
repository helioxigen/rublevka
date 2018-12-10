import React, { Component } from 'react';
import global from 'window-or-global';

import UI from 'site/ui';

import { FilterWrapper, StCheckbox } from './styled';

const { Grid: { Container, Row, Col } } = UI;

const key = 'routeIds';

class Route extends Component {
  onUpdate(id) {
    const { selected = {} } = this.props;
    const items = selected[key] || [];
    const index = items.indexOf(id);

    // TODO fix this (move to helpers?)
    if (index === -1) {
      this.props.updateFilter(key, [...items, id]);
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
              {global.config.routes.map((route) => {
                const { id, name } = route;
                const index = items.indexOf(id);
                const isActive = index > -1;
                return (
                  <StCheckbox key={id} checked={isActive} handleChange={() => this.onUpdate(id)}>
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
