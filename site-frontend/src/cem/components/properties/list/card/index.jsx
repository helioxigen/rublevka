import React from 'react';
import { Link } from 'react-router';

import { cloudfront } from 'core/config/resources';

import UI from 'cem/components/ui';
const { Media } = UI;

// import RetinaImage from 'react-retina-image';
import Description from './description';

import cn from 'classnames';
import s from 'cem/styles/ui/card';

import * as dict from 'cem/constants/properties/dictionaries';

const Image = ({ image }) =>
  // image ? <RetinaImage className={s.imageProperties} src={`${cloudfront}/${image.id}-thumbnail-256`} /> : <UI.Image className={cn(s.imageProperties, s.placeholder)} src={require(`url-loader!cem/assets/placeholder`)} />
  image ? (
    <div
      className={s.imageResponsive}
      style={{ backgroundImage: `url(${cloudfront}/${image.id}-thumbnail-256)` }}
    />
  ) : (
    <UI.Image
      className={cn(s.imageProperties, s.placeholder)}
      src={require('url-loader!cem/assets/placeholder')}
    />
  );

export default props => (
  <Link
    to={`/properties/${props.category}/${props.id}/about`}
    className={cn(s.card, s[dict.states[props.state].style])}
  >
    <Media
      left={<Image image={props.images[0]} />}
      body={<Description category={props.category} {...props} />}
    />
  </Link>
);
