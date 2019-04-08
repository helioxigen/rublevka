import { css } from 'styled-components';

const sizes = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xlg: 1440,
};

const media = Object.keys(sizes).reduce((accumulator, label) => {
  const acc = accumulator;
  const emSize = sizes[label] / 16;
  acc[label] = (...args) =>
    css`
      @media (min-width: ${emSize}em) {
        ${css(...args)};
      }
    `;
  return acc;
}, {});

export default media;
