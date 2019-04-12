import React from 'react';

import { FormattedNumber } from 'react-formatted';

import {
  pluralizedKinds,
  offerKinds,
  kinds,
} from '../../../core/countryProperties/constants/dictionaries';

import UI from 'ui';

const { CountIndicator } = UI;

const Title = ({ data, dealType, withOffer = false }) => {
  const { location = {}, landDetails = {}, specification = {}, kind } = data;

  return (
    <div>
      {withOffer && offerKinds[dealType]}{' '}
      {withOffer ? pluralizedKinds[kind] : kinds[kind]}{' '}
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
      &nbsp;в пос. {location.settlementName}, {location.mkadDistance}&nbsp;км
    </div>
  );
};

export default Title;
