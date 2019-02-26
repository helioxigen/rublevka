import React from 'react';

import * as dicts from 'cem/constants/properties/dictionaries';

export default ({
  buildYear,
  wallMaterial,
  area,
  balconyCount,
  ceilHeight,
  ceilingHeight,
  floors,
  roofMaterial,
  bedrooms,
  loggias,
  elevators,
  withConditioning,
  withVentilation,
}) => (
  <div className="description-list-container">
    <h2 className="description-title">Описание</h2>
    {buildYear && (
      <dl>
        <dt className="description-list-title">Год постройки:&nbsp;</dt>
        <dd className="description-list-item">{buildYear}</dd>
      </dl>
    )}
    {wallMaterial && (
      <dl>
        <dt className="description-list-title">Конструкция дома:&nbsp;</dt>
        <dd className="description-list-item">
          {dicts.wallMaterials[wallMaterial]}
        </dd>
      </dl>
    )}
    <dl>
      <dt className="description-list-title">Общая площадь:&nbsp;</dt>
      <dd className="description-list-item">{area}&nbsp;м²</dd>
    </dl>
    {balconyCount && (
      <dl>
        <dt className="description-list-title">Количество балконов:&nbsp;</dt>
        <dd className="description-list-item">{balconyCount}</dd>
      </dl>
    )}
    {(ceilHeight || ceilingHeight) && (
      <dl>
        <dt className="description-list-title">Высота потолков:&nbsp;</dt>
        <dd className="description-list-item">
          {ceilHeight || ceilingHeight}&nbsp;м
        </dd>
      </dl>
    )}
    {floors && (
      <dl>
        <dt className="description-list-title">Количество уровней:&nbsp;</dt>
        <dd className="description-list-item">{floors}</dd>
      </dl>
    )}
    {roofMaterial && (
      <dl>
        <dt className="description-list-title">Материал крыши:&nbsp;</dt>
        <dd className="description-list-item">
          {dicts.roofMaterials[roofMaterial]}
        </dd>
      </dl>
    )}
    {bedrooms && (
      <dl>
        <dt className="description-list-title">Количество спален:&nbsp;</dt>
        <dd className="description-list-item">{bedrooms}</dd>
      </dl>
    )}
    {loggias && (
      <dl>
        <dt className="description-list-title">Количество лоджий:&nbsp;</dt>
        <dd className="description-list-item">{loggias}</dd>]
      </dl>
    )}
    {elevators && (
      <dl>
        <dt className="description-list-title">Количество лифтов:&nbsp;</dt>
        <dd className="description-list-item">{elevators}</dd>
      </dl>
    )}
    <dl>
      <dt className="description-list-title">Кондиционирование:&nbsp;</dt>
      <dd className="description-list-item">
        {withConditioning ? 'Да' : 'Нет'}
      </dd>
    </dl>
    <dl>
      <dt className="description-list-title">Вентиляция:&nbsp;</dt>
      <dd className="description-list-item">
        {withVentilation ? 'Да' : 'Нет'}
      </dd>
    </dl>
  </div>
);
