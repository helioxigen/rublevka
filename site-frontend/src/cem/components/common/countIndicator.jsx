import React from 'react';

import { declOfNum } from 'core/helpers';

export default ({ count, declensionForms, className }) => (
  <span className={className}>{count} {declOfNum(count, declensionForms)}</span>
);
