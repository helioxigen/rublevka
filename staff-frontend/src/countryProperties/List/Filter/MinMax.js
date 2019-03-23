import React from 'react';
import SelectMinMax from '../../../UI/SelectMinMax';
import Block from './Block';

export default function MinMax({
  title,
  currentValue = {},
  remove,
  options = [],
  update,
}) {
  const hasValue = !!currentValue.min || !!currentValue.max;
  return (
    <Block title={title} hasValue={hasValue} remove={remove}>
      <SelectMinMax
        options={options}
        selected={currentValue}
        onChange={value => update(value)}
      />
    </Block>
  );
}
