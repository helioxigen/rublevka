import React, { Component } from 'react';

import SelectGroup from './SelectGroup';
import { areas, landAreas } from './options';

import UI from 'ui';

import { Wrapper, SelectWrapper, Title, Unit } from './styled';

const {
  Grid: { Container, Row, Col },
} = UI;

class Square extends Component {
  onUpdate(ref, value, key) {
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
    const { area = {}, landArea = {} } = selected;

    return (
      <section>
        <Wrapper>
          <Title>Дом</Title>
          <Container fluid>
            <Row md="middle">
              <Col md="10">
                <SelectWrapper>
                  <SelectGroup
                    options={areas}
                    selected={area}
                    onUpdate={(key, value) => this.onUpdate(key, value, 'area')}
                  />
                  <Unit>м²</Unit>
                </SelectWrapper>
              </Col>
            </Row>
          </Container>
        </Wrapper>

        <Wrapper>
          <Title>Участок</Title>
          <Container fluid>
            <Row md="middle">
              <Col md="10">
                <SelectWrapper>
                  <SelectGroup
                    options={landAreas}
                    selected={landArea}
                    onUpdate={(key, value) =>
                      this.onUpdate(key, value, 'landArea')
                    }
                  />
                  <Unit>сот.</Unit>
                </SelectWrapper>
              </Col>
            </Row>
          </Container>
        </Wrapper>
      </section>
    );
  }
}

export default Square;
