import React, { Component } from 'react';
import cn from 'classnames';

import UI from 'site/ui';
const { Dropdown } = UI;

import sDropdown from 'site/styles/ui/dropdown';
import s from 'site/styles/ui/priceSelect';
import st from 'site/styles/themes';

import * as options from 'site/constants/leads/options';

export default class extends Component {
  constructor(props) {
    super(props);
    const { min = 0, max = 0 } = props.value || {};

    this.state = { min, max };
  }

  componentWillReceiveProps(nextProps) {
    const { min = 0, max = 0 } = nextProps.value || {};

    const isOfferKindChanged = nextProps.dealType !== this.props.dealType;
    const isValueChanged =
      nextProps.value &&
      this.props.value &&
      nextProps.value.min === this.props.value.min &&
      nextProps.value.max === this.props.value.max;

    if (isOfferKindChanged || isValueChanged) {
      if (nextProps.dealType === `sale`) {
        this.setState({ min: 0, max: 30.02 });
      } else {
        this.setState({ min: 0, max: 100.02 });
      }
    } else {
      this.setState({ min, max });
    }
  }

  handleChange({ min = this.state.min, max = this.state.max }) {
    if (this.props.onChange) this.props.onChange({ min, max });
  }

  changeFromButton(value) {
    const { focus } = this.state;

    this.handleChange({ [focus]: value });
    if (focus === `min`) this.refs.max.focus();
    if (focus === `max`) this.refs.dropdown.toggle(false);
  }

  changeFocus(fieldName) {
    this.setState({ focus: fieldName });
    this.refs.list.scrollTop = 0;
  }

  handleDropdownOpen() {
    this.refs.min.focus();
  }

  filterPrice(option) {
    const currentPriceExlude = this.state[this.state.focus] || 0;

    const isMoreThanMin = option.value > this.state.min;
    const isNotCurrent = option.value !== currentPriceExlude;

    if (this.state.focus === `max`) {
      return isNotCurrent && isMoreThanMin;
    } else {
      return isNotCurrent && option.value !== 30.02 && option.value !== 100.02;
    }
  }

  render() {
    const { dealType } = this.props;
    const { min, max, focus } = this.state;
    const priceOptions = options.prices[dealType].filter(::this.filterPrice);

    const minPlaceholder = `$${min}`;
    const maxPlaceholder =
      dealType === `sale`
        ? `$${max === 30.02 ? `30+` : max} млн`
        : `$${max === 100.02 ? `100+` : max} тыс`;
    const placeholder =
      min || max ? (
        <span>
          {minPlaceholder}&nbsp;&nbsp;—&nbsp;&nbsp;{maxPlaceholder}
        </span>
      ) : (
        `Стоимость`
      );

    const minValue = min === 30.02 || min === 100.02 ? 0 : min;
    const maxValue =
      max === 30.02 || max === 100.02
        ? `${dealType === `sale` ? `30+` : `100+`}`
        : max;

    const optionClassName = cn({
      [s.alignLeft]: focus === `min`,
      [s.alignRight]: focus === `max`,
    });

    return (
      <Dropdown
        ref="dropdown"
        className={cn(sDropdown.priceDropdown, st.dropdown.priceDropdown)}
        onOpen={::this.handleDropdownOpen}
        placeholder={placeholder}
        value={min || max}
        filterIcon="arrow-down"
        isFilterIconAlwaysShown
      >
        <span className={s.inputContainer}>
          <input
            className={s.input}
            ref="min"
            onChange={event => ::this.handleChange({ min: event.target.value })}
            value={minValue || undefined}
            onFocus={() => ::this.changeFocus(`min`)}
            placeholder="От"
          />
        </span>
        <input
          className={s.input}
          ref="max"
          onChange={event => ::this.handleChange({ max: event.target.value })}
          value={maxValue || undefined}
          onFocus={() => ::this.changeFocus(`max`)}
          placeholder="До"
        />
        <ul className={s.list} ref="list">
          {priceOptions.map((option, index) => (
            <li
              className={cn(s.item, optionClassName)}
              key={index}
              onClick={() => this.changeFromButton(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </Dropdown>
    );
  }
}
