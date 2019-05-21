import React from 'react';

import Helmet from 'react-helmet';
import { helmet } from 'config/seo';

import {
  dealTypesTranslit,
  kindsTranslit,
} from 'constants/properties/dictionaries';
import { ogMeta } from '../helpers';

export default ({ dealType, kind, pagination, query }) => {
  const seo = helmet.properties.list.country;

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const queryPage = Number(query.page);

  const title = seo.title(dealType, kind, queryPage);
  const description = seo.description(dealType, kind);

  const metaInfo = [
    { name: 'description', content: description },
    { name: 'keywords', content: seo.keywords(dealType, kind) },
    ...ogMeta({
      title,
      description,
    }),
  ];

  return (
    <Helmet
      title={title}
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
