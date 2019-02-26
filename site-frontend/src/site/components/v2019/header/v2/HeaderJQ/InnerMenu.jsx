import React from 'react';

import { Link } from 'react-router';

import UI from 'site/ui';

import styled from 'styled-components';
import media from 'site/styles/media';

const {
  Grid,
  Grid: { Row, Col },
} = UI;

export const Nav = styled.nav`
  position: static;
  margin-top: 2.5rem;
  padding: 0;
  display: none;
  background: ${p => p.theme.brandWhite};

  ${media.sm`
    position: absolute;
    top: 8rem;
    right: 0;
    left: 0;
    z-index: 20;
    margin-top: 0;
    padding: 2.5rem 0;
    border-top: 1px solid ${p => p.theme.grey};
    border-bottom: 1px solid ${p => p.theme.grey};
    display: block;
    visibility: hidden;
    opacity: 0;
  `};
`;

const Wrapper = styled.img`
  ${media.sm`
    padding: 0 .5rem;
  `} ${media.md`
    padding: 0 2rem;
  `};
`;

const StLink = styled(Link)`
  display: inline-block;
  text-align: center;
  margin: 0 2rem;
  cursor: pointer;
  ${media.sm`
    margin: 0 1.2rem;
    vertical-align: text-top;
  `} ${media.md`
    margin: 0 1.4rem;
  `} ${media.lg`
    margin: 0 1.6rem;
  `} &:hover > span {
    color: ${p => p.theme.brandPrimary};
  }
`;

const Img = styled.img`
  ${media.sm`
    width: 120px;
    height: 67px;
    border-radius: 4px;
  `} ${media.md`
    width: 140px;
    height: 78px;
  `} ${media.lg`
    width: 180px;
    height: 100px;
  `};
`;

const Sale = styled.div`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    opacity: 0.5;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(${require('site/assets/images/white-pattern.svg')}) repeat;
    background-size: 180%;
  }

  ${media.sm`
    width: 120px;
    height: 67px;
    border-radius: 4px;
    background: ${p => p.theme.brandSuccess};
    color: ${p => p.theme.brandWhite};
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    margin-bottom: 5px;
    
  `} ${media.md`
    width: 140px;
    height: 78px;
  `} ${media.lg`
    width: 180px;
    height: 100px;
  `};
`;

const Text = styled.span`
  display: block;
  font-size: 16px;
  color: ${p => p.theme.greyDark};
  ${media.sm`
    font-size: 14px;
  `} ${media.lg`
    font-size: 16px;
  `};
`;

export default props => (
  <Nav>
    <Grid.Container>
      <Row>
        <Col xs="12">
          <Wrapper>
            <StLink
              activeClassName="active"
              to={`/zagorodnaya/${props.dealType}/dom`}
            >
              <Img
                src="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/jqestate.ru/menu-houses.jpg"
                srcSet="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/jqestate.ru/menu-houses@2x.jpg 2x"
                alt="Дома"
              />
              <Text>Дома</Text>
            </StLink>
            {props.dealType === 'prodaja' && (
              <StLink to={`/zagorodnaya/${props.dealType}/uchastok`}>
                <Img
                  src="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/jqestate.ru/menu-lands.jpg"
                  srcSet="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/jqestate.ru/menu-lands@2x.jpg 2x"
                  alt="Участки"
                />
                <Text>Участки</Text>
              </StLink>
            )}
            <StLink to={`/zagorodnaya/${props.dealType}/taunhaus`}>
              <Img
                src="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/jqestate.ru/menu-townhouses.jpg"
                srcSet="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/jqestate.ru/menu-townhouses@2x.jpg 2x"
                alt="Таунхаусы"
              />
              <Text>Таунхаусы</Text>
            </StLink>
            <StLink to={`/zagorodnaya/${props.dealType}/kvartira`}>
              <Img
                src="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/jqestate.ru/menu-flats.jpg"
                srcSet="https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/jqestate.ru/menu-flats@2x.jpg 2x"
                alt="Квартиры"
              />
              <Text>Квартиры</Text>
            </StLink>
            {props.dealType === 'arenda' && (
              <StLink to={`/zagorodnaya/${props.dealType}/ofis`}>
                <Img
                  src={require('site/assets/images/menu-office.jpg')}
                  srcSet={`${require('site/assets/images/menu-office@2x.jpg')} 2x`}
                  alt="Офисы"
                />
                <Text>Офисы</Text>
              </StLink>
            )}
            <StLink to="/podborky/spetspredlozhenyia_10">
              <Sale>Sale</Sale>
              <Text>Спецпредложения</Text>
            </StLink>
          </Wrapper>
        </Col>
      </Row>
    </Grid.Container>
  </Nav>
);
