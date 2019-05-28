import React from 'react';

import Helmet from 'react-helmet';
import { helmet } from 'config/seo';
import { ogMeta } from '../../helpers';

export default ({ pagination, query }) => {
  const seo = helmet.places.complexes.list;

  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const queryPage = Number(query.page);

  const title = seo.title(queryPage);

  const metaInfo = [
    { name: 'description', content: seo.description },
    ...ogMeta({
      title,
      description: seo.description,
    }),
  ];

  return (
    <Helmet
      title={seo.title(queryPage)}
      meta={metaInfo}
      link={seo.link(queryPage, totalPages)}
    />
  );
};
