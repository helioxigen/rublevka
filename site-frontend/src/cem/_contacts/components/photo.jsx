import React from 'react';
import UI from 'cem/components/ui';

import { cloudfront } from 'core/config/resources';

export default ({ photo = {}, size, kind, propertyPlaceholder }) => {
  if (photo.url) {
    return (
      <UI.Image
        src={`${photo.url}-64`}
        kind={kind}
        width={size}
        height={size}
      />
    );
  }
  if (photo.id) {
    return (
      <UI.Image
        src={`${cloudfront}/${photo.id}-64`}
        kind={kind}
        width={size}
        height={size}
      />
    );
  }
  return (
    <UI.Image
      src={
        propertyPlaceholder
          ? require('url-loader!cem/assets/placeholder')
          : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
      }
      kind={kind}
      width={size}
      height={size}
    />
  );
};
