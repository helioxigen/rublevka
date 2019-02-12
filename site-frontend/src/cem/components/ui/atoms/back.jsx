import React from 'react';

import { history } from 'cem/routes';

export default () => props =>
  React.cloneElement(props.children || props.button, {
    onClick: () => history.goBack(),
  });
