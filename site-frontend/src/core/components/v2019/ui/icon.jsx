import React from 'react';

export default () => props => {
  if (typeof window !== 'undefined') {
    const symbol = require(`site/assets/icons/${props.icon}.svg`).default; // eslint-disable-line

    return (
      <svg {...props}>
        <use xlinkHref={`#${symbol.id}`} />
      </svg>
    );
  }

  return <span />; // FIXME
};
