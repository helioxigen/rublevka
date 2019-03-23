import React from 'react';
import {
  dictionaryToOptions,
  currencies,
  prices,
  dealTypes,
  resaleKinds,
} from '../../constants/dictionaries';
import Checkbox from './Checkbox';
import Radio from './Radio';
import MinMax from './MinMax';

export function Currency({ currentValue, update, remove }) {
  return (
    <Radio
      title="Валюта"
      currentValue={currentValue}
      remove={remove}
      update={value => update(value)}
      options={dictionaryToOptions(currencies)}
    />
  );
}

export function Price({
  currentValue,
  dealTypeValue,
  currencyValue,
  remove,
  update,
}) {
  return (
    <MinMax
      title="Цена"
      currentValue={currentValue}
      remove={remove}
      update={value => update(value)}
      options={prices[currencyValue][dealTypeValue]}
    />
  );
}

export function Resale({ currentValue, remove, update }) {
  return (
    <Checkbox
      title="Тип продажи"
      currentValue={currentValue}
      remove={remove}
      update={update}
      options={dictionaryToOptions(resaleKinds)}
    />
  );
}

export function DealType({ currentValue, update, remove }) {
  return (
    <Radio
      title="Тип"
      currentValue={currentValue}
      remove={remove}
      update={value => update(value)}
      options={dictionaryToOptions(dealTypes)}
    />
  );
}
