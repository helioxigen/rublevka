import React from 'react';
import styled from 'styled-components';
import { YMaps, Map as YMap, Placemark } from 'react-yandex-maps';

import media from 'site/styles/media';

import UI from 'site/ui';
const {
  Grid: { Container },
} = UI;

const Wrapper = styled.div`
  margin: 0 -15px;
  margin-top: 40px;

  ${media.xs`
    margin: 0;
    margin-top: 40px;
    padding-bottom: 32px;
  `}

  ${media.md`
    margin-top: 60px;
    padding-bottom: 72px;
  `};
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h3`
  margin: 0;
  line-height: 32px;
  font-size: 24px;
  color: #232323;

  ${media.xs`
    line-height: 48px;
    font-size: 40px;
  `}

  ${media.md`
    line-height: 56px;
    font-size: 48px;
  `}
`;

const Body = styled.p`
  margin: 0;
  line-height: 24px;
  font-size: 15px;
  color: #232323;
  margin-top: 12px;

  ${media.xs`
    margin-top: 16px;
    line-height: 28px;
    font-size: 18px;
  `}

  ${media.md`
    line-height: 34px;
    font-size: 21px;
  `}
`;

const BoldText = styled(Body)`
  margin-top: 0;
  margin-bottom: 16px;

  ${media.xs`
    margin-bottom: 24px;
  `}

  ${media.xs`
    font-weight: bold;
    margin-bottom: 32px;
  `}
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;

  ${media.xs`
    height: 522px;
  `}

  ${media.lg`
    height: 640px;
  `}
`;

export default () => (
  <Container>
    <Wrapper>
      <TextContainer>
        <Heading>Как нас найти</Heading>
        <Body>Наш офис находится по адресу:</Body>
        <BoldText>Рублёво-Успенское шоссе, Жуковка, 48A, 3 этаж</BoldText>
      </TextContainer>
      <MapContainer>
        <YMaps>
          <YMap
            instanceRef={ref => ref && ref.behaviors.disable('scrollZoom')}
            defaultState={{ center: [55.734871, 37.249479], zoom: 15 }}
            width="100%"
            height="100%"
          >
            <Placemark geometry={[55.734871, 37.249479]} />
          </YMap>
        </YMaps>
      </MapContainer>
    </Wrapper>
  </Container>
);
