import React from 'react';
import Tags from '../../../UI/Tags';
import Block from './Block';

export default function Checkbox({
  title,
  currentValue = [],
  remove,
  options = [],
  update,
}) {
  const onChange = (value) => {
    const hasValue = currentValue.includes(value);
    return !hasValue
      ? update([...currentValue, value])
      : update(currentValue.filter(el => el !== value));
  };
  return (
    <Block title={title} hasValue={currentValue.length > 0} remove={remove}>
      <Tags
        options={options}
        selected={currentValue}
        onChange={value => onChange(value)}
      />
    </Block>
  );
}
