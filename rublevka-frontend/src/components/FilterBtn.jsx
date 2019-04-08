import React from 'react';

import UI from 'ui';

import styled from 'styled-components';
import media from 'styles/media';

const { Icon, Button } = UI;

const StIcon = styled(Icon)`
  width: 1.8rem;
  height: 1.7rem;
  margin-right: ${p => (p.withoutText ? '0' : '1rem')};
  vertical-align: middle;
  fill: ${p => p.theme.brandWhite};
  margin-top: -0.4rem;

  ${media.sm`
    margin-right: ${p => (p.withoutText ? '0' : '1.6rem')};
  `};
`;

const Btn = styled(Button)`
  padding: ${p =>
    p.withCounter ? '1.5rem 1.8rem 1.3rem' : '1.5rem 2.2rem 1.3rem'};
  ${p => p.withoutText && 'padding: 1.5rem 1.4rem;'};
  font-size: 1.6rem;
  background-color: ${p => p.theme.brandPrimary};
  border-color: ${p => p.theme.brandPrimary};
  border-radius: 10rem;
  &:hover,
  &:focus,
  &:active {
    background-color: ${p => p.theme.brandPrimaryHover};
    border-color: ${p => p.theme.brandPrimaryHover};
  }
  ${media.sm`
    display: inline-block;
    min-width: ${p => (p.withoutText ? '4.8rem' : '21rem')};
    padding: ${p => (p.withoutText ? '1.5rem 1.4rem' : '1.7rem 2rem 1.6rem')};
    width: auto;
    margin: 0 1.5rem 3rem 0;
    font-size: 1.6rem;
  `};
`;

const Counter = styled.span`
  margin-left: 0.7rem;
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  line-height: 1;
  background: hsla(0, 0%, 100%, 0.12);
  border-radius: 50%;
`;

export default props => (
  <Btn
    withoutText={props.withoutText}
    withCounter={props.filterCount !== 0}
    kind="primary"
    size="lg"
    onClick={props.toggle}
  >
    <StIcon withoutText={props.withoutText} icon="filter" />
    {!props.withoutText && <span styleName="textSm">Открыть фильтр</span>}
    {!!props.filterCount && <Counter>{props.filterCount}</Counter>}
  </Btn>
);
