import React, { Component } from 'react';

import SelectGroup from '../../../../core/components/v2019/ui/select/selectGroup';

import { ControlsContainer, Title, FilterHeader, IconReset } from './styled';

import { distances } from '../../../../constants/leads/options';

import UI from '../../../../ui/v2019';

const {
  Grid: { Container },
} = UI;

const key = 'mkadDistance';

class Distance extends Component {
  constructor(props) {
    super(props);

    this.onReset = this.onReset.bind(this);
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

  onReset() {
    this.props.updateFilter(key, {});
  }

  render() {
    const { selected = {} } = this.props;
    const distance = selected[key] || {};

    return (
      <section>
        <Container fluid>
          <FilterHeader>
            <Title>Расстояние от МКАД</Title>
            {Object.keys(distance).length > 0 && (
              <IconReset onClick={this.onReset} icon="times" />
            )}
          </FilterHeader>
          <ControlsContainer>
            <SelectGroup
              options={distances}
              selected={distance}
              onUpdate={::this.onUpdate}
            />
          </ControlsContainer>
        </Container>
      </section>
    );
  }
}

export default Distance;
