import React from 'react';

import Responsive from 'react-responsive';

export const HideXsLg = ({ children }) => (
  <Responsive minWidth={480} maxWidth={1200}>
    {children}
  </Responsive>
);

export const HideXsSm = ({ children }) => (
  <Responsive minWidth={768}>{children}</Responsive>
);
export const ShowXsSm = ({ children }) => (
  <Responsive maxWidth={767}>{children}</Responsive>
);
export const HideXsSmMd = ({ children }) => (
  <Responsive minWidth={993}>{children}</Responsive>
);
export const ShowXsSmMd = ({ children }) => (
  <Responsive maxWidth={992}>{children}</Responsive>
);
