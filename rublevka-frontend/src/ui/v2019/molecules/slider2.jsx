import React, { Component } from 'react';
import ReactSlider from 'react-slider';

import cn from 'classnames';

import isEqual from 'lodash/isEqual';
import recursiveCleanUp from 'core/helpers/recursiveCleanUp';

export default (s = {}) => {
  return class extends Component {
    componentWillMount() {
      this.load(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.reference !== nextProps.reference) {
        this.load(nextProps);
      }

      if (!isEqual(nextProps.value, this.state)) {
        // we can hardly reset value from parent component
        this.load(nextProps);
      }
    }

    load({ value = {}, min, max }) {
      this.setState({
        min: (value.min === `min` ? min : value.min) || min,
        max: (value.max === `max` ? max : value.max) || max,
      });
    }

    handleChange(val) {
      const [min, max] = val;

      this.setState({ min, max });
    }

    handleAfterChange() {
      if (typeof this.props.handleChange === `function`) {
        const value = {
          min: this.state.min === this.props.min ? undefined : this.state.min,
          max: this.state.max === this.props.max ? undefined : this.state.max,
        };

        const valueToSubmit = !value.min && !value.max ? undefined : value;

        this.props.handleChange(this.props.reference, valueToSubmit);
      }
    }

    render() {
      const { step, min, max, labelFormat = {} } = this.props;

      const handleTitleClassName = cn(
        s.handleTitle,
        this.props.handleTitleClassName,
      );

      const className = cn(s.slider, this.props.className);
      const barClassName = cn(s.bar, this.props.barClassName);
      const handleClassName = cn(s.handle, this.props.handleClassName);

      const { onMaxValue, onMinValue } = labelFormat;

      const isMinReached = this.state.min === min;
      const isMaxReached = this.state.max === max;

      const minValue = isMinReached && onMinValue ? onMinValue : this.state.min;
      const maxValue = isMaxReached && onMaxValue ? onMaxValue : this.state.max;

      const labelMin = `${labelFormat.prefix ||
        ``}${minValue}${labelFormat.postfix || ``}`;
      const labelMax = `${labelFormat.prefix ||
        ``}${maxValue}${labelFormat.postfix || ``}`;

      return (
        <div>
          <span className={handleTitleClassName} key="min">
            {labelMin}
          </span>

          <ReactSlider
            className={className}
            barClassName={barClassName}
            handleClassName={handleClassName}
            step={step}
            min={min}
            max={max}
            value={[this.state.min, this.state.max]}
            onChange={::this.handleChange}
            onAfterChange={::this.handleAfterChange}
            pearling
            withBars
          />

          <span className={handleTitleClassName} key="max">
            {labelMax}
          </span>
        </div>
      );
    }
  };
};
