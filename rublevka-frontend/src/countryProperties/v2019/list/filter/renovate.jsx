import React, { Component } from 'react';

import UI from '../../../../ui/v2019';

import {
  CheckboxWrapper,
  ControlsContainer,
  Title,
  FilterHeader,
  IconReset,
} from './styled';
import Checkbox from './Checkbox';

const {
  Grid: { Container },
} = UI;

const key = 'renovate';

class Renovate extends Component {
  handleUpdate = value => {
    const { selected = [] } = this.props;

    const nextFilterValue = selected.includes(value)
      ? selected.filter(v => v !== value)
      : selected.concat(value);

    this.props.updateFilter(key, nextFilterValue);
  };

  handleReset = () => {
    this.props.updateFilter(key, []);
  };

  handleOnlyClick = name => e => {
    e.preventDefault();
    e.stopPropagation();

    const { updateFilter } = this.props;

    updateFilter(key, [name]);
  };

  isChecked = name => {
    const { selected = [] } = this.props;

    return selected.includes(name) || selected.length === 0;
  };

  render() {
    const { selected = [] } = this.props;

    const isOnlyShown = selected.length > 1 || selected.length === 0;

    return (
      <section>
        <Container fluid styleName="contentContainer">
          <FilterHeader>
            <Title>Ремонт</Title>
            {selected.length > 0 && (
              <IconReset onClick={this.handleReset} icon="times" />
            )}
          </FilterHeader>
          <ControlsContainer>
            <CheckboxWrapper>
              <Checkbox
                checked={selected.length === 0}
                label="Любой"
                name="any"
                onChange={this.handleReset}
              />
              <Checkbox
                checked={this.isChecked('full_construction')}
                label="Под ключ"
                name="full_construction"
                onChange={this.handleUpdate}
                showOnly={isOnlyShown}
                onOnlyClick={this.handleOnlyClick}
              />
              <Checkbox
                checked={this.isChecked('partly_turnkey')}
                label="Частично под ключ"
                name="partly_turnkey"
                onChange={this.handleUpdate}
                showOnly={isOnlyShown}
                onOnlyClick={this.handleOnlyClick}
              />
              <Checkbox
                checked={this.isChecked('rough_finish')}
                label="Черновая отделка"
                name="rough_finish"
                onChange={this.handleUpdate}
                showOnly={isOnlyShown}
                onOnlyClick={this.handleOnlyClick}
              />
            </CheckboxWrapper>
          </ControlsContainer>
        </Container>
      </section>
    );
  }
}

export default Renovate;
