import React from 'react';

export default ({ additionalDetails }) => (
  <section>
    <h2 className="description-title pushed-top-1_5">Доп. строения</h2>
    <dl>
      <dt className="description-list-title">Гостевой дом:&nbsp;</dt>
      <dd className="description-list-item">{additionalDetails.guestHouseArea ? 'Есть' : 'Нет'}</dd>
    </dl>
    <dl>
      <dt className="description-list-title">Дом охраны:&nbsp;</dt>
      <dd className="description-list-item">
        {additionalDetails.securityHouseArea
          ? `Есть ${additionalDetails.securityHouseArea}`
          : 'Нет'}
      </dd>
    </dl>
    <dl>
      <dt className="description-list-title">Дом персонала:&nbsp;</dt>
      <dd className="description-list-item">{additionalDetails.staffHouseArea ? 'Есть' : 'Нет'}</dd>
    </dl>
    <dl>
      <dt className="description-list-title">SPA-комплекс:&nbsp;</dt>
      <dd className="description-list-item">{additionalDetails.spaArea ? 'Есть' : 'Нет'}</dd>
    </dl>
    <dl>
      <dt className="description-list-title">Баня:&nbsp;</dt>
      <dd className="description-list-item">{additionalDetails.bathhouseArea ? 'Есть' : 'Нет'}</dd>
    </dl>
  </section>
);
