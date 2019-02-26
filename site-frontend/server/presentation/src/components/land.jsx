import React from 'react';

import * as dict from 'cem/constants/properties/dictionaries';

export default ({ landDetails }) => (
  <section>
    <h2 className="description-title">Участок</h2>
    <dl>
      <dt className="description-list-title">Площадь:&nbsp;</dt>
      <dd className="description-list-item">{landDetails.area} сот</dd>
    </dl>
    <dl>
      <dt className="description-list-title">Ландшафтные работы:&nbsp;</dt>
      <dd className="description-list-item">
        {landDetails.landscaping ? 'Да' : 'Нет'}
      </dd>
    </dl>
    <dl>
      <dt className="description-list-title">Тип участка:&nbsp;</dt>
      <dd className="description-list-item">
        {landDetails.landscapeKind &&
          dict.landscapeKinds[landDetails.landscapeKind[0]]}
      </dd>
    </dl>
  </section>
);
