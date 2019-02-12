import React, { Component } from 'react';
import dateformat from 'dateformat';

import DayPicker, { DateUtils } from 'react-day-picker';
import { daypickerLocale } from 'cem/localization';

import cn from 'classnames';
import UI from 'cem/components/ui';

import moment from 'moment';

const restricters = {
  past: DateUtils.isPastDay,
  future: day =>
    !DateUtils.isSameDay(day, new Date()) && !DateUtils.isPastDay(day),
};

const mapDayToKind = (kind, day) => {
  switch (kind) {
    case `from`:
      return moment(day)
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .format(`YYYY-MM-DDTHH:mm:ss.SSSZ`);
    case `to`:
      return moment(day)
        .hour(23)
        .minute(59)
        .second(59)
        .millisecond(999)
        .format(`YYYY-MM-DDTHH:mm:ss.SSSZ`);
    default:
      return day;
  }
};

export default (s = {}) =>
  class extends Component {
    constructor() {
      super();

      this.state = {
        active: false,
      };
      this.clickOutside = ::this.clickOutside;
    }

    componentDidUpdate(prevProps, prevStates) {
      if (prevStates.active === this.state.active) {
        return;
      }

      if (this.state.active) {
        document.addEventListener(`click`, this.clickOutside);
      } else {
        document.removeEventListener(`click`, this.clickOutside);
      }
    }

    toggle() {
      this.setState({ active: !this.state.active });
    }

    clickOutside(event) {
      if (
        this.state.active &&
        this.refs.daypicker &&
        !this.refs.daypicker.contains(event.target)
      ) {
        this.setState({
          active: !this.state.active,
        });
      }
    }

    handleDayClick(e, day, modifiers) {
      if (modifiers.indexOf(`disabled`) === -1) {
        this.props.onDayClick(mapDayToKind(this.props.kind, day));
        this.toggle();
      }
    }

    render() {
      const controlProps = this.props.control.props;
      const initialValue = controlProps.value;
      const value = initialValue ? dateformat(initialValue, `dd.mm.yyyy`) : ``;

      const modifiers = {
        selected: day => DateUtils.isSameDay(new Date(initialValue), day),
        disabled: this.props.restrict
          ? restricters[this.props.restrict]
          : () => false,
      };

      return (
        <div ref="daypicker" className={cn(s.daypicker, this.props.className)}>
          {React.cloneElement(this.props.control, { disabled: true, value })}
          {React.cloneElement(this.props.button, {
            onClick: !this.props.disabled ? ::this.toggle : () => {},
            type: `button`,
          })}
          {!!this.props.close}
          {!this.props.disableReset && !!value && (
            <span
              className={s.iconContainer}
              onClick={() => ::controlProps.onChange(``)}
            >
              <UI.Icon
                className={cn(s.iconDelete, this.props.iconDeleteClassName)}
                icon="delete"
              />
            </span>
          )}
          {this.state.active && (
            <DayPicker
              locale="ru"
              localeUtils={daypickerLocale}
              modifiers={modifiers}
              onDayClick={::this.handleDayClick}
            />
          )}
        </div>
      );
    }
  };
