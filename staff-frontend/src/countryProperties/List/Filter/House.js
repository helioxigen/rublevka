import React from 'react';
import {
  bedrooms,
  wallMaterials,
  dictionaryToOptions,
  areas,
  renovateKinds,
  furnitureKinds,
} from '../../constants/dictionaries';
import Checkbox from './Checkbox';
import Radio from './Radio';
import MinMax from './MinMax';

export function Area({ currentValue, remove, update }) {
  return (
    <MinMax
      title="Размер дома, м²"
      currentValue={currentValue}
      remove={remove}
      update={value => update(value)}
      options={areas}
    />
  );
}

export function Bedrooms({ currentValue, update, remove }) {
  return (
    <Radio
      title="Спален"
      currentValue={currentValue}
      update={value => update(value)}
      remove={remove}
      options={dictionaryToOptions(bedrooms)}
    />
  );
}

export function WallMaterial({ currentValue, remove, update }) {
  return (
    <Checkbox
      title="Материал"
      currentValue={currentValue}
      remove={remove}
      update={update}
      options={dictionaryToOptions(wallMaterials)}
    />
  );
}

export function Renovate({ currentValue, remove, update }) {
  return (
    <Checkbox
      title="Ремонт"
      currentValue={currentValue}
      remove={remove}
      update={update}
      options={dictionaryToOptions(renovateKinds)}
    />
  );
}

export function Furniture({ currentValue, remove, update }) {
  return (
    <Checkbox
      title="Мебель"
      currentValue={currentValue}
      remove={remove}
      update={update}
      options={dictionaryToOptions(furnitureKinds)}
    />
  );
}
