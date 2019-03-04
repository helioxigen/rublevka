/* eslint-disable camelcase */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import UI from 'site/ui/v2019';
const {
  Checkbox,
  Grid: { Container },
} = UI;

import s from 'site/styles/components/v2019/satellites/filter.css';
import sUtils from 'site/styles/utils';
import st from 'site/styles/themes2019';

import { CheckboxWrapper, ControlsContainer, CheckboxLabel, Title, FilterHeader, IconReset } from './styled';

const styles = {
  ...s,
  ...sUtils,
};

const cssOptions = {
  allowMultiple: true,
};

const key = 'renovate';

class Renovate extends Component {
  constructor(props) {
    super(props);

    this.onReset = this.onReset.bind(this);
  }

  onUpdate(value) {
    const { selected = {} } = this.props;
    const items = selected[key] || [];
    const index = items.indexOf(value);

    // TODO fix this (move to helpers?)
    if (index === -1) {
      this.props.updateFilter(key, [...items, value]);
    } else {
      this.props.updateFilter(key, items.filter((el, i) => i !== index));
    }
  }

  onReset() {
    this.props.updateFilter(key, []);
  }

  render() {
    const { selected = {} } = this.props;
    const { kind = [] } = selected;
    const items = selected[key] || [];

    if (!kind.includes('land')) {
      return (
        <div>
          <ControlsContainer>
            <Container fluid styleName="contentContainer">
              <FilterHeader>
                <Title>Ремонт</Title>
                {items.length > 0 && <IconReset onClick={this.onReset} icon="times" />}
              </FilterHeader>
              <CheckboxWrapper>
                <Checkbox
                  checked={items.includes('full_construction')}
                  referece="full_construction"
                  handleChange={() => this.onUpdate('full_construction')}
                >
                  <CheckboxLabel>Под ключ</CheckboxLabel>
                </Checkbox>
                <Checkbox
                  checked={items.includes('partly_turnkey')}
                  referece="partly_turnkey"
                  handleChange={() => this.onUpdate('partly_turnkey')}
                >
                  <CheckboxLabel>Частично под ключ</CheckboxLabel>
                </Checkbox>
                <Checkbox
                  checked={items.includes('rough_finish')}
                  referece="rough_finish"
                  handleChange={() => this.onUpdate('rough_finish')}
                >
                  <CheckboxLabel>Черновая отделка</CheckboxLabel>
                </Checkbox>
              </CheckboxWrapper>
            </Container>
          </ControlsContainer>
        </div>
      );
    }

    return <div />;
  }
}

export default CSSModules(Renovate, styles, cssOptions);
