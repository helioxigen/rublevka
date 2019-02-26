import React from 'react';

import { FormattedNumber } from 'react-formatted';

import { pluralizedKinds } from 'core/countryProperties/constants/dictionaries';
import { offerKinds, kinds } from 'cem/constants/properties/dictionaries'; // TODO: fix

import UI from 'site/ui';

const { CountIndicator } = UI;

const Title = ({ data, dealType, withOffer = false }) => {
  const { location = {}, landDetails = {}, specification = {}, kind } = data;

  return (
    <div>
      {withOffer && offerKinds[dealType]} {withOffer ? pluralizedKinds[kind] : kinds[kind]}{' '}
      {kind === 'land' ? (
        <span>
          <FormattedNumber value={Math.floor(landDetails.area)} />
          &nbsp;сот
        </span>
      ) : (
        <CountIndicator
          count={specification.bedrooms}
          declensionForms={['спальня', 'спальни', 'спален']}
        />
      )}
      &nbsp;в пос. {location.settlementName},&nbsp;
      {location.mkadDistance} км
    </div>
  );
};

export default Title;
