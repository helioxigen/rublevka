import React from 'react';

import UI from 'site/ui';

import { Title, Navigation, StLink, Divider } from './styled';

const {
  Grid: { Container, Row, Col },
} = UI;

export default () => (
  <Container>
    <Row>
      <Col sm="3">
        <Title>Купить</Title>
        <Divider />
        <Navigation>
          <StLink to="/zagorodnaya/prodaja/dom">Дом</StLink>
          <StLink to="/zagorodnaya/prodaja/taunhaus">Таунхаус</StLink>
          <StLink to="/zagorodnaya/prodaja/kvartira">Квартира</StLink>
          <StLink to="/zagorodnaya/prodaja/uchastok">Участок</StLink>
        </Navigation>
      </Col>

      <Col sm="3">
        <Title>Снять</Title>
        <Divider />
        <Navigation>
          <StLink to="/zagorodnaya/arenda/dom">Дом</StLink>
          <StLink to="/zagorodnaya/arenda/taunhaus">Таунхаус</StLink>
          <StLink to="/zagorodnaya/arenda/kvartira">Квартира</StLink>
        </Navigation>
      </Col>

      <Col sm="3">
        <Title>Прочее</Title>
        <Divider />
        <Navigation>
          <StLink to="/zagorodnaya/kottedzhnye-poselki">Посёлки</StLink>
        </Navigation>
      </Col>

      <Col sm="3">
        <Title>Компания</Title>
        <Divider />
        <Navigation>
          <StLink to="/contacts">Контакты</StLink>
        </Navigation>
      </Col>
    </Row>
  </Container>
);
