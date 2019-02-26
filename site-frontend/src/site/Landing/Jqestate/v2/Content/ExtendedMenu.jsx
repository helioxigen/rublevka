import React, { Component } from 'react';

import { connect } from 'react-redux';

import { ShowXsSmMd } from 'site/styles/mediaUtils';

import UI from 'site/ui';

import {
  MenuCol,
  BlockWrapper,
  Img,
  Links,
  TitleLink,
  TitleBgMobile,
  StLink,
  StLinkLast,
  StLinkRent,
  StLinkRentLast,
  Counter,
  TotalCounter,
} from './styled';

const {
  Grid: { Col },
  CountIndicator,
} = UI;

class ExtendedMenu extends Component {
  render() {
    const { stats = {} } = this.props;
    const { country = {} } = stats;

    const countrySale = country.sale || {};
    const countryRent = country.rent || {};

    return (
      <MenuCol xs="12">
        <Col xs="12" sm="6">
          <BlockWrapper>
            <Img bgUrl="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/jqestate.ru/mainpage-sale.jpg">
              <ShowXsSmMd>
                <TitleBgMobile>Продажа</TitleBgMobile>
                <TotalCounter>
                  <CountIndicator
                    count={
                      countrySale.house +
                      countrySale.land +
                      countrySale.townhouse +
                      countrySale.flat
                    }
                    declensionForms={[
                      'предложение',
                      'предложения',
                      'предложений',
                    ]}
                  />
                </TotalCounter>
              </ShowXsSmMd>
            </Img>
            <Links>
              <TitleLink to="/zagorodnaya/prodaja/">Купить</TitleLink>
              <StLink to="/zagorodnaya/prodaja/dom">
                Дома <Counter>{countrySale.house}</Counter>
              </StLink>
              <StLink to="/zagorodnaya/prodaja/uchastok">
                Участки <Counter>{countrySale.land}</Counter>
              </StLink>
              <StLink to="/zagorodnaya/prodaja/taunhaus">
                Таунхаусы <Counter>{countrySale.townhouse}</Counter>
              </StLink>
              <StLinkLast to="/zagorodnaya/prodaja/kvartira">
                Квартиры <Counter>{countrySale.flat}</Counter>
              </StLinkLast>
            </Links>
          </BlockWrapper>
        </Col>

        <Col xs="12" sm="6">
          <BlockWrapper>
            <Img bgUrl={require('site/assets/images/mainpage-rent.jpg')}>
              <ShowXsSmMd>
                <TitleBgMobile>Аренда</TitleBgMobile>
                <TotalCounter>
                  <CountIndicator
                    count={
                      countryRent.house +
                      countryRent.townhouse +
                      countryRent.flat
                    }
                    declensionForms={[
                      'предложение',
                      'предложения',
                      'предложений',
                    ]}
                  />
                </TotalCounter>
              </ShowXsSmMd>
            </Img>
            <Links>
              <TitleLink to="/zagorodnaya/arenda/">Снять</TitleLink>
              <StLinkRent to="/zagorodnaya/arenda/dom">
                Дома <Counter>{countryRent.house}</Counter>
              </StLinkRent>
              <StLinkRent to="/zagorodnaya/arenda/taunhaus">
                Таунхаусы <Counter>{countryRent.townhouse}</Counter>
              </StLinkRent>
              <StLinkRent to="/zagorodnaya/arenda/kvartira">
                Квартиры <Counter>{countryRent.flat}</Counter>
              </StLinkRent>
              <StLinkRentLast to="/zagorodnaya/arenda/ofis">
                Офисы <Counter>{countryRent.office}</Counter>
              </StLinkRentLast>
            </Links>
          </BlockWrapper>
        </Col>
      </MenuCol>
    );
  }
}

// redux connectors
const mapStateToProps = state => ({ stats: state.stats });

export default connect(mapStateToProps)(ExtendedMenu);
