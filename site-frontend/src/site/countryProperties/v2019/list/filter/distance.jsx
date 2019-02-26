import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import SelectGroup from 'core/components/v2019/ui/select/selectGroup';

import UI from 'site/ui/v2019';
const {
  Grid: { Container },
} = UI;

import s from 'site/styles/components/satellites/filter.css';
import sSlider from 'site/styles/ui/slider.css';
import sUtils from 'site/styles/utils';

import { ControlsContainer, Title, FilterHeader, IconReset } from './styled';

const styles = {
  ...s,
  ...sUtils,
  ...sSlider,
};

import { distances } from 'site/constants/leads/options';

const key = 'mkadDistance';

const cssOptions = {
  allowMultiple: true,
};

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
      <Container fluid styleName="contentContainer">
        <FilterHeader>
          <Title>Расстояние от МКАД</Title>
          {Object.keys(distance).length > 0 && <IconReset onClick={this.onReset} icon="times" />}
        </FilterHeader>
        <ControlsContainer>
          <SelectGroup
            options={distances}
            selected={distance}
            onUpdate={::this.onUpdate}
          />
        </ControlsContainer>
      </Container>
    );
  }
}

export default CSSModules(Distance, styles, cssOptions);
