import React from 'react';

import Body from 'site/components/body';

import cn from 'classnames';
import sUtils from 'site/styles/utils';

const Modal = (s = {}) => props => {
  const contentClassName = {
    [s[props.size]]: !!props.size,
  };

  return (
    <div
      {...props}
      className={cn(
        props.className,
        s.container,
        props.isOpened ? sUtils.showFilter : sUtils.hideFilter,
      )}
    >
      <Body className={props.isOpened ? sUtils.scrollNotFixed : sUtils.scroll}>
        <div
          {...props}
          className={cn(s.content, contentClassName, props.contentClassName)}
          style={props.style}
        >
          {props.children}
        </div>
      </Body>
    </div>
  );
};

export default Modal;
