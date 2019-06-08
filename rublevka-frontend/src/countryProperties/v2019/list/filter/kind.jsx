import React, { Component } from 'react';

import { withRouter } from 'react-router';

import { kindsTranslit } from '../../../../constants/properties/dictionaries';

import {
  CheckboxWrapper,
  ControlsContainer,
  Title,
  FilterHeader,
  IconReset,
} from './styled';

import UI from '../../../../ui/v2019';
import Checkbox from './Checkbox';

const {
  Grid: { Container },
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
    const { dealType } = this.props;

    let { selected = [] } = this.props;

    if (selected.length === 0) {
      selected = this.options;
    }

    const nextFilterValue = selected.includes(value)
      ? selected.filter(v => v !== value)
      : selected.concat(value);

    let pushPath = '';

    if (nextFilterValue.length === 1) {
      pushPath = `/zagorodnaya/${dealType}/${
        kindsTranslit[nextFilterValue[0]]
      }`;
    }
    if (selected.length <= 1 && nextFilterValue.length !== 1) {
      pushPath = `/zagorodnaya/${dealType}`;
    }

    this.props.updateFilter(key, nextFilterValue, pushPath);
  };

  isChecked = name => {
    const { selected = [] } = this.props;

    return selected.includes(name) || selected.length === 0;
  };

  handleOnlyClick = name => e => {
    e.preventDefault();
    e.stopPropagation();

    const { dealType, updateFilter } = this.props;

    updateFilter(
      key,
      [name],
      `/zagorodnaya/${dealType}/${kindsTranslit[name]}`,
    );
  };

  render() {
    const { selected = [], dealType } = this.props;

    const isOnly = name => selected.length === 1 && selected[0] !== name;

    const isOnlyShown = name =>
      isOnly(name) || selected.length > 1 || selected.length === 0;

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
                showOnly={isOnlyShown('house')}
                onOnlyClick={this.handleOnlyClick}
              />

              <Checkbox
                checked={this.isChecked('townhouse')}
                name="townhouse"
                onChange={this.handleUpdate}
                label="Таунхаус"
                showOnly={isOnlyShown('townhouse')}
                onOnlyClick={this.handleOnlyClick}
              />

              {dealType !== 'arenda' && (
                <Checkbox
                  checked={this.isChecked('land')}
                  name="land"
                  onChange={this.handleUpdate}
                  label="Участок"
                  showOnly={isOnlyShown('land')}
                  onOnlyClick={this.handleOnlyClick}
                />
              )}

              <Checkbox
                checked={this.isChecked('flat')}
                name="flat"
                onChange={this.handleUpdate}
                label="Квартира"
                showOnly={isOnlyShown('flat')}
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
