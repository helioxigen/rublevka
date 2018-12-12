import global from 'window-or-global';

import React from 'react';
import Helmet from 'react-helmet';
import { helmet } from 'site/config/seo';

import { nameToSlug } from 'core/helpers/nameToSlug';
import { dealTypesTranslit } from 'site/constants/properties/dictionaries';

import { enToTranslit } from '../helpers/translate';

const routeIds = global.config.routes.map(item => item.id) || [];

const makeMetaElement = (element, name, dealType, placeKind) => ({
  name: element,
  content: helmet.places[placeKind].show[element](name, dealType),
});

export default ({ placeKind, placeName, data, dealType }) => {
  const meta = [];

  if (data) {
    const isRoute = placeKind === 'routes';
    const isLocality = placeKind === 'localities';

    const isRouteFromConfig = routeIds.includes(data.id);
    const isPlaceOnRoute = routeIds.includes(data.location.routeId);

    const canonical = `https://${global.config.domain}/zagorodnaya/${enToTranslit[
      placeKind
    ]}/${nameToSlug(data.name)}_${data.id}/${dealTypesTranslit[dealType]}`;

    // send 404 if route or place can't be on this site
    if ((isLocality && !isPlaceOnRoute) || (isRoute && !isRouteFromConfig)) {
      meta.push({ name: 'status-code', content: 404 });

      return <Helmet meta={meta} />;
    }

    // send 301 if somehow name is not presented
    if (placeName.length === 0) {
      meta.push({ name: 'status-code', content: 301 });
      meta.push({
        name: 'header',
        header: 'Location',
        content: canonical,
      });

      return <Helmet meta={meta} />;
    }

    // otherwise send correct meta
    const title = helmet.places[placeKind].show.title(data, dealType);
    const link = [
      {
        rel: 'canonical',
        href: canonical,
      },
    ];
    // ↑ fucking russian seo

    meta.push(makeMetaElement('description', data.name, dealType, placeKind));
    meta.push(makeMetaElement('keywords', data.name, dealType, placeKind));

    return <Helmet title={title} meta={meta} link={link} />;
  }

  return <Helmet meta={[{ name: 'status-code', content: 404 }]} />;
};
