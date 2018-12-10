import React from 'react';
import cn from 'classnames';

export default (s = {}) => ({ label, children, big, small, valueClassName }) => {
  const className = {
    [s.titleBigger]: !!big,
    [s.listDescription]: !big,
  };

  if (small) {
    return (
      <dl className={s.list}>
        <dt className={s.titleSmaller}>{label}</dt>
        <dd className={cn(s.textSmaller, valueClassName)}>{children || '—'}</dd>
      </dl>
    );
  }
  return (
    <dl className={s.list}>
      <dt className={s.listTitle}>{label}</dt>
      <dd className={cn(valueClassName, className)}>{children || '—'}</dd>
    </dl>
  );
};
