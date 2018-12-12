import React, { Component } from 'react';

export default () => (
  class extends Component {
    constructor() {
      super();

      this.state = {
        item: {},
      };
    }

    componentWillReceiveProps(nextProps) {
      const { valueKey = `id` } = this.props;
      const value = this.props.value;
      const nextValue = nextProps.value;

      if (value !== nextValue && nextValue) {
        this.props.fetch(null, valueKey, nextValue, ::this.setLabel);
      }
    }

    componentWillMount() {
      const { valueKey = `id` } = this.props;
      if (this.props.value) this.props.fetch(null, valueKey, this.props.value, ::this.setLabel);
    }

    setLabel([item]) {
      this.setState({ item });
    }

    render() {
      const { labelKey = `title` } = this.props;

      return <span className={this.props.className}>{this.state.item[labelKey] || `—`}</span>;
    }
  }
);
