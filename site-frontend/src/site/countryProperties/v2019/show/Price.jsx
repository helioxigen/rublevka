import React from 'react';
import { connect } from 'react-redux';

import { FormattedNumber } from 'react-intl';

const PropertyPrice = ({ deal = {}, dealType, selectedCurrency = 'usd' }) => (
  <span>
    <FormattedNumber
      style="currency"
      maximumSignificantDigits={1}
      currency={selectedCurrency}
      value={deal.multiCurrencyPrice[selectedCurrency]}
    />
    {dealType === 'rent' ? '/ месяц' : ''}
  </span>
);

const pickState = ({ displayOptions }) => ({
  selectedCurrency: displayOptions.currency,
});

export default connect(pickState)(PropertyPrice);
