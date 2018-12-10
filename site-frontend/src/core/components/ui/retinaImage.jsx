import React from 'react';
import isRetina from 'is-retina';

type Props = {
  ext: boolean,
  size: number,
  src: string,
};

export default () => (props: Props) => {
  if (props.ext) {
    const src = `${props.src}.${props.ext}`;

    return <img {...props} src={src} alt={props.alt} />;
  }

  const src = isRetina() ? `${props.src}-${props.size * 2}` : `${props.src}-${props.size}`;

  return <img {...props} src={src} alt={props.alt} />;
};
