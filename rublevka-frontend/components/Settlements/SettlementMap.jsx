import React, { useState } from 'react';
import styled from 'styled-components';
import { Map } from 'react-yandex-maps';

import { NavigatorBox } from '@components/UI/atoms';
import { coords, media } from '@utils';

function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

const SettlementMap = ({ className, name, location }) => {
    const [minutesFromMkad, setMinutesFromMkad] = useState(20);

    let mapRef;

    // console.log('settlemtn:', settlement);

    const [latitude, longitude] = [parseFloat(location.latitude), parseFloat(location.longitude)];

    const onLoad = ymaps => {
        // we need to get nearest mkad km
        const nearestMkadKm = coords.mkad.getNearestMkadPoint(latitude, longitude);

        ymaps
            .route([
                { type: 'wayPoint', point: [nearestMkadKm[2], nearestMkadKm[1]] },
                { type: 'wayPoint', point: [latitude, longitude] },
            ])
            .then(route => {
                try {
                    route.options.set('mapStateAutoApply', true);
                    const points = route.getWayPoints();
                    const lastPoint = points.getLength() - 1;

                    points.options.set('preset', 'islands#redStretchyIcon');
                    points.get(0).properties.set('iconContent', 'МКАД');
                    points.get(lastPoint).properties.set('iconContent', name);
                    const duration = route.getJamsTime();

                    setMinutesFromMkad(Math.round(duration / 60));

                    route.getPaths().options.set({
                        opacity: 0.9,
                    });
                    mapRef.geoObjects.add(route);
                } catch (ex) {
                    //
                }
            });
    };

    return (
        <div className={className}>
            <h2>
                {minutesFromMkad} {declOfNum(minutesFromMkad, ['минута', 'минуты', 'минут'])} от МКАД
            </h2>
            <p>
                Посёлок находится по адресу: <br />
                {location.routeName} шоссе, {location.mkadDistance}-й километр
            </p>
            <div style={{ position: 'relative' }}>
                <Map
                    instanceRef={ref => {
                        if (ref) {
                            mapRef = ref;
                            ref.behaviors.disable('scrollZoom');
                        }
                    }}
                    onLoad={ymaps => onLoad(ymaps)}
                    modules={['templateLayoutFactory', 'route']}
                    defaultState={{ center: [latitude, longitude], zoom: 14, controls: [] }}
                    className="map-container"
                >
                    <NavigatorBox minutes={minutesFromMkad} toName={name} />
                </Map>
            </div>
        </div>
    );
};

export default styled(SettlementMap)`
    > p {
        margin-bottom: 40px;
    }

    .map-container {
        width: 100%;
        height: 360px;

        ${media.desktop.at(
            css => css`
                height: 640px;
            `
        )}
    }
`;
