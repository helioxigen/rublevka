import React from 'react';
import cn from 'classnames';

export default (styles = {}) => ({ className, kind, responsive, ...rest }) => {
  const anotherClass = {
    [styles[kind]]: !!kind,
    [styles.responsive]: !!responsive,
  };

  return (
    <img
      {...rest}
      className={cn(styles.img, anotherClass, className)}
      alt={rest.alt}
    />
  );
};
