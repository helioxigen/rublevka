import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import s from 'site/styles/components/satellites/filter.css';
import sUtils from 'site/styles/utils.css';
import { CheckboxWrapper, ControlsContainer, Title, FilterHeader, IconReset } from './styled';

import UI from 'site/ui/v2019';

const {
  Grid: { Container },
  RadioButton,
} = UI;

const styles = {
  ...s,
  ...sUtils,
};

const cssOptions = {
  allowMultiple: true,
};

const key = 'bedrooms';

class Kind extends Component {

  constructor(props) {
    super(props);

    this.onReset = this.onReset.bind(this);
  }

  onUpdate(value) {
    this.props.updateFilter(key, { min: value, max: null });
  }

  onReset() {
    this.props.updateFilter(key, []);
  }

  render() {
    const { selected = {} } = this.props;
    const item = selected[key] || [];

    return (
      <ControlsContainer>
        <Container fluid styleName="contentContainer">
          <FilterHeader>
            <Title>СПАЛЕН</Title>
          </FilterHeader>
          <CheckboxWrapper>
            <RadioButton
              checked={item.min === 2}
              name="2"
              handleChange={() => this.onUpdate(2)}
              text="От 2"
            />

            <RadioButton
              checked={item.min === 3}
              name="3"
              handleChange={() => this.onUpdate(3)}
              text="От 3"
            />

            <RadioButton
              checked={item.min === 4}
              name="4"
              handleChange={() => this.onUpdate(4)}
              text="От 4"
            />

            <RadioButton
              checked={item.min === 5}
              name="5"
              handleChange={() => this.onUpdate(5)}
              text="От 5+"
            />
          </CheckboxWrapper>
        </Container>
      </ControlsContainer>
    );
  }
}

export default CSSModules(Kind, styles, cssOptions);
