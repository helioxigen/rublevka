import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import AutosizeInput from 'react-input-autosize';

import cn from 'classnames';

import update from 'react/lib/update';
import isEqual from 'lodash/isEqual';
import differenceBy from 'lodash/differenceBy';

const isValueExists = (value) => {
  return Array.isArray(value) ? !!value.length : !!value;
};

export default (s = {}, { Icon }) => (
  class extends Component {
    constructor(props) {
      super(props);
      this.onClickOutside = ::this.onClickOutside;
      this.state = { options: [] };
      props.asyncOptions(null, props.valueKey, null, ::this.asyncCallback, null, props.linkedTo);
    }

    componentDidMount() {
      if (this.props.value) {
        this.initLoad(this.props.value, this.props.linkedTo);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!isEqual(this.props.value, nextProps.value)) {
        // Load new labels if value changed
        this.initLoad(nextProps.value, nextProps.linkedTo);
      } else if (this.props.parent !== nextProps.parent) {
        this.props.asyncOptions(null, this.props.valueKey, null, ::this.asyncCallback, nextProps.value, nextProps.parent);
      } else if (!isEqual(this.props.linkedTo, nextProps.linkedTo)) {
        this.props.asyncOptions(null, this.props.valueKey, null, ::this.asyncCallback, nextProps.value, nextProps.linkedTo);
      } else if (!this.state.selectedOptions && !this.state.initLoading) {
        // Load initial labels
        this.initLoad(nextProps.value, nextProps.linkedTo);
      }
    }

    asyncInitCallback(selectedOptions) {
      const { valueKey = `value` } = this.props;
      const { options } = this.state;

      this.setState({ initLoading: false });
      this.setState({ options: differenceBy(options, selectedOptions, valueKey), selectedOptions, temporaryValue: undefined });
    }

    asyncCallback(options) {
      this.setState({ options, selected: undefined });
    }

    initLoad(value) {
      const { asyncOptions } = this.props;

      if (isValueExists(value)) {
        this.setState({ initLoading: true });
        asyncOptions(null, this.props.valueKey, value, ::this.asyncInitCallback);
      }
    }

    unfocus() {
      this.refs.input.refs.input.blur();
      this.setState({ focus: false, value: undefined, selected: undefined });
    }

    onClickOutside(event) {
      const root = findDOMNode(this.refs.select);

      if (!root.contains(event.target)) this.unfocus();
    }

    componentWillMount() {
      window.addEventListener(`click`, this.onClickOutside);
    }

    componentWillUnmount() {
      window.removeEventListener(`click`, this.onClickOutside);
    }

    handleFocus() {
      this.setState({ focus: true, value: undefined, selected: undefined });
      this.refs.input.focus();
    }

    select(value) {
      const { valueKey = `value` } = this.props;

      this.props.onChange(value ? value[valueKey] : undefined, value);
      this.props.asyncOptions(null, this.props.valueKey, null, ::this.asyncCallback, null, this.props.linkedTo);
      this.unfocus();
    }

    handleSearch(event) {
      this.setState({ value: event.target.value });
      const input = event.target.value;
      const { asyncOptions } = this.props;

      if (this.state.value !== input) asyncOptions(input, this.props.valueKey, null, ::this.asyncCallback, this.props.value, this.props.linkedTo || this.props.parent);
    }

    getLabel(value) {
      const { labelKey = `label`, valueKey = `value`, simple } = this.props;
      const defaultValue = simple ? value : ``;

      return this.state.options ? (this.state.options.find(option => option[valueKey] === value || value === option) || {})[labelKey] : defaultValue;
    }

    getSelectedLabel(value) {
      const { labelKey = `label`, valueKey = `value`, simple } = this.props;
      const defaultValue = simple ? value : ``;

      return this.state.selectedOptions ? (this.state.selectedOptions.find(option => option[valueKey] === value || value === option) || {})[labelKey] : defaultValue;
    }

    getValue(value) {
      const { valueKey = `value` } = this.props;

      return this.state.options ? (this.state.options.find(option => option[valueKey] === value || value === option) || { [valueKey]: value })[valueKey] : value;
    }

    addTag(tag) {
      const { value = [] } = this.props;
      if (!value.filter(item => this.getValue(item) === this.getValue(tag)).length && tag) {
        this.props.onChange([...value, this.getValue(tag)], tag);
        this.setState({ value: undefined, temporaryValue: [this.getLabel(tag)] });
      }
    }

    removeTag(index) {
      this.props.onChange(update(this.props.value, {
        $splice: [[index, 1]],
      }));
      this.props.asyncOptions(null, this.props.valueKey, null, ::this.asyncCallback, this.props.value);
    }

    selectUp() {
      const { selected, options } = this.state;
      const newSelected = selected > 0 ? selected - 1 : options.length - 1;

      this.switchSelected(newSelected);
    }

    selectDown() {
      const { selected, options } = this.state;
      const newSelected = selected < options.length - 1 ? selected + 1 : 0;

      this.switchSelected(newSelected);
    }

    switchSelected(selected) {
      const { labelKey = `label` } = this.props;
      const value = this.state.options[selected][labelKey];

      this.setState({ selected, value });
    }

    pickSelected() {
      const { selected } = this.state;
      const option = this.state.options[selected || 0];

      if (this.props.multi) this.addTag(option);
      if (!this.props.multi) this.select(option);
    }

    handleKeyDown(event) {
      if (!this.state.focus) return;
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
          if (this.props.multi && !this.state.value) {
            event.preventDefault();
            this.removeTag(this.props.value.length - 1);
          }
          break;
        case 27: // ESCAPE
          this.unfocus();
          break;
        default: return;
      }
    }

    render() {
      const { multi, value, allowCreate, disableReset, disabled = false, labelKey = `label` } = this.props;
      const { selected, focus, options, temporaryValue } = this.state;
      const label = focus ? this.state.value : undefined;
      const handleSelect = multi ? (option) => ::this.addTag(option) : ::this.select;

      const className = {
        [s[this.props.valueClassName]]: focus ? label : this.props.value,
      };

      return (
        <div className={cn(s.container, this.props.className, className)} ref="select" onKeyDown={::this.handleKeyDown}>
          <ul className={s.list}>
            {multi && value && value.length > 0 && value.map((item, index) =>
              this.getSelectedLabel(item) &&
              <li className={s.option} key={index}>
                {this.getSelectedLabel(item)}
                <span className={s.nowrap} onClick={() => ::this.removeTag(index)}>
                  <Icon className={cn(s.iconDelete, s.changeBottom)} icon="delete" />
                </span>
              </li>
            )}
            {multi && temporaryValue && temporaryValue.length > 0 && temporaryValue.map((item, index) => (
              <li className={s.option} key={index}>
                {item}
                <span className={s.nowrap}>
                  <Icon className={cn(s.iconDelete, s.changeBottom)} icon="delete" />
                </span>
              </li>
            ))}
            <li className={cn(s.option, { [s.resetPadding]: !focus })}>
              <AutosizeInput ref="input" placeholder={focus && !this.props.value ? this.props.placeholder : undefined} onFocus={::this.handleFocus} onChange={::this.handleSearch} value={label} className={cn(s.autosizeInput, s.hidden)} disabled={disabled} />
            </li>
          </ul>
          {!focus && !::this.getSelectedLabel(this.props.value) && (<span className={s.placeholder}>{this.props.placeholder}</span>)}
          {!focus && !!::this.getSelectedLabel(this.props.value) && (<span className={this.props.className}>{::this.getSelectedLabel(this.props.value)}</span>)}
          {!disabled &&
            <div className={s.control} onClick={::this.handleFocus} />
          }
          {!disabled && (
            <span>
              {!isValueExists(value) &&
                (this.state.focus
                  ? <Icon className={cn(s.iconChevron, s.up)} icon="arrow-down" />
                  : <Icon className={cn(s.iconChevron)} icon="arrow-down" />)}
              {isValueExists(value) &&
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
          )}
          {focus && options && !!options.length && (
            <ul className={s.listInner}>
              {options.map((option, index) => (
                <li className={cn(s.optionInner, { [s.selected]: index === selected })} key={index} type="button" onClick={() => handleSelect(option)}>
                  {!allowCreate && `${option[labelKey] || option}`}
                  {allowCreate && !isNaN(index) && (`Добавить: "${option[labelKey] || option}"?`)}
                </li>
              ))}
            </ul>
          )}
          {focus && !isValueExists(options) && (
            <ul className={s.listInner}>
              <li className={cn(s.optionInner, s.placeholder)}>
                {label ? `Ничего не найдено` : `Введите текст…`}
              </li>
            </ul>
          )}
        </div>
      );
    }
  }
);
