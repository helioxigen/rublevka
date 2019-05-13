import React from 'react';
import styled from 'styled-components';

import global from 'window-or-global';

import { connect } from 'react-redux';
import { updateDisplayOption } from '../displayOptions/actions';

import StaticMask from '../core/components/ui/staticMask';

import Footer from './footer/index';
import CallbackModal from '../request/CallbackModal';

import UI from '../ui/v2019';
import media from '../styles/media';

import blackPattern from '../assets/images/black-pattern.svg';

const isRiga = global.config.domain === 'riga.ru';

const {
  Icon,
  Grid: { Container, Row, Col },
  Button,
} = UI;

const currencies = [
  {
    value: 'eur',
    label: 'EUR – €',
  },
  {
    value: 'usd',
    label: 'USD – $',
  },
  {
    value: 'rub',
    label: 'RUB – ₽',
  },
];

const Wrapper = styled.footer`
  position: relative;
  z-index: 2;
  padding: 6rem 0;
  background-size: 130%;
  background: ${p => p.hasPattern && `url(${blackPattern}) repeat`} #303030;

  ${media.sm`
    padding: 8rem 0 0.5rem;
    background-size: 50%;
  `};

  ${media.lg`
    background-size: 40%;
  `};
`;

const WrapperSatellites = styled.footer`
  position: relative;
  padding-bottom: 64px;
  background-color: ${p => p.theme.brandWhite};

  ${media.xs`
    border-top: 1px solid rgba(216, 216, 216, 0.5);
  `}
`;

const Divider = styled.hr`
  margin: 4rem 0 4rem;
  border-color: #3e4549;

  ${media.sm`
    margin-top: 5.5rem;
  `};
`;

const DividerSatellites = styled.hr`
  margin: 32px 0px;
  border-color: rgba(216, 216, 216, 0.5);
`;

const AboutContainer = styled.div`
  display: block;

  ${media.sm`
    vertical-align: top;
    display: inline-block;
  `};
`;

const ColLeft = styled(Col)`
  margin-bottom: 3.5rem;
`;

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

const InnerWrapper = styled.div`
  margin: 0 -10px;

  ${media.md`
    margin: 0;
  `}
`;

const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;

  ${media.xs`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `}
`;

const LogoSatellites = styled(Icon)`
  width: ${isRiga ? 63 : 131}px;
  height: 20px;
  fill: #666666;
`;

// const CopySatellites = styled.p`
//   margin: 0;
//   margin-top: 12;
//   line-height: 16px;
//   font-size: 12px;
//   color: #666666;
// `;

// const Bold = styled.span`
//   font-weight: bold;
// `;

const ValueSelector = styled.select`
  margin: 0;
  margin-bottom: 32px;
  order: -1;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.0001);
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  cursor: pointer;

  font-size: 15px;
  font-weight: bold;
  line-height: 18px;
  text-transform: uppercase;
  color: #232323;

  appearance: none;

  ${media.xs`
    margin-bottom: 0;
    order: unset;
  `}
`;

const DescriptionWhite = Description.extend`
  color: ${p => p.theme.brandWhite};
`;

const isJQ = global.config.domain === 'jq.estate';

const FooterContainer = ({
  displayOptions: { currency },
  dispatch,
  params,
}) => {
  if (isJQ) {
    return (
      <Wrapper hasPattern={isJQ}>
        <Footer.Nav />

        <Container>
          <Divider />

          <Row>
            <ColLeft sm="8" md="5">
              <AboutContainer>
                <Title>JQ ESTATE</Title>
                <DescriptionWhite>
                  Агентство элитной недвижимости, работаем с 2006 года
                </DescriptionWhite>

                <Description>
                  <Brand>ОOО «Рублевка»</Brand>
                  <Break /> ОГРН 5137746069687
                </Description>
              </AboutContainer>
            </ColLeft>

            <ColRight sm="4" md="7">
              <Phone
                href={`tel:+${global.config.phones.country}`}
                id="comagicDTPhoneNumber"
              >
                <StaticMask pattern="+1 (111) 111-11-11">
                  {global.config.phones.country}
                </StaticMask>
              </Phone>
              <CallbackModal propertyCategory={params && params.category}>
                <StButton size="sm" kind="primary">
                  Обратный звонок
                </StButton>
              </CallbackModal>

              <Footer.Social />
            </ColRight>
          </Row>
        </Container>
      </Wrapper>
    );
  }

  return (
    <WrapperSatellites>
      <Container>
        <Col lg="8" lgOffset="2">
          <InnerWrapper>
            <Footer.NavSatellites />
            <DividerSatellites />
            <BottomBlock>
              <LogoSatellites icon={global.config.brand} />
              <ValueSelector
                value={currency}
                onChange={e =>
                  dispatch(updateDisplayOption('currency', e.target.value))
                }
              >
                {currencies.map(el => (
                  <option selected={currency === el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </ValueSelector>
            </BottomBlock>
          </InnerWrapper>
        </Col>
      </Container>
    </WrapperSatellites>
  );
};

const pickState = (state) => {
  const { displayOptions } = state;

  return { displayOptions };
};

export default connect(pickState)(FooterContainer);
