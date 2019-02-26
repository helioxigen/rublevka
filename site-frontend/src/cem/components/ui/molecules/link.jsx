import React, { Component } from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

export default class extends Component {
  render() {
    const { className, activeClassName, to, exact, ...props } = this.props;
    const pathname =
      typeof window !== 'undefined'
        ? window.location.pathname.split('?')[0]
        : '';

    if (exact) {
      return (
        <Link
          {...props}
          to={to}
          className={cn(className, { [activeClassName]: to === pathname })}
        />
      );
    }
    return (
      <Link
        {...props}
        to={to}
        className={className}
        activeClassName={activeClassName}
      />
    );
  }
}
