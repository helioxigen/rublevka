import React, { Component } from 'react';

export default () => (
  class extends Component {
    isChecked() {
      const { option, value = [] } = this.props;
      return (value.indexOf(option) > -1);
    }

    toggle() {
      const { option } = this.props;
      const value = [...(this.props.value || [])];
      if (this.isChecked()) {
        value.splice(value.indexOf(option), 1);
        if (this.props.onRemove) this.props.onRemove(option);
      } else {
        value.push(option);
        if (this.props.onAdd) this.props.onAdd(option);
      }
      if (this.props.onChange) this.props.onChange(value);
      if (this.props.onBlur) this.props.onBlur(value);
    }

    render() {
      return React.cloneElement(this.props.checkbox, { checked: ::this.isChecked(), onChange: () => this.toggle() });
    }
  }
);
