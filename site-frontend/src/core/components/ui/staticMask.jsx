import React from 'react';
import InputMask from 'inputmask-core';

export default ({ pattern, children }) => {
  const value = children ? new InputMask({ pattern, value: children }).getValue() : null;

  return <span>{value}</span>;
};
