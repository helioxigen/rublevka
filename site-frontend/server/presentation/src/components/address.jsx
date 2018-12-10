import React from 'react';

export default ({ routeName, localityName, settlementName, mkadDistance }) => (
  <div className="about-list-container">
    <h2 className="about-title">Адрес</h2>
    {routeName &&
      <dl>
        <dt className="about-address-list-title">Шоссе:&nbsp;</dt>
        <dd className="about-address-list-item">{routeName}</dd>
      </dl>
    }
    {localityName &&
      <dl>
        <dt className="about-address-list-title">Населенный пункт:&nbsp;</dt>
        <dd className="about-address-list-item">{localityName}</dd>
      </dl>
    }
    {settlementName &&
      <dl>
        <dt className="about-address-list-title">Поселок:&nbsp;</dt>
        <dd className="about-address-list-item">{settlementName}</dd>
      </dl>
    }
    {mkadDistance &&
      <dl>
        <dt className="about-address-list-title">От МКАД:&nbsp;</dt>
        <dd className="about-address-list-item">{mkadDistance} км</dd>
      </dl>
    }
  </div>
);
