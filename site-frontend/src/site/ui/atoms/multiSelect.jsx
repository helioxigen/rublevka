import React, { Component } from 'react';

import cn from 'classnames';

export default () => (
  class KindSelect extends Component {
    static defaultProps = {
      value: [],
    }

    handleOptionClick(clickedOption) {
      const { value, onChange } = this.props;

      const isClickedOptionSelected = value.indexOf(clickedOption) > -1;

      onChange(isClickedOptionSelected ? value.filter(kind => kind !== clickedOption) : [...value, clickedOption]);
    }

    render() {
      const { value, options, listClassName, itemClassName, activeItemClassName } = this.props;

      return (
        <ul className={listClassName}>
          {options.map((item, index) =>
            <li key={index} className={cn(itemClassName, value.indexOf(item.value) > -1 && activeItemClassName)} onClick={() => this.handleOptionClick(item.value)}>
              {item.label}
            </li>
          )}
        </ul>
      );
    }
  }
);
