import React from 'react';
import styled from 'styled-components';
import { YMaps, Map as YMap, Circle } from 'react-yandex-maps';

import { WrapperBase as Wrapper, Title } from './styled';
import media from '../../../styles/media';

const MapContainer = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 240px;

  ${media.xs`
    margin-top: 16px;
  `}

  ${media.sm`
    height: 420px;
  `}
`;

export default ({ markerPosition: { longitude, latitude } }) => (
  <Wrapper>
    <Title>Объект на карте</Title>
    <MapContainer>
      <YMaps>
        <YMap
          instanceRef={ref => ref && ref.behaviors.disable('scrollZoom')}
          defaultState={{ center: [latitude, longitude], zoom: 15 }}
          width="100%"
          height="100%"
        >
          <Circle
            geometry={[[latitude, longitude], 200]}
            options={{
              draggable: false,
              fillColor: '#F44336',
              strokeColor: '#F44336',
              fillOpacity: 0.2,
              strokeOpacity: 0.5,
              strokeWidth: 2,
            }}
          />
        </YMap>
      </YMaps>
    </MapContainer>
  </Wrapper>
);
