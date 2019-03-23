import React from 'react';
import { mkadDistance } from '../../constants/dictionaries';
import MinMax from './MinMax';

// function Route() {
//   return <Select />;
// }
// function SubLocality() {
//   return <Select />;
// }
// function Settlement() {
//   return <Select />;
// }

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

export function House() {
  // return <Input />;
}
