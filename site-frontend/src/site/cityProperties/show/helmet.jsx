import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { helmet } from 'site/config/seo';

import { formatPrice } from 'site/helpers';
import { dealTypes } from 'site/constants/properties/dictionaries';

export default class extends Component {
  render() {
    const { dealType, data } = this.props;
    const price = data[`${dealType}Offer`] ? data[`${dealType}Offer`].price : 0;
    const currency = data[`${dealType}Offer`]
      ? data[`${dealType}Offer`].currency
      : '';
    const meta = [
      {
        name: 'description',
        content: helmet.properties.show.city.description(
          dealType,
          data.kind,
          data.id,
          data.location.settlementName,
          data.location.mkadDistance,
          data.specification.area,
          price,
          data.location.routeName,
          data.location.districtName,
          data.location.regionName,
        ),
      },
      {
        name: 'keywords',
        content: helmet.properties.show.city.keywords(
          data.location.settlementName,
          dealType,
          data.kind,
          data.location.regionName,
          data.location.districtName,
          data.location.routeName,
          data.id,
          price,
        ),
      },
    ];

    const title = helmet.properties.show.city.title(
      dealTypes[dealType],
      data.kind,
      data.id,
      data.location.street,
      data.specification.totalArea,
      formatPrice(price, currency),
      data.location.subLocalityName,
    );

    return (
      // title: (dealType, kind, id, settlement, mkadDistance, area, price, route) =>
      // description: (dealType, kind, id, settlement, mkadDistance, area, price, route, district, region) =>
      // keywords: (name, dealType, kind, region, district, route, id, price) =>
      <Helmet title={title} meta={meta} />
    );
  }
}
