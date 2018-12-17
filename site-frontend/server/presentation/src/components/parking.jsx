import React from 'react';

import CountIndicator from 'cem/components/common/countIndicator';

export default ({ additionalDetails }) => (
  <section>
    <h2 className="description-title pushed-top-1_5">Паркинг</h2>
    <dl>
      <dt className="description-list-title">Гараж:&nbsp;</dt>
      <dd className="description-list-item">{additionalDetails.garageArea ? 'Есть' : 'Нет'}</dd>
    </dl>
    <dl>
      <dt className="description-list-title">Паркинг:&nbsp;</dt>
      {additionalDetails.garageArea && (
        <dd className="description-list-item">
          Есть (на{' '}
          <CountIndicator
            count={additionalDetails.garageArea}
            declensionForms={['машину', 'машины', 'машин']}
          />
          )
        </dd>
      )}
      {!additionalDetails.garageArea && <dd className="description-list-item">Нет</dd>}
    </dl>
  </section>
);
