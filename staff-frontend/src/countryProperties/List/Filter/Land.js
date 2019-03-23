import React from 'react';
import {
  landscapeKinds,
  dictionaryToOptions,
  landAreas,
} from '../../constants/dictionaries';
import Checkbox from './Checkbox';
import MinMax from './MinMax';

export function LandArea({ currentValue, remove, update }) {
  return (
    <MinMax
      title="Размер участка, сот"
      currentValue={currentValue}
      remove={remove}
      update={value => update(value)}
      options={landAreas}
    />
  );
}
export function LandscapeKind({ currentValue, remove, update }) {
  return (
    <Checkbox
      title="Тип участка"
      currentValue={currentValue}
      remove={remove}
      update={update}
      options={dictionaryToOptions(landscapeKinds)}
    />
  );
}
