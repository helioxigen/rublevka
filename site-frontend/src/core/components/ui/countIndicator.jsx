import React from 'react';

import { declOfNum } from 'core/helpers';

export default (s = {}) => ({
  count,
  declensionForms,
  numberHidden,
  className,
  firstNumberHidden,
}) => {
  if (firstNumberHidden) {
    return (
      <span className={s.countIndicator}>
        <span className={className}>{count > 1 ? count : ''}</span>{' '}
        {declOfNum(count, declensionForms)}
      </span>
    );
  } else if (numberHidden) {
    return (
      <span className={s.countIndicator}>
        {declOfNum(count, declensionForms)}
      </span>
    );
  }
  return (
    <span className={s.countIndicator}>
      <span className={className}>{count}</span>{' '}
      {declOfNum(count, declensionForms)}
    </span>
  );
};
