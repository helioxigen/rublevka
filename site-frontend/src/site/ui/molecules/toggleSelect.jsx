import React, { Component } from 'react';

import cn from 'classnames';

export default (s = {}, { Button }) =>
  class ToggleSelect extends Component {
    handleOptionClick(clickedOption) {
      const { value, onChange } = this.props;

      const isOptionSelected = value === clickedOption;

      if (!isOptionSelected) {
        onChange(clickedOption);
      }
    }

    render() {
      const {
        value,
        options,
        listClassName,
        itemClassName,
        activeItemClassName,
      } = this.props;

      return (
        <div className={listClassName}>
          {options.map((item, index) => (
            <Button
              key={index}
              className={cn(
                itemClassName,
                value === item.value && activeItemClassName,
              )}
              onClick={() => this.handleOptionClick(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      );
    }
  };
