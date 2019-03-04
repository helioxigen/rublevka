import React from 'react';
import { connect } from 'react-redux';

import { FormattedNumber } from 'react-intl';

const PropertyPrice = ({ deal = {}, dealType, selectedCurrency = 'usd' }) => (
  <span>
    <FormattedNumber
      style="currency"
      currency={selectedCurrency}
      value={deal.multiCurrencyPrice[selectedCurrency]}
      maximumSignificantDigits={12}
    />
    {dealType === 'rent' ? '/ месяц' : ''}
  </span>
);

const pickState = ({ displayOptions }) => ({
  selectedCurrency: displayOptions.currency,
});

export default connect(pickState)(PropertyPrice);
