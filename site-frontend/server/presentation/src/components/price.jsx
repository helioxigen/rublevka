import React from 'react';
import { FormattedCurrency } from 'react-formatted';

export default ({ currency, price, dealType }) => (
  <span><FormattedCurrency symbol={currency} value={price} />&nbsp;{dealType === `rent` && `/ месяц`}</span>
);
