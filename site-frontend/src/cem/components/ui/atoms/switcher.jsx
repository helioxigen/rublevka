import React from 'react';
import cn from 'classnames';

export default (s = {}) => props => (
  <div className={cn(s.switch)}>
    <label className={s.switchLabel}>
      <input
        type="checkbox"
        name="onoffswitch"
        className={s.switchControl}
        {...props}
      />
    </label>
  </div>
);
