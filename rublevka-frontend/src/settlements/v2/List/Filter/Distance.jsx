import React, { Component } from 'react';

import SelectGroup from './SelectGroup';
import { distances } from 'constants/leads/options';

import UI from 'ui';

import styled from 'styled-components';
import media from 'styles/media';

const {
  Grid: { Container, Row, Col },
} = UI;

const Wrapper = styled.div`
  padding-right: 0;
  padding-left: 0;
`;

const SelectWrapper = styled.div`
  white-space: nowrap;
  padding: 0;
  margin: 1.5rem 0 1.6rem 0.5rem;

  ${media.xs`
    margin: 1.5rem 0 1.5rem 0.5rem;
  `};
`;

export const Unit = styled.div`
  position: relative;
  display: inline-table;
  font-size: 1.6rem;
  margin: 0.6rem 0 0 1rem;
  height: 3.5rem;
  vertical-align: text-top;

  ${media.md`
    margin: 1rem 0 0 1.5rem;
  `};
`;

const keyDistance = 'mkadDistance';

class Distance extends Component {
  constructor() {
    super();
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(ref, value) {
    const { mkadDistance = {} } = this.props.selected || {};
    const stateRef = ref === 'min' ? 'max' : 'min';

    const options = {
      [stateRef]: mkadDistance[stateRef],
      [ref]: value,
    };

    this.props.updateFilter(keyDistance, options);
  }

  render() {
    const { selected = {} } = this.props;
    const { mkadDistance = {} } = selected;

    return (
      <Wrapper>
        <Container fluid>
          <Row md="middle">
            <Col md="10">
              <SelectWrapper>
                <SelectGroup
                  options={distances}
                  selected={mkadDistance}
                  onUpdate={this.onUpdate}
                />
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
