import global from 'window-or-global';

import React from 'react';
import Helmet from 'react-helmet';
import { helmet } from 'config/seo';

import { formatPrice } from 'helpers';
import {
  dealTypes,
  dealTypesTranslate,
  kindsTranslatePlural,
  kindsTranslit,
} from 'constants/properties/dictionaries';

const routeIds = global.config.routes.map(item => item.id) || [];

export default ({ data, kind, ...props }) => {
  const meta = [];

  if (data.id) {
    if (!routeIds.includes(data.location.routeId)) {
      meta.push({ name: 'status-code', content: 404 });

      return <Helmet meta={meta} />;
    }

    if (data.kind !== kind) {
      meta.push({ name: 'status-code', content: 301 });
      meta.push({
        name: 'header',
        header: 'Location',
        content: `https://${global.config.domain}/zagorodnaya/${
          props.dealType
        }/${kindsTranslit[data.kind]}/${data.id}`,
      });

      return <Helmet meta={meta} />;
    }

    const dealType = dealTypes[props.dealType];
    const { price, currency } = data[`${dealType}Offer`] || {};
    const formattedPrice = formatPrice(price, currency);

    meta.push({
      name: 'description',
      content: helmet.properties.show.country.description(
        dealType,
        data.kind,
        data.id,
        data.location.settlementName,
        data.location.mkadDistance,
        data.specification.area,
        formattedPrice,
        data.location.routeName,
        data.location.districtName,
        data.location.regionName,
      ),
    });

    meta.push({
      name: 'keywords',
      content: helmet.properties.show.country.keywords(
        data.location.settlementName,
        dealType,
        data.kind,
        data.location.regionName,
        data.location.districtName,
        data.location.routeName,
      ),
    });

    const title = helmet.properties.show.country.title(
      dealType,
      data.kind,
      data.id,
      data.location.settlementName,
      data.location.mkadDistance,
      data.specification.area,
      formattedPrice,
      data.location.routeName,
    );

    const link = helmet.properties.show.country.link(
      props.dealType,
      kindsTranslit[data.kind],
      data.id,
    );

    const script = [
      {
        innerHTML: `
        fbq('track', 'ViewContent', {content_name: '${
          props.titleH1
        }', content_category: '${dealTypesTranslate[dealType]} > ${
          kindsTranslatePlural[data.kind]
        }', content_ids: ['${data.id}'], content_type: 'product', value: ${
          props.usdPrice
        }, currency: 'USD'});
      `,
      },
    ];

    return <Helmet title={title} meta={meta} link={link} script={script} />;
  }

  return <Helmet meta={[{ name: 'status-code', content: 404 }]} />;
};
