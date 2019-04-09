import React from 'react';

import UI from 'ui';

import {
  ImgMobile,
  TitleBgMobile,
  SubTitleTablet,
  TitleMobile,
  StLinkMobile,
  RoutesWrapper,
} from './styled';

const {
  Grid,
  Grid: { Row, Col },
} = UI;

export default () => (
  <RoutesWrapper>
    <TitleMobile>Популярные направления</TitleMobile>
    <SubTitleTablet>
      Хорошая экология, развитая инфраструктура, прекрасные ландшафты
    </SubTitleTablet>
    <Grid.Container>
      <Row>
        <Col xs="12" sm="6">
          <StLinkMobile to="/zagorodnaya/shosse/rublevo-uspenskoe_1178/prodaja/">
            <ImgMobile bgUrl="https://s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/rublevskoe.jpg">
              <TitleBgMobile>Рублево-Успенское</TitleBgMobile>
            </ImgMobile>
          </StLinkMobile>
        </Col>

        <Col xs="12" sm="6">
          <StLinkMobile to="/zagorodnaya/shosse/novorijskoe_1186/prodaja/">
            <ImgMobile bgUrl="https://s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/novorijskoe.jpg">
              <TitleBgMobile>Новорижское</TitleBgMobile>
            </ImgMobile>
          </StLinkMobile>
        </Col>

        <Col xs="12" sm="6">
          <StLinkMobile to="/zagorodnaya/shosse/ilinskoje_1192/prodaja">
            <ImgMobile bgUrl={require('site/assets/images/ilinskoe.jpg')}>
              <TitleBgMobile>Ильинское</TitleBgMobile>
            </ImgMobile>
          </StLinkMobile>
        </Col>

        <Col xs="12" sm="6">
          <StLinkMobile to="/zagorodnaya/shosse/mynskoe_1179/prodaja">
            <ImgMobile bgUrl="https://s3.eu-central-1.amazonaws.com/dt-marketing/hero-images/kievskoe.jpg">
              <TitleBgMobile>Минское</TitleBgMobile>
            </ImgMobile>
          </StLinkMobile>
        </Col>
      </Row>
    </Grid.Container>
  </RoutesWrapper>
);
