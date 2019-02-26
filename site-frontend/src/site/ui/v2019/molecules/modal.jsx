import React from 'react';

import Portal from 'react-portal';
import Body from 'site/components/body';

import cn from 'classnames';
import sUtils from 'site/styles/utils';

const Modal = (s = {}, { Button, Icon }) => props => {
  const contentClassName = {
    [s[props.size]]: !!props.size,
  };

  const closeButton = props.closeButton || (
    <Button className={s.close}>
      <Icon className={s.icon} icon="times" />
    </Button>
  );

  return (
    <Portal {...props} className={cn(props.className, s.container)}>
      <Body className={props.isOpened ? sUtils.scrollNotFixed : sUtils.scroll}>
        <div
          {...props}
          className={cn(s.content, contentClassName, props.contentClassName)}
          style={props.style}
        >
          {props.children}
          {!props.hideCloseButton &&
            React.cloneElement(closeButton, { onClick: props.closePortal })}
        </div>
      </Body>
    </Portal>
  );
};

export default Modal;
