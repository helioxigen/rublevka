import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { get } from '../../jq-redux-api/api'; // TODO use action

const fetchData = async (done, name = '') => {
  const result = await get(
    `/v1/places/settlements?filter[name,location.subLocalityName,location.localityName]=${name}*`,
  );
  const { items } = result;
  done(items);
};

export default ({ onChange }) => {
  const [data, updateData] = useState([]);
  const settlements = data.map(
    ({ id, name, location: { districtName, routeName, localityName } }) => ({
      name: [districtName, routeName, localityName, name].join(', '),
      id,
    }),
  );

  return (
    <Dropdown
      placeholder="Посёлок"
      data={settlements}
      onOpen={() => fetchData(updateData)}
      onInputValueChange={value => fetchData(updateData, value)}
      onSelect={(value) => {
        const settlement = data.find(item => item.id === value);
        onChange(settlement);
      }}
    />
  );
};
