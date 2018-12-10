import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import AutosizeInput from 'react-input-autosize';

import cn from 'classnames';

import update from 'react/lib/update';
import isEqual from 'lodash/isEqual';

const valueExists = (value) => Array.isArray(value) ? !!value.length : !!value;

export default (s = {}, { Icon }) => (
  class extends Component {
    constructor(props) {
      super(props);
      const { options = [] } = props;
      this.onClickOutside = ::this.onClickOutside;
      this.handleFocus = ::this.handleFocus;

      this.state = { options };
    }

    handleFocus() {
      this.refs.input.focus();
      this.setState({ focus: true });
    }

    unfocus() {
      this.setState({ focus: false, value: undefined, selected: undefined });
    }

    onClickOutside(event) {
      const root = findDOMNode(this);

      if (!root.contains(event.target)) this.unfocus();
    }

    componentWillMount() {
      if (typeof window !== `undefined`) window.addEventListener(`click`, this.onClickOutside);
    }

    componentWillUnmount() {
      if (typeof window !== `undefined`) window.removeEventListener(`click`, this.onClickOutside);
    }

    componentWillReceiveProps(nextProps) {
      if (!isEqual(this.props.options, nextProps.options)) {
        this.setState({ options: nextProps.options });
      }
    }

    select(value) {
      const { valueKey = `value`, multi } = this.props;

      if (multi && !value) {
        this.props.onChange([]);
      } else {
        this.props.onChange(value ? value[valueKey] : value, value);
      }
      this.unfocus();
    }

    handleSearch(event) {
      const { value } = event.target;
      const { labelKey = `label`, multi, allowCreate } = this.props;

      const found = value ? this.state.options.filter(option => option[labelKey].toLowerCase().indexOf(value.toLowerCase()) > -1) : undefined;
      if (multi && allowCreate) {
        this.setState({ found: [value, ...found], value, selected: undefined });
      } else {
        this.setState({ found, value });
      }
    }

    getLabel(value) {
      const { labelKey = `label`, valueKey = `value` } = this.props;

      return this.state.options ? (this.state.options.find(option => option[valueKey] === value || value === option) || {})[labelKey] : undefined;
    }

    getValue(value) {
      const { valueKey = `value` } = this.props;

      return this.state.options ? (this.state.options.find(option => option[valueKey] === value || value === option) || { [valueKey]: value })[valueKey] : value;
    }

    addTag(tag) {
      const { value = [] } = this.props;
      if (!value.filter(item => this.getValue(item) === this.getValue(tag)).length && tag) {
        this.props.onChange([...value, this.getValue(tag)], tag);
        this.setState({ value: undefined });
      }
    }

    removeTag(index) {
      this.props.onChange(update(this.props.value, {
        $splice: [[index, 1]],
      }));
    }

    selectUp() {
      const { selected } = this.state;
      const options = this.state.found || this.state.options;
      const newSelected = selected > 0 ? selected - 1 : options.length - 1;

      if (options.length) {
        this.switchSelected(newSelected);
      }
    }

    selectDown() {
      const { selected } = this.state;
      const options = this.state.found || this.state.options;
      const newSelected = selected < options.length - 1 ? selected + 1 : 0;

      if (options.length) {
        this.switchSelected(newSelected);
      }
    }

    switchSelected(selected) {
      const { labelKey = `label` } = this.props;
      const options = this.state.found || this.state.options;
      const value = options[selected][labelKey];

      this.setState({ selected, value });
    }

    pickSelected() {
      const { selected } = this.state;
      const found = this.state.found || this.state.options;
      const option = found[selected || 0];

      if (this.props.multi) this.addTag(option);
      if (!this.props.multi) this.select(option);
    }

    handleKeyDown(event) {
      const { customKeyHandler, multi, value } = this.props;

      if (!this.state.focus) {
        if (customKeyHandler) customKeyHandler(event);
        return;
      }

      switch (event.keyCode) {
        case 13: // ENTER
          event.preventDefault();
          this.pickSelected();
          break;
        case 38: // UP
          event.preventDefault();
          this.selectUp();
          break;
        case 40: // DOWN
          event.preventDefault();
          this.selectDown();
          break;
        case 8: // BACKSPACE
          if (multi && !this.state.value) {
            event.preventDefault();
            this.removeTag(value.length - 1);
          }
          break;
        case 27: // ESCAPE
        case 9: // TAB
          this.unfocus();
          break;
        default: return;
      }
    }

    render() {
      const { multi, value, allowCreate, disableReset, disabled = false } = this.props;

      const { selected, focus, found } = this.state;

      const label = focus ? this.state.value : this.getLabel(value);
      const options = this.state.value && found ? found : this.state.options;
      const handleSelect = multi ? (option) => { ::this.unfocus(); ::this.addTag(option); } : ::this.select;

      const className = {
        [s[this.props.valueClassName]]: label || valueExists(value),
        [s.isFocused]: !!focus,
      };

      return (
        <div className={cn(s.container, this.props.className, className)} ref="select" onKeyDown={::this.handleKeyDown}>
          <ul className={s.list}>
            {multi && value && value.length > 0 && value.map((item, index) =>
              <li key={index} className={s.option}>
                {this.getLabel(item) || item}
                <span className={s.nowrap} onClick={() => ::this.removeTag(index)}><Icon className={cn(s.iconDelete, s.changeBottom)} icon="delete" /></span>
              </li>
            )}
            <li className={cn(s.option, { [s.resetPadding]: !focus })}>
              <AutosizeInput ref="input" onChange={::this.handleSearch} placeholder={(focus && !valueExists(value) && this.props.placeholder) || undefined} onFocus={::this.handleFocus} value={focus ? label : undefined} className={cn(s.autosizeInput, s.hidden)} disabled={disabled} />
            </li>
          </ul>
          {!focus && !valueExists(value) && !label && (<span className={s.placeholder}>{this.props.placeholder}</span>)}
          {!focus && !!label && <span className={this.props.labelClassName}>{label}</span>}
          {!disabled && <div className={s.control} onClick={::this.handleFocus} />}
          {!disabled &&
            <span>
              {!valueExists(value) &&
                (this.state.focus
                  ? <Icon className={cn(s.iconChevron, s.up)} icon="arrow-down" />
                  : <Icon className={cn(s.iconChevron)} icon="arrow-down" />)}
              {valueExists(value) &&
                (this.state.focus
                  ? <Icon className={cn(s.iconChevron, s.up)} icon="arrow-down" />
                  : <span>
                      {!disableReset && (
                        <span onClick={() => ::this.select(undefined)}>
                          <Icon className={cn(s.iconDelete, s.extraRight)} icon="delete" />
                        </span>
                      )}
                      <Icon className={cn(s.iconChevron)} icon="arrow-down" />
                    </span>
                )
              }
            </span>
          }
          {focus && options && !!options.length &&
            <ul className={s.listInner}>
              {options && !!options.length && options.map((option, index) =>
                <li className={cn(s.optionInner, index === selected && s.selected)} key={index} type="button" onClick={() => handleSelect(option)}>
                  {!allowCreate && `${this.getLabel(option) || option}`}
                  {allowCreate && (index === 0 || index !== 0) && `Добавить: "${this.getLabel(option) || option}"?`}
                </li>
              )}
            </ul>
          }
          {focus && !valueExists(options) &&
            <ul className={s.listInner}>
              <li className={cn(s.optionInner, s.placeholder)}>
                {label ? `Ничего не найдено` : `Введите текст…`}
              </li>
            </ul>
          }
        </div>
      );
    }
  }
);
