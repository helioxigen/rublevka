import React, { Component } from 'react';

import global from 'window-or-global';

import StaticMask from 'core/components/ui/staticMask';

import Footer from 'site/components/footer/index';
import CallbackModal from 'site/request/CallbackModal';

import UI from 'site/ui';

import styled from 'styled-components';
import media from 'site/styles/media';

const { Grid: { Container, Row, Col }, Button } = UI;

const Wrapper = styled.footer`
  position: relative;
  z-index: 2;
  padding: 6rem 0;
  background-size: 130%;
  background: ${p =>
      p.hasPattern && `url(${require('site/assets/images/black-pattern.svg')}) repeat`}
    #303030;

  ${media.sm`
    padding: 8rem 0 0.5rem;
    background-size: 50%;
  `};

  ${media.lg`
    background-size: 40%;
  `};
`;

const Divider = styled.hr`
  margin: 4rem 0 4rem;
  border-color: #3e4549;

  ${media.sm`
    margin-top: 5.5rem;
  `};
`;

const AboutContainer = styled.div`
  display: block;

  ${media.sm`
    vertical-align: top;
    display: inline-block;
  `};
`;

const ColLeft = styled(Col)`margin-bottom: 3.5rem;`;

const ColRight = styled(Col)`
  text-align: left;
  margin-bottom: 2.5rem;

  ${media.sm`
    text-align: right;
  `};

  ${media.sm`
    margin-bottom: 0;
  `};
`;

const Title = styled.p`
  margin: 0;
  color: ${p => p.theme.brandWhite};
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1;
  text-transform: uppercase;
`;

const Description = styled.p`
  margin: 0;
  margin-top: 2rem;
  color: #7d8487;
  line-height: 2.2rem;

  ${media.sm`
    line-height: 1;
  `};
`;

const Phone = styled.a`
  display: block;
  color: ${p => p.theme.brandWhite};
  font-size: 1.7rem;
  font-weight: 300;
  text-decoration: none;
  margin-bottom: 2.5rem;
  &:hover,
  &:focus {
    color: ${p => p.theme.brandWhite};
    text-decoration: none;
  }

  ${media.sm`
    display: inline-block;
    vertical-align: middle;
  `};

  ${media.md`
    margin-bottom: 0;
  `};
`;

const StButton = styled(Button)`
  color: ${p => p.theme.brandWhite};
  background: ${p => p.theme.brandSuccess};
  border-color: ${p => p.theme.brandSuccess};
  border-radius: 10rem;
  margin-bottom: 2.5rem;

  &:hover,
  &:focus {
    color: ${p => p.theme.brandWhite};
  }

  &:hover {
    background: ${p => p.theme.brandSuccessHover};
    border-color: ${p => p.theme.brandSuccessHover};
  }

  &:focus {
    background: ${p => p.theme.brandSuccessFocus};
    border-color: ${p => p.theme.brandSuccessFocus};
  }

  ${media.sm`
    margin-left: 3rem;
  `};

  ${media.sm`
    margin-bottom: 0;
  `};
`;

const Brand = styled.span`
  ${media.sm`
    margin-right: 2rem;
  `};
`;

const Break = styled.br`
  display: block;

  ${media.sm`
    display: none;
  `};
`;

const DescriptionWhite = Description.extend`color: ${p => p.theme.brandWhite};`;

const isJQ = global.config.domain === 'jq.estate';

class FooterContainer extends Component {
  render() {
    return (
      <Wrapper hasPattern={isJQ}>
        {isJQ && <Footer.Nav />}

        {!isJQ && <Footer.NavSatellites />}

        <Container>
          <Divider />

          <Row>
            <ColLeft sm="8" md="5">
              <AboutContainer>
                {isJQ && <Title>JQ ESTATE</Title>}
                {!isJQ && <Title>{global.config.domain}</Title>}
                <DescriptionWhite>
                  Агентство элитной недвижимости, работаем с 2006 года
                </DescriptionWhite>

                {isJQ && (
                  <Description>
                    <Brand>ОOО «Рублевка»</Brand>
                    <Break /> ОГРН 5137746069687
                  </Description>
                )}
              </AboutContainer>
            </ColLeft>

            <ColRight sm="4" md="7">
              <Phone href={`tel:+${global.config.phones.country}`} id="comagicDTPhoneNumber">
                <StaticMask pattern="+1 (111) 111-11-11">{global.config.phones.country}</StaticMask>
              </Phone>
              <CallbackModal propertyCategory={this.props.params && this.props.params.category}>
                <StButton size="sm" kind="primary">
                  Обратный звонок
                </StButton>
              </CallbackModal>

              {isJQ && <Footer.Social />}
            </ColRight>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default FooterContainer;
