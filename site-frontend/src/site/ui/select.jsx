import React, { PropTypes, Component } from 'react';
import ReactSelect from 'react-select';

class Select extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  };

  handleChange(value, selected) {
    const { reference, valueKey = `value` } = this.props;
    if (this.props.handleChange) {
      this.props.handleChange(reference, selected);
    } else {
      this.props.onChange(selected[0] && selected[0][valueKey] || undefined);
    }
  }

  render() {
    return (
      <ReactSelect {...this.props} onChange={::this.handleChange} onBlur={() => {}} onFocus={() => {}} />
    );
  }
}

export default Select;
