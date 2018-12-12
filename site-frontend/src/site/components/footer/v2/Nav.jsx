import React, { Component } from 'react';

import UI from 'site/ui';

import List from './List';

import { Title, SubTitle, Navigation, NavColumn, TitleLink, StLink, Divider } from './styled';

const { Grid: { Container, Row, Col } } = UI;

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowMobile: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      isShowMobile: !prevState.isShowMobile,
    }));
  }

  render() {
    return (
      <section>
        <Container>
          <Row>
            <Col sm="6" lg="3">
              <Title>JQ Estate</Title>
              <Divider />
              <Navigation>
                <StLink to="/podborky/spetspredlozhenyia_10">Спецпредложения</StLink>
                <StLink to="/about">О компании</StLink>
                <StLink to="/agents">Агенты</StLink>
                <StLink to="/contacts">Контакты</StLink>
              </Navigation>
            </Col>

            <Col sm="6" lg="6">
              <Title>Загородная недвижимость</Title>
              <Divider />

              <Row>
                <Col xs="12" sm="6" lg="4">
                  <SubTitle to="/zagorodnaya/prodaja">Купить</SubTitle>

                  <StLink to="/zagorodnaya/prodaja/dom">Дома</StLink>
                  <StLink to="/zagorodnaya/prodaja/taunhaus">Таунхаусы</StLink>
                  <StLink to="/zagorodnaya/prodaja/kvartira">Квартиры</StLink>
                  <StLink to="/zagorodnaya/prodaja/uchastok">Земельные участки</StLink>
                </Col>

                <Col xs="12" sm="6" lg="6">
                  <SubTitle to="/zagorodnaya/arenda">Снять</SubTitle>

                  <StLink to="/zagorodnaya/arenda/dom">Дома</StLink>
                  <StLink to="/zagorodnaya/arenda/taunhaus">Таунхаусы</StLink>
                  <StLink to="/zagorodnaya/arenda/kvartira">Квартиры</StLink>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col sm="6" md="4" lg="3">
              <NavColumn>
                <TitleLink to="/zagorodnaya/shosse/rublevo-uspenskoe_1178/prodaja">
                  Рублёво-Успенское
                </TitleLink>
                <Divider />
                <List group="rublevka" />
              </NavColumn>
            </Col>

            <Col sm="6" md="4" lg="3">
              <NavColumn>
                <TitleLink to="/zagorodnaya/shosse/novorijskoe_1186/prodaja">Новорижское</TitleLink>
                <Divider />
                <List group="riga" />
              </NavColumn>
            </Col>

            <Col sm="6" md="4" lg="3">
              <NavColumn>
                <TitleLink to="/zagorodnaya/shosse/kyevskoe_1177/prodaja">Киевское</TitleLink>
                <Divider />
                <List group="kievka" />
              </NavColumn>
            </Col>

            <Col sm="6" md="4" lg="3">
              <NavColumn>
                <TitleLink to="/zagorodnaya/shosse/mynskoe_1179/prodaja">Минское</TitleLink>
                <Divider />
                <List group="minka" />
              </NavColumn>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Nav;
