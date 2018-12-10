import React from 'react';

import cn from 'classnames';

export default (s = {}) => ({ label, children, titleClassName, itemClassName }) => (
  <dl className={s.list}>
    <dt className={cn(s.title, titleClassName)}>{label}</dt>
    <dd className={cn(s.item, itemClassName)}>{children || '—'}</dd>
  </dl>
  );
