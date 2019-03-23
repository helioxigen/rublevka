import global from 'window-or-global';

import React from 'react';
import Helmet from 'react-helmet';
import { show as seo } from '../constants/seo';

import { nameToSlug } from '../../../../core/helpers/nameToSlug';

const routeIds = global.config.routes.map(item => item.id) || [];

const makeMetaElement = (element, name, dealType, kind) => ({
  name: element,
  content: seo[element](name, dealType, kind),
});

export default ({
  placeName, placeKind, data, dealType, kind,
}) => {
  if (data) {
    const meta = [];

    const canonical = `https://${
      global.config.domain
    }/zagorodnaya/kottedzhnye-poselki/${nameToSlug(data.name)}_${data.id}`;

    // send 404 if settlement can't be on this site
    if (!routeIds.includes(data.location.routeId)) {
      meta.push({ name: 'status-code', content: 404 });
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
    const title = seo.title(data, dealType, kind);
    const link = [
      {
        rel: 'canonical',
        href: canonical,
      },
    ];
    // ↑ fucking russian seo

    meta.push(
      makeMetaElement('description', data.name, dealType, kind, placeKind),
    );
    // makeMetaElement('keywords', data.name, dealType, kind),

    return <Helmet title={title} meta={meta} link={link} />;
  }

  return <Helmet meta={[{ name: 'status-code', content: 404 }]} />;
};
