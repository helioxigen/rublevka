/* eslint no-nested-ternary: 0 */
/* eslint no-param-reassign: 0 */
import React, { Component } from 'react';
import ReactSlider from 'react-slider';

import cn from 'classnames';

export default (s = {}) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        ...props,
        value: props.value,
      };
    }

    componentWillReceiveProps(nextProps) {
      const { value } = nextProps;
      const { max, min } = nextProps.value;

      if (max === `max` || max > nextProps.max)
        nextProps.value.max = nextProps.max;
      if (max < nextProps.min) nextProps.value.max = nextProps.min;
      if (min < nextProps.min) nextProps.value.min = nextProps.min;

      this.setState({ value });
    }

    handleChange(val) {
      const [min, max] = val;
      const value = { min, max };

      this.setState({ value });
    }

    handleBeforeChange() {
      const { onBeforeChange } = this.props;

      if (onBeforeChange) onBeforeChange();
    }

    handleAfterChange() {
      const { transform, onAfterChange } = this.props;
      const { value } = this.state;

      if (onAfterChange) onAfterChange();

      const min = transform ? transform(value.min) : value.min;

      // FIXME
      const max =
        value.max === this.state.max
          ? `max`
          : transform
          ? transform(value.max)
          : value.max;

      if (min === this.state.min && max === `max`) {
        return this.props.handleChange(this.props.reference, null);
      }

      this.props.handleChange(this.props.reference, { min, max });
    }

    render() {
      const { step, valueFormat, minPrefix, maxPrefix } = this.props;
      const { value, min, max } = this.state;

      return (
        <div>
          <div
            className={cn(s.handleTitle, this.props.handleTitleClassName)}
            key="min"
          >
            {minPrefix}&nbsp;
            {valueFormat.prefix}
            {value.min}&nbsp;
            {valueFormat.postfix}
          </div>
          <ReactSlider
            className={cn(s.slider, this.props.className)}
            barClassName={cn(s.bar, this.props.barClassName)}
            handleClassName={cn(s.handle, this.props.handleClassName)}
            step={step}
            value={[value.min, value.max]}
            min={min}
            max={max}
            onChange={::this.handleChange}
            onBeforeChange={::this.handleBeforeChange}
            onAfterChange={::this.handleAfterChange}
            pearling
            withBars
          />
          <div
            className={cn(s.handleTitle, this.props.handleTitleClassName)}
            key="max"
          >
            {maxPrefix}&nbsp;
            {valueFormat.prefix}
            {value.max === max ? valueFormat.max : value.max}&nbsp;
            {valueFormat.postfix}
          </div>
        </div>
      );
    }
  };
};
