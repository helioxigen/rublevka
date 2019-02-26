import React, { Component } from 'react';

import { formatPriceWithGrouping } from 'core/helpers';

export default (styles = {}, { Form }) =>
  class PriceInput extends Component {
    handleChange(event) {
      this.props.onChange(this.transformValue(event.target.value));
    }

    handleBlur(event) {
      this.props.onBlur(this.transformValue(event.target.value));
    }

    transformValue(value) {
      const valueWithoutSpaces = value.replace(/\s/g, ``);

      return !isNaN(Number(valueWithoutSpaces))
        ? Number(valueWithoutSpaces)
        : value;
    }

    render() {
      return (
        <Form.Input
          {...this.props}
          value={formatPriceWithGrouping(this.props.value)}
          onChange={::this.handleChange}
          onBlur={::this.handleBlur}
        />
      );
    }
  };
