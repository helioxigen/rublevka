import React from 'react';

import * as dicts from 'cem/constants/properties/dictionaries';

export default ({
  gasSupply,
  waterSupply,
  sewerageSupply,
  powerSupply,
  condition,
  renovate,
  furniture,
}) => {
  const showCommunications = !![
    gasSupply,
    powerSupply,
    sewerageSupply,
    waterSupply,
  ].filter(item => item).length;
  const showInfo = !![condition, renovate, furniture].filter(item => item)
    .length;

  return (
    <div className="description-list-container">
      {showCommunications && (
        <h2 className="description-title">Коммуникации</h2>
      )}
      {gasSupply && (
        <dl>
          <dt className="description-list-title">Газ:&nbsp;</dt>
          <dd className="description-list-item">
            {dicts.gasSupply[gasSupply]}
          </dd>
        </dl>
      )}
      {powerSupply && (
        <dl>
          <dt className="description-list-title">Электричество:&nbsp;</dt>
          <dd className="description-list-item">{powerSupply}</dd>
        </dl>
      )}
      {sewerageSupply && (
        <dl>
          <dt className="description-list-title">Канализация:&nbsp;</dt>
          <dd className="description-list-item">
            {dicts.sewerageSupply[sewerageSupply]}
          </dd>
        </dl>
      )}
      {waterSupply && (
        <dl>
          <dt className="description-list-title">Водоснабжение:&nbsp;</dt>
          <dd className="description-list-item">
            {dicts.waterSupply[waterSupply]}
          </dd>
        </dl>
      )}

      {showInfo && (
        <h2 className="description-title pushed-top-1_5">
          Информация об объекте
        </h2>
      )}
      {condition && (
        <dl>
          <dt className="description-list-title">Состояние:&nbsp;</dt>
          <dd className="description-list-item">
            {dicts.conditions[condition]}
          </dd>
        </dl>
      )}
      {renovate && (
        <dl>
          <dt className="description-list-title">Ремонт:&nbsp;</dt>
          <dd className="description-list-item">
            {dicts.renovateKinds[renovate]}
          </dd>
        </dl>
      )}
      {furniture && (
        <dl>
          <dt className="description-list-title">Мебель:&nbsp;</dt>
          <dd className="description-list-item">
            {dicts.furnitureKinds[furniture]}
          </dd>
        </dl>
      )}
    </div>
  );
};
