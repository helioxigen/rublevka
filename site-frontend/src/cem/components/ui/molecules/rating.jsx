import React, { Component } from 'react';

import cn from 'classnames';

export default (s = {}, { Icon }) =>
  class extends Component {
    state = {
      focused: false,
    };

    render() {
      const {
        value,
        max = 5,
        onChange = () => {},
        disabled,
        captions = [],
      } = this.props;
      const repeat = Array.apply(null, { length: max });
      const focused = (!disabled && this.state.focused) || value;

      return (
        <div
          className={s.rating}
          onMouseLeave={() => this.setState({ focused: false })}
        >
          {repeat.map((_, index) => (
            <span
              key={index}
              onClick={() => onChange(index + 1)}
              className={cn(s.star, { [s.selected]: focused >= index + 1 })}
            >
              <Icon
                className={s.starIcon}
                icon="star"
                onMouseEnter={() => this.setState({ focused: index + 1 })}
              />
              <span className={s.caption}>{captions[index]}</span>
            </span>
          ))}
        </div>
      );
    }
  };
