import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';

export default (props) => {
  const { isHidden, isDisabled, isActive, onClick, children, key, styles = {}, to, rel } = props;

  const className = {
    [styles.disabled]: isDisabled,
    [styles.active]: isActive,
  };

  if (isHidden) return null;

  if (isActive || isDisabled) {
    return (
      <span disabled className={cn(className, props.className)}>
        {children}
      </span>
    );
  }

  return (
    <Link to={to} key={key} rel={rel} className={cn(className, props.className)} onClick={onClick}>
      {children}
    </Link>
  );
};
