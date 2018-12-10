import React, { Component, PropTypes } from 'react';
import { dictionary, values } from 'core/config/constants';

import cn from 'classnames';

export default (styles = {}) => {
  return class extends Component {
    constructor(props) {
      super(props);
    }

    static propTypes = {
      value: PropTypes.any.isRequired,
      type: PropTypes.string,
      name: PropTypes.string.isRequired,
    };

    renderValue(name, value, type) {
      switch (type) {
        case `boolean`: {
          return value ? <dd className={styles.item}>есть</dd> : <dd className={styles.item}>нет</dd>;
        }
        case `dictionary`: {
          return <dd className={styles.item}>{dictionary[name][value]}</dd>;
        }
        case `dimension`: {
          return <dd className={styles.item}>{value} {values[name].dimension}</dd>;
        }
        default: {
          return <dd className={styles.item}>{value}</dd>;
        }
      }
    }

    render() {
      if (
        (this.props.value !== 0) &&
        (typeof this.props.value !== `undefined`) &&
        (this.props.value || this.props.type === `boolean`)
      ) {
        return (
          <dl className={cn(styles.list, this.props.className)}>
            <dt className={styles.title}>{values[this.props.name].key}:&nbsp;</dt>
            {this.renderValue(this.props.name, this.props.value, this.props.type)}
          </dl>
        );
      } else {
        return null;
      }
    }
  };
};
