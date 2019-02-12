import React from 'react';
import cn from 'classnames';

export default (s = {}) => ({
  children,
  position = 'top',
  title,
  className,
  hidden = false,
  onClick,
}) => (
  <div className={cn(!hidden && s.tooltipContainer, className)}>
    {React.cloneElement(children, {
      ...children.props,
      onClick: onClick || children.props.onClick,
      className: cn(children.props.className, s.tooltipTrigger),
    })}
    {!hidden && <span className={cn(s.tooltip, s[position])}>{title}</span>}
  </div>
);
