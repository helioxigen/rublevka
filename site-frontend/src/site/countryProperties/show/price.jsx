import React from 'react';
import { connect } from 'react-redux';

import { FormattedCurrency } from 'react-formatted';

const PropertyPrice = ({ deal = {}, dealType, selectedCurrency = 'usd' }) => (
  <span>
    <FormattedCurrency
      value={deal.multiCurrencyPrice[selectedCurrency]}
      symbol={selectedCurrency.toUpperCase()}
    />{' '}
    {dealType === 'rent' ? '/ месяц' : ''}
  </span>
);

const pickState = ({ displayOptions }) => ({ selectedCurrency: displayOptions.currency });

export default connect(pickState)(PropertyPrice);
