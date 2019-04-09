import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import SelectGroup from 'core/components/v2019/ui/select/selectGroup';

import UI from 'ui/v2019';
const {
  Grid: { Container },
} = UI;

import s from 'styles/components/satellites/filter.css';
import sSlider from 'styles/ui/slider.css';
import sUtils from 'styles/utils.css';

import { Title, ControlsContainer, FilterHeader, IconReset } from './styled';

const styles = {
  ...s,
  ...sUtils,
  ...sSlider,
};

import { areas, landAreas } from 'constants/leads/options';

const cssOptions = {
  allowMultiple: true,
};

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

  onReset(key) {
    this.props.updateFilter(key, {});
  }

  render() {
    const { selected = {} } = this.props;
    const { area = {}, landArea = {}, kind = [] } = selected;

    return (
      <section>
        {!(kind.includes('land') && kind.length === 1) && (
          <Container fluid styleName="contentContainer">
            <FilterHeader>
              <Title>
                Площадь&nbsp;
                {kind.length === 0 ||
                kind.includes('house') ||
                kind.includes('townhouse')
                  ? 'дома'
                  : 'квартиры'}
                &nbsp;(м²)
              </Title>
              {Object.keys(area).length > 0 && (
                <IconReset onClick={() => this.onReset('area')} icon="times" />
              )}
            </FilterHeader>
            <ControlsContainer>
              <SelectGroup
                options={areas}
                selected={area}
                onUpdate={(key, value) => this.onUpdate(key, value, 'area')}
              />
            </ControlsContainer>
          </Container>
        )}
        {!kind.includes('flat') && (
          <Container fluid styleName="contentContainer">
            <FilterHeader>
              <Title>Площадь участка (сот.)</Title>
              {Object.keys(landArea).length > 0 && (
                <IconReset
                  onClick={() => this.onReset('landArea')}
                  icon="times"
                />
              )}
            </FilterHeader>
            <ControlsContainer>
              <SelectGroup
                options={landAreas}
                selected={landArea}
                onUpdate={(key, value) => this.onUpdate(key, value, 'landArea')}
              />
            </ControlsContainer>
          </Container>
        )}
      </section>
    );
  }
}

export default CSSModules(Square, styles, cssOptions);
