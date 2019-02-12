import React from 'react';
import cn from 'classnames';

export default (s = {}) => props => {
  const sizes = {
    [s[props.size]]: !!props.size,
  };

  const notFound = {
    [s.notFound]: !!props.notFound,
  };

  if (props.size === 'sm') {
    return (
      <h3 {...props} className={cn(s.title, sizes, props.className)}>
        {props.children}
      </h3>
    );
  }
  return (
    <h2 {...props} className={cn(s.title, sizes, notFound, props.className)}>
      {props.children}
    </h2>
  );
};
