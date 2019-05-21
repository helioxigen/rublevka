import React, { useState } from 'react';
import { mkadDistance } from '../../constants/dictionaries';
import MinMax from './MinMax';
import MultiSelect from './MultiSelect';
import ValueInput from './ValueInput';

const fetchData = async (done, route, usedIds, name = '') =>
  fetch(
    `https://api.jqestate.ru/v1/places/${route}?filter[name]=${name}*&filterNot[id]=${(
      usedIds || []
    ).join(',')}`,
  )
    .then(value => value.json())
    .then(value => done(value.items));

export function Route({ currentValue, remove, update }) {
  const [data, updateData] = useState([]);

  return (
    <MultiSelect
      title="Направление"
      placeholder="Любое"
      currentValue={currentValue}
      onOpen={() => fetchData(updateData, 'routes', currentValue)}
      onSelect={(selected) => {
        update(selected);
        fetchData(updateData, 'routes', currentValue);
      }}
      onInputValueChange={value =>
        fetchData(updateData, 'routes', currentValue, value)
      }
      data={data}
      remove={remove}
      update={update}
    />
  );
}

export function Locality({ currentValue, remove, update }) {
  const [data, updateData] = useState([]);

  return (
    <MultiSelect
      title="Населенный пункт"
      placeholder="Любой"
      currentValue={currentValue}
      onOpen={() => fetchData(updateData, 'localities', currentValue)}
      onSelect={(selected) => {
        update(selected);
        fetchData(updateData, 'localities', currentValue);
      }}
      onInputValueChange={value =>
        fetchData(updateData, 'localities', currentValue, value)
      }
      data={data}
      remove={remove}
      update={update}
    />
  );
}

export function Settlement({ currentValue, remove, update }) {
  const [data, updateData] = useState([]);

  return (
    <MultiSelect
      title="Посёлок"
      placeholder="Любой"
      currentValue={currentValue}
      onOpen={() => fetchData(updateData, 'settlements', currentValue)}
      onSelect={(selected) => {
        update(selected);
        fetchData(updateData, 'settlements', currentValue);
      }}
      onInputValueChange={value =>
        fetchData(updateData, 'settlements', currentValue, value)
      }
      data={data}
      remove={remove}
      update={update}
    />
  );
}

export function MkadDistance({ currentValue, remove, update }) {
  return (
    <MinMax
      title="Расстояние от МКАД"
      currentValue={currentValue}
      remove={remove}
      update={value => update(value)}
      options={mkadDistance}
    />
  );
}

export function House({ currentValue, remove, update }) {
  return (
    <ValueInput
      title="Номер участка"
      placeholder="Любой"
      currentValue={currentValue}
      remove={remove}
      update={update}
    />
  );
}
