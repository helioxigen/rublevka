import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

export default (s = {}) => {
  return class extends Component {
    static propTypes = {
      reference: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
      handleChange: PropTypes.func.isRequired,
      checked: PropTypes.bool,
    };

    constructor(props) {
      super(props);
    }

    handleChange() {
      const { reference, checked } = this.props;
      this.props.handleChange(reference, !checked);
    }

    render() {
      return (
        <div className={cn(s.checkbox, { [s.active]: this.props.checked }, this.props.className)}>
          {JSON.stringify(this.props.value)}
          <label className={cn(s.label, this.props.labelClassName)}>
            <input className={cn(s.control, this.props.controlClassName)} type="checkbox" ref={this.props.reference} onChange={::this.handleChange} checked={this.props.checked} /> &nbsp;
            {this.props.children}
          </label>
        </div>
      );
    }
  };
};
