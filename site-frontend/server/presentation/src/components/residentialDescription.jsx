import React from 'react';

import CountIndicator from 'cem/components/common/countIndicator';
import * as dicts from 'cem/constants/properties/dictionaries';

export default ({ name, details }) => (
  <div className="description-list-container">
    <h2 className="description-title">Описание дома</h2>
    {name && (
      <dl>
        <dt className="description-list-title">Название ЖК:&nbsp;</dt>
        <dd className="description-list-item">{name}</dd>
      </dl>
    )}
    {details && details.builtYear && (
      <dl>
        <dt className="description-list-title">Год постройки:&nbsp;</dt>
        <dd className="description-list-item">{details.builtYear}</dd>
      </dl>
    )}
    {details && details.floors && (
      <dl>
        <dt className="description-list-title">Этажность:&nbsp;</dt>
        <dd className="description-list-item">{details.floors}</dd>
      </dl>
    )}
    {details && details.security && (
      <dl>
        <dt className="description-list-title">Территория:&nbsp;</dt>
        <dd className="description-list-item">
          {dicts.securityKinds[details.security]}
        </dd>
      </dl>
    )}
    {details && details.parkings && (
      <dl>
        <dt className="description-list-title">Паркинг:&nbsp;</dt>
        {details.parkings && (
          <dd className="description-list-item">
            Есть (на{' '}
            <CountIndicator
              count={details.parkings}
              declensionForms={['машину', 'машины', 'машин']}
            />
            )
          </dd>
        )}
        {!details.parkings && <dd className="description-list-item">Нет</dd>}
      </dl>
    )}
  </div>
);
