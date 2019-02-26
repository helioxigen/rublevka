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

const key = 'kind';

class Kind extends Component {

  constructor(props) {
    super(props);

    this.onReset = this.onReset.bind(this);
  }

  onUpdate(value) {
    this.props.updateFilter(key, [value]);
  }

  onReset() {
    this.props.updateFilter(key, []);
  }

  render() {
    const { selected = {}, dealType } = this.props;
    const items = selected[key] || [];
    return (
      <ControlsContainer>
        <Container fluid styleName="contentContainer">
          <FilterHeader>
            <Title>Тип объекта</Title>
            {items.length > 0 && <IconReset onClick={this.onReset} icon="times" /> }
          </FilterHeader>
          <CheckboxWrapper>
            <RadioButton
              checked={items.includes('house')}
              name="house"
              handleChange={() => this.onUpdate('house')}
              text="Дом"
            />

            <RadioButton
              checked={items.includes('townhouse')}
              name="townhouse"
              handleChange={() => this.onUpdate('townhouse')}
              text="Таунхаус"
            />

            {dealType !== 'arenda' && (
            <RadioButton
              checked={items.includes('land')}
              name="land"
              handleChange={() => this.onUpdate('land')}
              text="Участок"
            />
          )}
            <RadioButton
              checked={items.includes('flat')}
              name="flat"
              handleChange={() => this.onUpdate('flat')}
              text="Квартира"
            />
          </CheckboxWrapper>
        </Container>
      </ControlsContainer>
    );
  }
}

export default CSSModules(Kind, styles, cssOptions);
