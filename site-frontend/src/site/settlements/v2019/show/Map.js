import React from 'react';
import styled from 'styled-components';
import { YMaps, Map as YMap, Placemark } from 'react-yandex-maps';

import media from '../../../styles/media';
import UI from '../../../ui';

const {
  Grid: { Container },
} = UI;

const Wrapper = styled.div`
  margin: 0 -15px;
  padding-top: 40px;

  ${media.xs`
    margin: 0;
    padding: 40px 0px;
  `}

  ${media.md`
    padding: 48px 0px;
  `}
`;

const Heading = styled.p`
  margin: 0;
  text-align: center;
  color: #232323;
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;

  ${media.xs`
    font-size: 28px;
    line-height: 36px;
  `}

  ${media.md`
    font-size: 32px;
    line-height: 38px;
  `}
`;

const Body = styled.p`
  margin: 0;
  margin-top: 12px;
  text-align: center;
  color: #232323;
  font-size: 15px;
  line-height: 24px;

  ${media.xs`
    font-size: 16px;
  `}

  ${media.md`    
    margin-top: 16px;
    line-height: 26px;
  `}
`;

const Address = styled(Body)`
  padding: 0 15px;
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: bold;

  ${media.xs`
    padding: 0;
    margin-bottom: 24px;
  `}

  ${media.md`    
    margin-top: 0;
    margin-bottom: 32px;
  `}
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;

  ${media.xs`
    height: 420px;
  `}

  ${media.md`
    height: 640px;
  `}
`;

export default ({
  location: {
    routeName, localityName, districtName, longitude, latitude,
  },
}) => (
  <Container>
    <Wrapper>
      <Heading>Расположение</Heading>
      <Body>Посёлок находится по адресу:</Body>
      <Address>{`${routeName} шоссе, ${districtName} район, ${localityName}`}</Address>
      <MapContainer>
        <YMaps>
          <YMap
            instanceRef={ref => ref && ref.behaviors.disable('scrollZoom')}
            defaultState={{
              center: [latitude, longitude],
              zoom: 13,
            }}
            width="100%"
            height="100%"
          >
            <Placemark geometry={[latitude, longitude]} />
          </YMap>
        </YMaps>
      </MapContainer>
    </Wrapper>
  </Container>
);
