import React from 'react';

import Helmet from 'react-helmet';
import { helmet } from 'site/config/seo';

import {
  dealTypesTranslit,
  kindsTranslit,
} from 'site/constants/properties/dictionaries';

export default ({ dealType, kind, pagination, query }) => {
  const seo = helmet.properties.list.country;

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const queryPage = Number(query.page);

  const metaInfo = [
    { name: 'description', content: seo.description(dealType, kind) },
    { name: 'keywords', content: seo.keywords(dealType, kind) },
  ];

  return (
    <Helmet
      title={seo.title(dealType, kind, queryPage)}
      meta={metaInfo}
      link={seo.link(
        dealTypesTranslit[dealType],
        kindsTranslit[kind],
        queryPage,
        totalPages,
      )}
    />
  );
};
