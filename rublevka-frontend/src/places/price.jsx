import React, { Component, PropTypes } from 'react';

import { FormattedCurrency } from 'react-formatted';

class PropertyPrice extends Component {
  static propTypes = {
    deal: PropTypes.object.isRequired,
    dealType: PropTypes.string.isRequired,
  };

  render() {
    const { deal = {}, dealType, selectedCurrency } = this.props;

    const isCurrencyFilterActive = !!selectedCurrency;

    const dealPrice = isCurrencyFilterActive
      ? deal.multiCurrencyPrice && deal.multiCurrencyPrice[selectedCurrency]
      : deal.price;
    const dealCurrency = isCurrencyFilterActive
      ? selectedCurrency
      : deal.currency;

    return (
      <span>
        <FormattedCurrency
          value={dealPrice}
          symbol={dealCurrency && dealCurrency.toUpperCase()}
        />{' '}
        {dealType === `rent` ? `/ месяц` : ``}
      </span>
    );
  }
}

export default PropertyPrice;
