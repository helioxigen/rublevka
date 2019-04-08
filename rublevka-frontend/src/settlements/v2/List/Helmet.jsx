import React from 'react';

import Helmet from 'react-helmet';
import { list as seo } from '../../constants/seo';

export default ({ pagination = {}, location = {} }) => {
  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const queryPage = Number(location.query.page || 1);

  return (
    <Helmet
      title={seo.title(queryPage)}
      meta={seo.meta()}
      link={seo.link(queryPage, totalPages)}
    />
  );
};
