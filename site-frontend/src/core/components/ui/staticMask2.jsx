import React from 'react';
import InputMask from 'inputmask-core';

export default () => ({ pattern, children }) => {
  const value = new InputMask({ pattern, value: children }).getValue();

  return <span>{value || children}</span>;
};
