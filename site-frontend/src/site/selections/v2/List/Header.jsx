import React from 'react';

import UI from 'site/ui';

import Breadcrumbs from './Breadcrumbs';

import styled from 'styled-components';
import media from 'site/styles/media';

const {
  Grid: { Container, Row, Col },
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
  margin-top: 2rem;
  color: #f1f1f1;
  font-size: 2.2rem;
  line-height: 3rem;
  font-weight: 400;
  text-align: center;

  ${media.sm`
    margin-top: 2rem;
    font-size: 2.7rem;
  `};
`;

const Description = styled.p`
  margin-top: 2rem;
  color: #f1f1f1;
  font-size: 1.6rem;
  line-height: 2.2rem;
  text-align: center;
  display: none;

  ${media.sm`
    display: block;
    margin-bottom: 4rem;
    font-size: 1.6rem;
    line-height: 2.4rem;
  `};
`;

export default props => {
  const { data = {} } = props;

  return (
    <Section>
      <Container>
        <nav>
          <Breadcrumbs data={data} />
        </nav>
        <Row xs="center">
          <Col xs="12" sm="8">
            <Title>{data.name}</Title>
            <Description>{data.description}</Description>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};
