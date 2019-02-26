import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';

import cn from 'classnames';

export default (styles = {}, { Checkbox }) => {
  return class extends Component {
    static propTypes = {
      reference: PropTypes.string.isRequired,
      handleChange: PropTypes.func.isRequired,
      selected: PropTypes.array,
    };

    handleChange(key, val) {
      const ref = this.props.reference;
      const { selected = [] } = this.props;

      if (val) {
        this.props.handleChange(ref, [...selected, key]);
      } else {
        const index = selected.indexOf(key);
        if (index !== -1) {
          this.props.handleChange(
            ref,
            update(selected, {
              $splice: [[index, 1]],
            }),
          );
        }
      }
    }

    render() {
      const { items, children, selected = [] } = this.props;

      const displayBlock = {
        [styles.block]: !!this.props.block,
      };

      return (
        <div className={cn(styles.formGroup, this.props.className)}>
          {!!children && (
            <label className={cn(styles.heading, this.props.labelClassName)}>
              {children}
            </label>
          )}
          {items.map(item => (
            <div
              className={cn(styles.container, displayBlock)}
              key={item.value}
            >
              <Checkbox
                className={this.props.checkboxClassName}
                controlClassName={this.props.controlClassName}
                handleChange={::this.handleChange}
                reference={item.value}
                checked={selected.indexOf(item.value) !== -1}
              >
                {item.label}
              </Checkbox>
            </div>
          ))}
        </div>
      );
    }
  };
};
