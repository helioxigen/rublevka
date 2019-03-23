import React from 'react';
import SegmentedControl from '../../../UI/SegmentedControl';
import Block from './Block';

export default function Radio({
  title,
  options,
  update,
  remove,
  currentValue,
}) {
  return (
    <Block title={title} hasValue={!!currentValue} remove={remove}>
      <SegmentedControl
        options={options}
        selected={currentValue}
        onChange={value => update(value)}
        isFullWidth
      />
    </Block>
  );
}
