import React from 'react';

import Price from './price';

const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

export default ({ data }) => (
  <section className="info">
    {data.category === 'country' && (
      <h1 className="info-title">
        {data.location.settlementName}, {data.location.mkadDistance} км
      </h1>
    )}
    {data.category === 'city' && (
      <h1 className="info-title">
        {capitalizeFirstLetter(data.location.street)}, {data.location.house}
      </h1>
    )}
    <ul className="info-list">
      {data.saleOffer && (
        <li className="info-list-item bold">
          <Price {...data.saleOffer} dealType="sale" />
          <span className="pipe" />
        </li>
      )}
      {data.rentOffer && (
        <li className="info-list-item bold">
          <Price {...data.rentOffer} dealType="rent" />
          <span className="pipe" />
        </li>
      )}
      {data.specification && data.specification.area && (
        <li className="info-list-item">
          {data.specification.area} м² <span className="pipe" />
        </li>
      )}
      {data.specification && data.specification.totalArea && (
        <li className="info-list-item">
          {data.specification.totalArea} м² <span className="pipe" />
        </li>
      )}
      {data.specification && data.specification.floor && (
        <li className="info-list-item">{data.specification.floor} этаж</li>
      )}
      {data.landDetails && data.landDetails.area && (
        <li className="info-list-item">{data.landDetails.area} сот.</li>
      )}
    </ul>
    <p className="info-text">ID {data.id}</p>
  </section>
);
