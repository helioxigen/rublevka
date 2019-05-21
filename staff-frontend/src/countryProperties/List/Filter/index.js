import React from 'react';
import styled from 'styled-components';
import intersection from 'lodash/intersection';

import { State, Kind } from './Property';
import {
  Currency, Price, Resale, DealType,
} from './Offers';
import {
  MkadDistance, Route, Locality, Settlement, House,
} from './Location';
import {
  Area, Bedrooms, WallMaterial, Renovate, Furniture,
} from './House';
import { LandArea, LandscapeKind } from './Land';

const StFilter = styled.section``;

const Section = styled.section`
  margin-bottom: 52px;
`;

// function Select() {
//   return <p>select</p>;
// }

// function Input() {
//   return <p>input</p>;
// }

// TODO
// function GuestHouse({ currentValue, remove, update }) {
//   return (
//     <Checkbox
//       title="Тип"
//       currentValue={currentValue}
//       remove={remove}
//       update={update}
//     />
//   );
// }
// function SecurityHouse({ currentValue, remove, update }) {
//   return (
//     <Checkbox
//       title="Тип"
//       currentValue={currentValue}
//       remove={remove}
//       update={update}
//     />
//   );
// }
// function StaffHouse({ currentValue, remove, update }) {
//   return (
//     <Checkbox
//       title="Тип"
//       currentValue={currentValue}
//       remove={remove}
//       update={update}
//     />
//   );
// }
// function SpaHouse({ currentValue, remove, update }) {
//   return (
//     <Checkbox
//       title="Тип"
//       currentValue={currentValue}
//       remove={remove}
//       update={update}
//     />
//   );
// }
// function BathHouse({ currentValue, remove, update }) {
//   return (
//     <Checkbox
//       title="Тип"
//       currentValue={currentValue}
//       remove={remove}
//       update={update}
//     />
//   );
// }

function Filter({ state = {}, ...props }) {
  const update = (key, value) => props.update(key, value);
  const remove = key => props.remove(key);

  return (
    <StFilter>
      <Section>
        <h2>Объект</h2>
        <Kind
          currentValue={state.kind}
          update={value => update('kind', value)}
          remove={() => remove('kind')}
        />
        <State
          currentValue={state.state}
          update={value => update('state', value)}
          remove={() => remove('state')}
        />
      </Section>

      <Section>
        <h2>Предложения</h2>
        <Currency
          currentValue={state.currency}
          update={value => update('currency', value)}
          remove={() => remove('currency')}
        />
        <DealType
          currentValue={state.dealType}
          update={value => update('dealType', value)}
          remove={() => remove('dealType')}
        />
        {state.dealType && state.currency && (
          <Price
            currentValue={state[state.dealType]}
            dealTypeValue={state.dealType}
            currencyValue={state.currency}
            update={value => update(state.dealType, value)}
            remove={() => remove(state.dealType)}
          />
        )}
        {state.dealType === 'sale' && (
          <Resale
            currentValue={state.isResale}
            update={value => update('isResale', value)}
            remove={() => remove('isResale')}
          />
        )}
      </Section>

      <Section>
        <h2>Локация</h2>
        <MkadDistance
          currentValue={state.mkadDistance}
          update={value => update('mkadDistance', value)}
          remove={() => remove('mkadDistance')}
        />
        <Route
          currentValue={state.routeIds}
          update={value => update('routeIds', value)}
          remove={() => remove('routeIds')}
        />
        <Locality
          currentValue={state.localityIds}
          update={value => update('localityIds', value)}
          remove={() => remove('localityIds')}
        />
        <Settlement
          currentValue={state.settlementIds}
          update={value => update('settlementIds', value)}
          remove={() => remove('settlementIds')}
        />
        <House
          currentValue={state.house}
          update={value => update('house', value)}
          remove={() => remove('house')}
        />
      </Section>

      {intersection(['house', 'townhouse'], state.kind).length > 0 && (
        <Section>
          <h2>Дом</h2>
          <Area
            currentValue={state.area}
            update={value => update('area', value)}
            remove={() => remove('area')}
          />
          <Bedrooms
            currentValue={state.bedroomsFrom}
            update={value => update('bedroomsFrom', value)}
            remove={() => remove('bedroomsFrom')}
          />
          <WallMaterial
            currentValue={state.wallMaterial}
            update={value => update('wallMaterial', value)}
            remove={() => remove('wallMaterial')}
          />
          <Renovate
            currentValue={state.renovate}
            update={value => update('renovate', value)}
            remove={() => remove('renovate')}
          />
          <Furniture
            currentValue={state.furniture}
            update={value => update('furniture', value)}
            remove={() => remove('furniture')}
          />
        </Section>
      )}

      <Section>
        <h2>Участок</h2>
        <LandArea
          currentValue={state.landArea}
          update={value => update('landArea', value)}
          remove={() => remove('landArea')}
        />
        <LandscapeKind
          currentValue={state.landscapeKind}
          update={value => update('landscapeKind', value)}
          remove={() => remove('landscapeKind')}
        />
      </Section>
      {/* <GuestHouse kind="" update={update} remove={remove} />
      <SecurityHouse kind="" update={update} remove={remove} />
      <StaffHouse kind="" update={update} remove={remove} />
      <SpaHouse kind="" update={update} remove={remove} />
      <BathHouse kind="" update={update} remove={remove} /> */}
    </StFilter>
  );
}

export default Filter;
