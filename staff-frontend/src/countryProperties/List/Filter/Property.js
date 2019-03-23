import React from 'react';
import {
  states,
  kinds,
  dictionaryToOptions,
} from '../../constants/dictionaries';

import Checkbox from './Checkbox';
import Radio from './Radio';

export function Kind({ currentValue, update, remove }) {
  return (
    <Radio
      title="Тип"
      currentValue={currentValue}
      remove={remove}
      update={value => update(value)}
      options={dictionaryToOptions(kinds)}
    />
  );
}

export function State({ currentValue, remove, update }) {
  const options = Object.entries(states).map(([key, { title: value }]) => ({
    value: key,
    label: value,
  }));
  return (
    <Checkbox
      title="Статус"
      currentValue={currentValue}
      remove={remove}
      update={update}
      options={options}
    />
  );
}
