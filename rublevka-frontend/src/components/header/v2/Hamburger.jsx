import React from 'react';

import styled from 'styled-components';
import media from 'styles/media';

const Wrapper = styled.div`
  display: inline-block;
  width: 2rem;
  cursor: pointer;
  transition: 200ms ease-in-out;
  margin-top: ${p => p.active && '-.5rem'};
`;

const Line = styled.div`
  background: #212121;
  width: 2rem;
  height: 0.2rem;
  margin-bottom: 0.4rem;
  position: relative;
  transition: all 200ms ease-in-out;

  ${media.sm`
    width: 1.8rem;
    margin-bottom: 0.3rem;
  `};
`;

const LineTop = Line.extend`
  ${p =>
    p.active &&
    `
    transform: rotate(45deg);
    top: 1.1rem;
  `};

  ${media.sm`
    ${p =>
      p.active &&
      `
      transform: rotate(45deg);
      top: 0.7rem;
    `};
  `};
`;

const LineMiddle = Line.extend`
  ${p =>
    p.active &&
    `
    transform: rotate(-45deg);
    top: 0.5rem;
  `};

  ${media.sm`
  ${p =>
    p.active &&
    `
      top: 0.2rem;
  `};
`};
`;

const LineBottom = Line.extend`
  ${p =>
    p.active &&
    `
    transition: 100ms ease-in-out;
    opacity: 0;
  `};
`;

export default props => (
  <Wrapper active={props.active}>
    <LineTop active={props.active} />
    <LineMiddle active={props.active} />
    <LineBottom active={props.active} />
  </Wrapper>
);
