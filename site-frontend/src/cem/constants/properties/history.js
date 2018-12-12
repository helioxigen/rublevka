import React from 'react';

import { Link } from 'react-router';

import { FormattedCurrency } from 'react-formatted';

import fields from './fields';
import * as dict from './dictionaries';

import sUtils from 'cem/styles/utils';

const translateValue = (value, id) => {
  const dictionary = dict[fields[id].dictionaryKey] || {};

  if (typeof value === 'boolean') {
    return value ? 'Да' : 'Нет';
  } else if (dictionary[value] && dictionary[value].title) {
    return dictionary[value].title;
  } else if (dictionary[value]) {
    return dictionary[value];
  }
  return value;
};

const getFloor = (kind, number) => `${dict.floors[kind]}${number ? ` ${number}` : ''}`;

export const changeMessages = {
  object: {
    added: ({ value, id }) => (
      <span>
        Добавлено: <span className={sUtils.success}>{translateValue(value, id)}</span>
      </span>
    ),
    deleted: ({ value, id }) => (
      <span>
        Удалено: <span className={sUtils.danger}>{translateValue(value, id)}</span>
      </span>
    ),
    changed: ({ oldValue, value, id }) => (
      <span>
        Изменено: <span className={sUtils.danger}>{translateValue(oldValue, id)}</span>&nbsp;
        <span className={sUtils.success}>{translateValue(value, id)}</span>
      </span>
    ),
  },
  array: {
    added: ({ value, id }) => (
      <span>
        Добавлено: <span className={sUtils.success}>{translateValue(value, id)}</span>
      </span>
    ),
    deleted: ({ value, id }) => (
      <span>
        Удалено: <span className={sUtils.danger}>{translateValue(value, id)}</span>
      </span>
    ),
    changed: ({ oldValue, value, id }) => (
      <span>
        Изменено: <span className={sUtils.danger}>{translateValue(oldValue, id)}</span>&nbsp;
        <span className={sUtils.success}>{translateValue(value, id)}</span>
      </span>
    ),
    moved: ({ value, index, newIndex, id }) => `Изменен порядок: (${translateValue(value, id)}) c ${index + 1} на ${newIndex + 1}`,
  },
  image: {
    added: ({ value }) => (
      <span>
        Добавлено: <Link className={sUtils.success} to={value.url} target="_blank">ID: {value.id}</Link>
      </span>
    ),
    deleted: ({ value }) => (
      <span>
        Удалено: <Link className={sUtils.danger} to={value.url} target="_blank">ID: {value.id}</Link>
      </span>
    ),
    moved: ({ value, newIndex }) => (
      <span>
        Изменен порядок: <Link to={value.url} target="_blank">(ID: {value.id})</Link> стал {newIndex + 1} в списке
      </span>
    ),
  },
  imageIsPublic: {
    added: ({ parentValue }) => (
      <span>
        Добавлено: <span className={sUtils.danger}>Нет</span>&nbsp;
        <span className={sUtils.success}>Да</span> <Link to={parentValue.url} target="_blank">(ID: {parentValue.id})</Link>
      </span>
    ),
    deleted: ({ parentValue }) => (
      <span>
        Удалено: <span className={sUtils.danger}>Да</span>&nbsp;
        <span className={sUtils.success}>Нет</span> <Link to={parentValue.url} target="_blank">(ID: {parentValue.id})</Link>
      </span>
    ),
    changed: ({ value, parentValue }) => (
      <span>
        Изменено:&nbsp;
        <span className={sUtils.danger}>
          {value ? 'Нет' : 'Да'}
        </span>&nbsp;
        <span className={sUtils.success}>
          {value ? 'Да' : 'Нет'}
        </span> <Link to={parentValue.url} target="_blank">(ID: {parentValue.id})</Link>
      </span>
    ),
  },
  floorDescrption: {
    added: ({ value, id, parentValue }) => (
      <span>
        Добавлено:&nbsp;
        <span className={sUtils.success}>
          {translateValue(value, id)}
        </span> ({getFloor(parentValue.kind, parentValue.number)})
      </span>
    ),
    deleted: ({ value, id, parentValue }) => (
      <span>
        Удалено:&nbsp;
        <span className={sUtils.danger}>
          {translateValue(value, id)}
        </span> ({getFloor(parentValue.kind, parentValue.number)})
      </span>
    ),
  },
  residentialComplex: {
    added: ({ value }) => `Установлен ЖК: (ID: ${value})`,
  },
  agentFee: {
    added: ({ value }) => (
      <span>
        Добавлено: <span className={sUtils.success}>{value}</span>
      </span>
    ),
    deleted: ({ value }) => (
      <span>
        Удалено: <span className={sUtils.danger}>{value}</span>
      </span>
    ),
    changed: ({ value, oldValue }) => (
      <span>
        Изменено: <span className={sUtils.danger}>{oldValue}</span>&nbsp;
        <span className={sUtils.success}>{value}</span>
      </span>
    ),
  },
  fixedPrice: {
    added: ({ value }) => (
      <span>
        Добавлено:&nbsp;
        <span className={sUtils.success}>
          <FormattedCurrency symbol={value.currency} value={value.price} />
        </span>
      </span>
    ),
    deleted: ({ value }) => (
      <span>
        Удалено:&nbsp;
        <span className={sUtils.danger}>
          <FormattedCurrency symbol={value.currency} value={value.price} />
        </span>
      </span>
    ),
  },
};
