import React, { Component } from 'react';

import UI from 'site/ui';
const {
  Select,
  Visibility,
} = UI;

import s from 'site/styles/ui/selectGroup';
import sSelect from 'site/styles/ui/select';

class SelectGroup extends Component {
  render() {
    const { selected = {}, options = [] } = this.props;

    const optionsReverse = [...options].reverse();

    const optionsDecrease = options.filter(item => (
      item.value >= (selected.min || 0)
    ));

    const optionsIncrease = options.filter(item => (
      item.value <= (selected.max || optionsReverse[0].value)
    ));

    const minValue = options[0].label || 0;
    const maxValue = optionsReverse[0].label || 0;

    return (
      <div className={s.selectContainer}>
        <Visibility lg="hidden">
          <select className={s.select} value={selected.min || options[0].value} onChange={e => this.props.onUpdate('min', e.target.value)}>
            {optionsIncrease.map(option => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>

          <span className={s.dash}> &mdash; </span>

          <select className={s.select} value={selected.max || optionsReverse[0].value} onChange={e => this.props.onUpdate('max', e.target.value)}>
            {optionsDecrease.map(option => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </Visibility>

        <Visibility xs="hidden" sm="hidden" md="hidden">
          <Select
            className={sSelect.filterSelect}
            value={selected.min}
            placeholder={`От ${minValue}`}
            options={optionsIncrease}
            onChange={value => this.props.onUpdate('min', value)}
            disableReset
          />
          <span className={s.dash}> &mdash; </span>
          <Select
            className={sSelect.filterSelect}
            value={selected.max}
            placeholder={`До ${maxValue}`}
            options={optionsDecrease}
            onChange={value => this.props.onUpdate('max', value)}
            disableReset
          />
        </Visibility>
      </div>
    );
  }
}

export default SelectGroup;
