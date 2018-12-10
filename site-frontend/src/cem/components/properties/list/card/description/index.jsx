import React from 'react';

import CityDescription from './city';
import CountryDescription from './country';

import cn from 'classnames';
import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';

export default props => (
  <div className={cn(s.cardWrapper, sUtils.resetPaddingLeft)}>
    {props.category === 'city' && <CityDescription {...props} />}
    {props.category === 'country' && <CountryDescription {...props} />}
  </div>
);
