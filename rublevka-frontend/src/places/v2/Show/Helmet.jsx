import global from 'window-or-global';

import React from 'react';
import Helmet from 'react-helmet';
import { helmet } from 'config/seo';

import { nameToSlug } from 'core/helpers/nameToSlug';
import {
  dealTypesTranslit,
  kindsTranslit,
} from 'constants/properties/dictionaries';

import { enToTranslit } from '../../helpers/translate';

const routeIds = global.config.routes.map(item => item.id) || [];

const makeMetaElement = (element, name, dealType, placeKind, meta) => ({
  name: element,
  content: meta || helmet.places[placeKind].show[element](name, dealType),
});

export default ({
  placeKind,
  placeName,
  data,
  dealType,
  kind,
  pagination,
  query,
}) => {
  const meta = [];

  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const queryPage = Number(query.page) || 1;

  if (data) {
    const isRoute = placeKind === 'routes';
    const isLocality = placeKind === 'localities';

    const isRouteFromConfig = routeIds.includes(data.id);
    const isPlaceOnRoute = routeIds.includes(data.location.routeId);

    const kindPostfix = (placeKind && `/${placeKind}`) || '';
    const pagePostfix = (queryPage > 1 && `?page=${queryPage}`) || '';
    const canonical = `https://${global.config.domain}/zagorodnaya/${
      enToTranslit[placeKind]
    }/${nameToSlug(data.name)}_${data.id}/${
      dealTypesTranslit[dealType]
    }${kindPostfix}${pagePostfix}`;

    const routeSlugName = `${nameToSlug(data.name)}_${data.id}`;

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

    const metaItem =
      (data.meta && data.meta[(kind && `${dealType}_${kind}`) || dealType]) ||
      {};
    const getMeta = key => {
      if (metaItem[key]) return `${metaItem[key]} — страница ${queryPage}`;
    };

    const title =
      getMeta('title') ||
      helmet.places[placeKind].show.title(data, dealType, kind, queryPage);

    meta.push(
      makeMetaElement(
        'description',
        data.name,
        dealType,
        placeKind,
        getMeta('description'),
      ),
    );
    meta.push(
      makeMetaElement(
        'keywords',
        data.name,
        dealType,
        placeKind,
        getMeta('description'),
      ),
    );

    if (placeKind === 'routes') {
      const link = helmet.places[placeKind].show.link(
        routeSlugName,
        dealTypesTranslit[dealType],
        kindsTranslit[kind],
        queryPage,
        totalPages,
      );

      return <Helmet title={title} meta={meta} link={link} />;
    }
    const link = [
      {
        rel: 'canonical',
        href: canonical,
      },
    ];

    return <Helmet title={title} meta={meta} link={link} />;
  }

  return <Helmet meta={[{ name: 'status-code', content: 404 }]} />;
};
