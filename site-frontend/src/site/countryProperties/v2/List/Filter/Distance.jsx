import React, { Component } from 'react';

import SelectGroup from './SelectGroup';
import { distances } from './options';

import UI from 'site/ui';

import { Wrapper, SelectWrapper, Unit } from './styled';

const { Grid: { Container, Row, Col } } = UI;

const key = 'mkadDistance';

class Distance extends Component {
  constructor() {
    super();
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(ref, value) {
    const { selected = {} } = this.props;
    const distance = selected[key] || {};
    const stateRef = ref === 'min' ? 'max' : 'min';

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
      <Wrapper>
        <Container fluid>
          <Row md="middle">
            <Col md="10">
              <SelectWrapper>
                <SelectGroup options={distances} selected={distance} onUpdate={this.onUpdate} />
                <Unit>км</Unit>
              </SelectWrapper>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default Distance;
