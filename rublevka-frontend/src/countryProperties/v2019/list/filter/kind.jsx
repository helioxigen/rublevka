import React, { Component } from 'react';

import { withRouter } from 'react-router';

import { kindsTranslit } from '../../../../constants/properties/dictionaries';

import {
  CheckboxWrapper,
  ControlsContainer,
  Title,
  FilterHeader,
  IconReset,
  CheckboxLabel,
} from './styled';

import UI from '../../../../ui/v2019';
import Checkbox from './Checkbox';

const {
  Grid: { Container },
  RadioButton,
} = UI;

const key = 'kind';

class Kind extends Component {
  options = ['house', 'townhouse', 'land', 'flat'];

  resetFilter = () => {
    const { dealType, router, updateFilter } = this.props;

    router.push(`/zagorodnaya/${dealType}`);

    updateFilter(key, []);
  };

  handleUpdate = value => {
    const { dealType, router } = this.props;

    let { selected = [] } = this.props;

    if (selected.length === 0) {
      selected = this.options;
    }

    const nextFilterValue = selected.includes(value)
      ? selected.filter(v => v !== value)
      : selected.concat(value);

    this.props.updateFilter(key, nextFilterValue);

    if (nextFilterValue.length === 1) {
      nextFilterValue.forEach(value =>
        router.push(`/zagorodnaya/${dealType}/${kindsTranslit[value]}`),
      );
    }

    if (selected.length <= 1 && nextFilterValue.length !== 1) {
      router.push(`/zagorodnaya/${dealType}`);
    }
  };

  isChecked = name => {
    const { selected = [] } = this.props;

    return selected.includes(name) || selected.length === 0;
  };

  handleOnlyClick = name => e => {
    e.preventDefault();
    e.stopPropagation();

    const { router, dealType, updateFilter } = this.props;

    updateFilter(key, [name]);

    router.push(`/zagorodnaya/${dealType}/${kindsTranslit[name]}`);
  };

  render() {
    const { selected = [], dealType } = this.props;

    const isOnlyShown = selected.length > 1 || selected.length === 0;

    return (
      <section>
        <Container fluid>
          <FilterHeader>
            <Title>Тип объекта</Title>
            {selected.length > 0 && (
              <IconReset onClick={this.resetFilter} icon="times" />
            )}
          </FilterHeader>
          <ControlsContainer>
            <CheckboxWrapper>
              <Checkbox
                checked={selected.length === 0}
                label="Все"
                name="all"
                onChange={this.resetFilter}
              />
              <Checkbox
                checked={this.isChecked('house')}
                label="Дом"
                name="house"
                onChange={this.handleUpdate}
                showOnly={isOnlyShown}
                onOnlyClick={this.handleOnlyClick}
              />

              <Checkbox
                checked={this.isChecked('townhouse')}
                name="townhouse"
                onChange={this.handleUpdate}
                label="Таунхаус"
                showOnly={isOnlyShown}
                onOnlyClick={this.handleOnlyClick}
              />

              {dealType !== 'arenda' && (
                <Checkbox
                  checked={this.isChecked('land')}
                  name="land"
                  onChange={this.handleUpdate}
                  label="Участок"
                  showOnly={isOnlyShown}
                  onOnlyClick={this.handleOnlyClick}
                />
              )}

              <Checkbox
                checked={this.isChecked('flat')}
                name="flat"
                onChange={this.handleUpdate}
                label="Квартира"
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

export default withRouter(Kind);
