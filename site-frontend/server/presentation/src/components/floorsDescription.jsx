import React from 'react';
import sortBy from 'lodash/sortBy';

import Address from './address';
import Equipment from './equipment';

import * as dict from 'cem/constants/properties/dictionaries';

const numberEndings = {
  1: 'ый',
  2: 'ой',
  3: 'ий',
  4: 'ый',
};

function sortFloors(floor) {
  const floorOrder = ['base', 'floor', 'attic'];
  const index = floorOrder.indexOf(floor.kind) * 100 + (floor.number || 0);
  return index;
}

export default ({
  specification: { legacyLayouts },
  equipment = {},
  location,
}) => (
  <div className="about">
    {sortBy(legacyLayouts, sortFloors)
      .filter(({ items }) => !!items.length)
      .map(({ kind, items, number }, index) => (
        <div className="about-list-container">
          <h2 className="about-title">
            {index % 3 === 0 ? 'Описание по этажам' : ''}&nbsp;
          </h2>

          <dl>
            <dt className="about-list-title">
              <strong>
                {kind === 'floor' ? `${number}-${numberEndings[number]}` : ''}{' '}
                {dict.floors[kind]}
              </strong>
            </dt>

            {items.slice(0, 11).map(item => (
              <dd className="about-list-item">{item}</dd>
            ))}
          </dl>
        </div>
      ))}

    {!!equipment.length && <Equipment items={equipment} />}
    <Address {...location} />
  </div>
);
