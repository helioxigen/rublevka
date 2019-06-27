import React, { Component } from 'react';
import styled from 'styled-components';
import global from 'window-or-global';

import UI from 'ui';
import media from 'styles/media';

import Breadcrumbs from '../../Breadcrumbs';
import Form from './Form';

import bgImg from './img/bg.png';

const {
  Grid: { Container, Col },
} = UI;

export const Wrapper = styled.div`
  background-image: url(${bgImg});
  background-size: cover;
`;

export const Header = styled.h1`
  margin: 0;
  padding-top: 40px;
  line-height: 38px;
  font-size: 28px;
  text-align: center;
  font-weight: bold;

  color: #ffffff;

  ${media.xs`
    line-height: 48px;
    font-size: 40px;

    text-shadow: 0px 0px 25px rgba(0, 0, 0, 0.35);
  `}

  ${media.md`
    margin-top: 64px;
    line-height: 58px;
    font-size: 48px;
    text-shadow: 0px 0px 35px rgba(0, 0, 0, 0.59);
  `}
`;

export const FormWrapper = styled.div`
  padding-top: 24px;
  padding-bottom: 48px;
  margin: 0 -15px;

  ${media.xs`
    padding-bottom: 72px;
  `}

  ${media.md`
    margin: 0;
    padding-top: 32px;
    padding-bottom: 170px;
  `}
`;

const isRiga = global.config.domain === 'riga.ru';

export default ({ settlements = {} }) => (
  <Wrapper>
    <Container>
      <Breadcrumbs />
      <Header>Посёлки на {isRiga ? 'Новой Риге' : 'Рублёвке'}</Header>
      <Col mdOffset="1" xs="12" md="10">
        <FormWrapper>
          <Form settlementsList={Object.values(settlements)} />
        </FormWrapper>
      </Col>
    </Container>
  </Wrapper>
);
