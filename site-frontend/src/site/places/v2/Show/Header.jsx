import React from 'react';

import Breadcrumbs from './Breadcrumbs';

import UI from 'site/ui';
import placesSeo from 'site/config/seo/places';

import styled from 'styled-components';
import media from 'site/styles/media';

const {
  Grid: { Container },
  CountIndicator,
} = UI;

const Section = styled.section`
  position: relative;
  z-index: 0;
  margin: 0;
  padding: 3rem 0;
  background: url(${require('site/assets/images/black-pattern.svg')}) repeat #303030;
  background-size: 170%;
  min-height: 13rem;

  ${media.xs`
    padding: 5rem 0;
    background-size: 120%;
  `} ${media.sm`
    padding: 0.5rem 0;
    min-height: 21.5rem;
    background-size: 90%;
  `} ${media.md`
    min-height: 23rem;
    background-size: 50%;
  `};
`;

const Title = styled.h1`
  margin: 0;
  color: #f1f1f1;
  font-size: 2.2rem;
  line-height: 3rem;
  font-weight: 400;
  text-align: center;

  ${media.sm`
    margin-top: 5rem;
    font-size: 2.7rem;
  `};
`;

const Counter = styled.div`
  margin-top: 0.5rem;
  color: #f1f1f1;
  font-size: 1.4rem;
  font-weight: 300;
  text-align: center;

  ${media.sm`
    margin-top: 1rem;
    font-size: 1.6rem;
  `};
`;

export default props => {
  const { data = {}, placeKind, dealType, kind, totalProperties } = props;
  const metaItem =
    (data.meta && data.meta[(kind && `${dealType}_${kind}`) || dealType]) || {};
  const title =
    metaItem['h1'] || placesSeo[placeKind].show.h1(data, dealType, kind);

  return (
    <Section>
      <Container>
        <nav>
          <Breadcrumbs data={data} dealType={dealType} placeKind={placeKind} />
        </nav>
        <Title>{title}</Title>
        <Counter>
          <CountIndicator
            count={totalProperties}
            declensionForms={['объект', 'объекта', 'объектов']}
          />
        </Counter>
      </Container>
    </Section>
  );
};
