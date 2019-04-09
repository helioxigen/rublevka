import React, { Component } from 'react';

import { connect } from 'react-redux';

// constants
import { routeKinds } from 'core/places/constants/dictionaries';
import {
  kinds,
  renovateKinds,
} from 'core/countryProperties/constants/dictionaries';

// helpers
import { formatByDictionary, formatByMinMax } from 'helpers';

// styles
import {
  FilterItem,
  FilterItemBtn,
  FilterItemIcon,
  ResetFilter,
  HeaderResetBtn,
} from './styled';

// components
const ArrayButton = ({ dictionary, children, reference, onChange }) => (
  <FilterItem>
    {formatByDictionary(children, dictionary)}

    <FilterItemBtn onClick={() => onChange(reference, children)}>
      <FilterItemIcon icon="times" />
    </FilterItemBtn>
  </FilterItem>
);

const MinMaxButton = ({ value, reference, onChange, prefix, postfix }) => (
  <FilterItem onClick={() => onChange(reference)}>
    {formatByMinMax(value, postfix, prefix)}

    <FilterItemBtn>
      <FilterItemIcon icon="times" />
    </FilterItemBtn>
  </FilterItem>
);

class Selected extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(reference, value) {
    this.props.removeFilter(reference, value);
  }

  render() {
    const { filters = {}, filterCount, resetFilter } = this.props;
    const {
      routeIds = [],
      kind = [],
      sale,
      rent,
      area,
      landArea,
      renovate = [],
      mkadDistance,
    } = filters;

    const isSaleShown = sale && (!!sale.min || !!sale.max);
    const isRentShown = rent && (!!rent.min || !!rent.max);
    const isAreaShown = area && (!!area.min || !!area.max);
    const isLandAreaShown = landArea && (!!landArea.min || !!landArea.max);
    const isMkadDistanceShown =
      mkadDistance && (!!mkadDistance.min || !!mkadDistance.max);

    const currencyPriceSale =
      sale && (sale.currencyPrice || 'saleOffer.multiCurrencyPrice.usd');
    const currencyPriceRent =
      rent && (rent.currencyPrice || 'saleOffer.multiCurrencyPrice.usd');

    return (
      <span>
        {routeIds.map(value => (
          <ArrayButton
            dictionary={routeKinds}
            reference="routeIds"
            onChange={this.onChange}
            key={value}
          >
            {value}
          </ArrayButton>
        ))}

        {kind.map(value => (
          <ArrayButton
            dictionary={kinds}
            reference="kind"
            onChange={this.onChange}
            key={value}
          >
            {value}
          </ArrayButton>
        ))}

        {isSaleShown &&
          currencyPriceSale === 'saleOffer.multiCurrencyPrice.usd' && (
            <MinMaxButton
              reference="sale"
              onChange={this.onChange}
              prefix="$"
              postfix=" млн"
              value={sale}
            />
          )}

        {isSaleShown &&
          currencyPriceSale === 'saleOffer.multiCurrencyPrice.rub' && (
            <MinMaxButton
              reference="sale"
              onChange={this.onChange}
              postfix=" млн руб."
              value={sale}
            />
          )}

        {isRentShown &&
          currencyPriceRent === 'rentOffer.multiCurrencyPrice.usd' && (
            <MinMaxButton
              reference="rent"
              onChange={this.onChange}
              prefix="$"
              postfix=" тыс"
              value={rent}
            />
          )}

        {isRentShown &&
          currencyPriceRent === 'rentOffer.multiCurrencyPrice.rub' && (
            <MinMaxButton
              reference="rent"
              onChange={this.onChange}
              postfix=" тыс руб."
              value={rent}
            />
          )}

        {isAreaShown && (
          <MinMaxButton
            reference="area"
            onChange={this.onChange}
            postfix=" м²"
            value={area}
          />
        )}

        {isLandAreaShown && (
          <MinMaxButton
            reference="landArea"
            onChange={this.onChange}
            postfix=" сот"
            value={landArea}
          />
        )}

        {renovate.map(value => (
          <ArrayButton
            dictionary={renovateKinds}
            reference="renovate"
            onChange={this.onChange}
            key={value}
          >
            {value}
          </ArrayButton>
        ))}

        {isMkadDistanceShown && (
          <MinMaxButton
            reference="mkadDistance"
            onChange={this.onChange}
            postfix=" км"
            value={mkadDistance}
          />
        )}

        <ResetFilter>
          {!!filterCount && (
            <HeaderResetBtn onClick={resetFilter}>Сбросить всё</HeaderResetBtn>
          )}
        </ResetFilter>
      </span>
    );
  }
}

const pickState = ({ displayOptions }) => ({
  state: { displayOptions },
});

export default connect(pickState)(Selected);
