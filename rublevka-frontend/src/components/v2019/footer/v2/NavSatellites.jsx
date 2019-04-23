import React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router';

import UI from '../../../../ui/v2019';
import media from '../../../../styles/media';

const {
  Grid: { Row, Col },
} = UI;

export const Title = styled.h4`
  margin: 0;
  margin-top: 24px;
  line-height: 18px;
  font-size: 15px;
  text-transform: uppercase;

  color: #232323;
  text-align: left;

  ${media.xs`
    margin-top: 40px;
  `}

  ${media.md`
    margin-top: 24px;
  `}
`;

export const Navigation = styled.nav`
  text-align: left;
`;

export const StLink = styled(Link)`
  display: block;
  margin-bottom: 12px;

  line-height: 20px;
  font-size: 16px;

  color: #666666;

  &:hover,
  &:focus {
    color: ${p => p.theme.brandRed};
  }

  &:first-child {
    margin-top: 15px;
  }

  &:last-child {
    margin-bottom: 0px;
  }
`;

export default () => (
  <Row>
    <Col xs="12" sm="6" md="3">
      <Title>Купить</Title>
      <Navigation>
        <StLink to="/zagorodnaya/prodaja/dom">Дом</StLink>
        <StLink to="/zagorodnaya/prodaja/taunhaus">Таунхаус</StLink>
        <StLink to="/zagorodnaya/prodaja/kvartira">Квартира</StLink>
        <StLink to="/zagorodnaya/prodaja/uchastok">Участок</StLink>
      </Navigation>
    </Col>

    <Col xs="12" sm="6" md="3">
      <Title>Снять</Title>
      <Navigation>
        <StLink to="/zagorodnaya/arenda/dom">Дом</StLink>
        <StLink to="/zagorodnaya/arenda/taunhaus">Таунхаус</StLink>
        <StLink to="/zagorodnaya/arenda/kvartira">Квартира</StLink>
      </Navigation>
    </Col>

    <Col xs="12" sm="6" md="3">
      <Title>Прочее</Title>
      <Navigation>
        <StLink to="/zagorodnaya/kottedzhnye-poselki">Посёлки</StLink>
      </Navigation>
    </Col>

    <Col xs="12" sm="6" md="3">
      <Title>Компания</Title>
      <Navigation>
        <StLink to="/contacts">Контакты</StLink>
      </Navigation>
    </Col>
  </Row>
);
