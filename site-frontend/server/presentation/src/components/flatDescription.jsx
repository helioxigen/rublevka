import React from 'react';

export default ({ ceilHeight, bedrooms, wcs, balconies, loggias }) => (
  <div className="description-list-container">
    <h2 className="description-title">Описание квартиры</h2>
    {ceilHeight &&
      <dl>
        <dt className="description-list-title">Высота потолков:&nbsp;</dt>
        <dd className="description-list-item">{ceilHeight} м</dd>
      </dl>
    }
    {bedrooms &&
      <dl>
        <dt className="description-list-title">Спален:&nbsp;</dt>
        <dd className="description-list-item">{bedrooms}</dd>
      </dl>
    }
    {wcs &&
      <dl>
        <dt className="description-list-title">Санузлов:&nbsp;</dt>
        <dd className="description-list-item">{wcs}</dd>
      </dl>
    }
    {balconies &&
      <dl>
        <dt className="description-list-title">Балконов:&nbsp;</dt>
        <dd className="description-list-item">{balconies}</dd>
      </dl>
    }
    {loggias &&
      <dl>
        <dt className="description-list-title">Лоджий:&nbsp;</dt>
        <dd className="description-list-item">{loggias}</dd>
      </dl>
    }
  </div>
);
