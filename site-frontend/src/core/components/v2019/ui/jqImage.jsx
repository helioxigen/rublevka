import React from 'react';
import global from 'window-or-global';

import { cloudfront } from 'core/config/resources';

export default (s = {}, { RetinaImage }) => ({ id, size = 512, ...props }) => (
  <RetinaImage
    {...props}
    src={`${global.config.cloudfront || cloudfront}/${id}`}
    size={size}
  />
);
