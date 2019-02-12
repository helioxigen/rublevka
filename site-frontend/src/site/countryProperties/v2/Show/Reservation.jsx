import React, { Component } from 'react';

import CurrentDutyCard from 'site/currentDuty/v2/Card';
import ReserveForm from 'site/request/ReserveFormTisa';

import { ShowXsSmMd, HideXsSmMd } from 'site/styles/mediaUtils';

import UI from 'site/ui';

import styled from 'styled-components';
import media from 'site/styles/media';

const {
  Grid: { Container, Row, Col },
} = UI;

const ReservationWrapper = styled.div`
  background: ${p => p.theme.bodyBg};
  width: 100%;
  padding: 2rem 0;

  ${media.sm`
  background: ${p => p.theme.brandWhite};
  padding: 3rem;
`} ${media.md`
    padding: 7rem;
  `};
`;

const ReserveWrapper = styled.div`
  text-align: center;
  padding: 1.5rem 2rem 2rem;

  ${media.lg`
    text-align: left;
  `};
`;

const ReserveTitle = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 1rem;

  ${media.sm`
    font-size: 2.2rem;
  `};
`;

const ReserveText = styled.p`
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: #000;
  margin: 0;

  ${media.sm`
    font-size: 1.6rem;
    line-height: 2.4rem;
  `};
`;

const DutyWrapper = styled.div`
  display: none;
  width: 100%;
  padding: 0;
  margin-top: 1rem;
  ${media.md`
    display: block;
    width: 100%;
  `};
`;

export default class extends Component {
  render() {
    const { data, dealType } = this.props;
    return (
      <Row>
        <ReservationWrapper>
          <Container>
            <Row xs="center">
              <ShowXsSmMd>
                <Col xs="12" sm="6" md="4">
                  <ReserveWrapper>
                    <ReserveTitle>Хотите посмотреть дом?</ReserveTitle>
                    <ReserveText>
                      Позвоните агенту или заполните форму и мы обязательно
                      свяжемся с вами в течении 10 минут
                    </ReserveText>
                  </ReserveWrapper>
                </Col>
              </ShowXsSmMd>
              <Col xs="12" md="4">
                <DutyWrapper>
                  <CurrentDutyCard propertyCategory="country" />
                </DutyWrapper>
              </Col>
              <Col xs="12" sm="6" md="4">
                <ReserveForm
                  propertyCategory="country"
                  propertyId={data.id}
                  dealType={dealType}
                />
              </Col>
              <HideXsSmMd>
                <Col xs="12" md="4">
                  <ReserveWrapper>
                    <ReserveTitle>Хотите посмотреть дом?</ReserveTitle>
                    <ReserveText>
                      Позвоните агенту или заполните форму и мы обязательно
                      свяжемся с вами в течении 10 минут
                    </ReserveText>
                  </ReserveWrapper>
                </Col>
              </HideXsSmMd>
            </Row>
          </Container>
        </ReservationWrapper>
      </Row>
    );
  }
}
