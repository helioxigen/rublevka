import React from 'react';
import Portal from 'react-portal';

import cn from 'classnames';

const Modal = (s = {}, { Button, Icon }) => props => {
  const contentClassName = {
    [s[props.size]]: !!props.size,
  };

  return (
    <Portal {...props} className={cn(props.className, s.container)}>
      <div {...props} className={cn(s.content, contentClassName)}>
        {props.children}
        {!props.hideCloseButton && (
          <Button className={s.close} onClick={props.closePortal}>
            <Icon className={s.icon} icon="delete" />
          </Button>
        )}
      </div>
    </Portal>
  );
};

export default Modal;
