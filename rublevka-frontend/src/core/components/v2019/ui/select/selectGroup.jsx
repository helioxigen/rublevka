import React, { Component } from 'react';
import styled from 'styled-components';

import UI from 'ui/v2019';
const { Select, Visibility } = UI;

import s from 'styles/ui/v2019/selectGroup';
import sSelect from 'styles/ui/v2019/select';

class SelectGroup extends Component {
  render() {
    const { selected = {}, options = [] } = this.props;

    const optionsReverse = [...options].reverse();

    const optionsDecrease = options.filter(
      item => item.value >= (selected.min || 0),
    );

    const optionsIncrease = options.filter(
      item => item.value <= (selected.max || optionsReverse[0].value),
    );

    return (
      <div className={s.selectContainer}>
        <Visibility lg="hidden">
          <select
            className={s.select}
            value={selected.min || 'placeholder'}
            onChange={e => this.props.onUpdate('min', e.target.value)}
          >
            <option value="placeholder" disabled>
              от
            </option>
            {optionsIncrease.map(option => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>

          <span className={s.dash}>-</span>

          <select
            className={s.select}
            value={selected.max || 'placeholder'}
            onChange={e => this.props.onUpdate('max', e.target.value)}
          >
            <option value="placeholder" disabled>
              до
            </option>
            {optionsDecrease.map(option => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </Visibility>

        <Visibility
          xs="hidden"
          sm="hidden"
          md="hidden"
          className={s.visibility}
        >
          <div className={s.flexWrapper}>
            <div className={s.flexItem}>
              <Select
                className={sSelect.filterSelect}
                value={selected.min}
                placeholder={'от'}
                options={optionsIncrease}
                onChange={value => this.props.onUpdate('min', value)}
                disableReset
              />
            </div>
            <span className={s.dash}>-</span>
            <div className={s.flexItem}>
              <Select
                className={sSelect.filterSelect}
                value={selected.max}
                placeholder={'до'}
                options={optionsDecrease}
                onChange={value => this.props.onUpdate('max', value)}
                disableReset
              />
            </div>
          </div>
        </Visibility>
      </div>
    );
  }
}

export default SelectGroup;
