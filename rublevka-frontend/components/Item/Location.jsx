import React from 'react';
import styled from 'styled-components';
import { Map, Circle, FullscreenControl, ZoomControl } from 'react-yandex-maps';
import { media, sc } from '@utils';

const Location = ({ className, latitude, longitude }) => (
    <Map
        className={className}
        instanceRef={ref => ref && ref.behaviors.disable('scrollZoom')}
        defaultState={{ center: [latitude, longitude], zoom: 15, controls: [] }}
    >
        <Circle
            geometry={[[latitude, longitude], 200]}
            options={{
                draggable: false,
                fillColor: sc.theme.colors.red,
                strokeColor: sc.theme.colors.red,
                fillOpacity: 0.2,
                strokeOpacity: 0.5,
                strokeWidth: 2,
            }}
        />
        <FullscreenControl />
        <ZoomControl options={{ float: 'right' }} />
    </Map>
);

export default styled(Location)`
    width: 100%;
    height: 240px;

    ${media.sm`
        height: 420px;
    `}
`;
