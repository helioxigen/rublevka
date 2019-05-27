import React from 'react';
import Helmet from 'react-helmet';
import { helmet } from 'config/seo';

import global from 'window-or-global';
const routeIds = global.config.routes.map(item => item.id);

const makeMetaElement = (element, name, dealType, placeKind) => ({
  name: element,
  content: helmet.places[placeKind].show[element](name, dealType),
});

export default props => {
  const { placeKind, data, dealType } = props;

  if (data) {
    const title = helmet.places[placeKind].show.title(data.name, dealType);
    const meta = [
      makeMetaElement('description', data.name, dealType, placeKind),
    ];

    if (
      data.location &&
      routeIds &&
      routeIds.indexOf(data.location.routeId) === -1
    ) {
      meta.push({ name: 'status-code', content: 404 });
    }

    return <Helmet title={title} meta={meta} />;
  }
  return <Helmet meta={[{ name: 'status-code', content: 404 }]} />;
};
