import React, { useState } from 'react';
import styled from 'styled-components';
import { Map } from 'react-yandex-maps';

import { NavigatorBox } from '@components/UI/atoms';
import { coords, media } from '@utils';

function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

const SettlementMap = ({ className, settlement }) => {
    const [minutesFromMkad, setMinutesFromMkad] = useState(20);

    let mapRef;

    // console.log('settlemtn:', settlement);

    const location = [settlement.location.latitude, settlement.location.longitude];

    const onLoad = ymaps => {
        // we need to get nearest mkad km
        const nearestMkadKm = coords.mkad.getNearestMkadPoint(location[0], location[1]);

        ymaps
            .route([
                { type: 'wayPoint', point: [nearestMkadKm[2], nearestMkadKm[1]] },
                { type: 'wayPoint', point: location },
            ])
            .then(route => {
                try {
                    const points = route.getWayPoints();
                    const lastPoint = points.getLength() - 1;

                    points.options.set('preset', 'islands#redStretchyIcon');
                    points.get(0).properties.set('iconContent', 'МКАД');
                    points.get(lastPoint).properties.set('iconContent', settlement.name);
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
                {settlement.location.routeName} шоссе, {settlement.location.mkadDistance}-й километр
            </p>
            <br />
            <div style={{ position: 'relative' }}>
                <Map
                    instanceRef={ref => {
                        if (ref) {
                            mapRef = ref;
                        }
                    }}
                    onLoad={ymaps => onLoad(ymaps)}
                    modules={['templateLayoutFactory', 'route']}
                    defaultState={{ center: location, zoom: 14, controls: [] }}
                    className="map-container"
                >
                    <NavigatorBox minutes={minutesFromMkad} toName={settlement.name} />
                </Map>
            </div>
        </div>
    );
};

export default styled(SettlementMap)`
    .map-container {
        ${media.desktop.at(
            css => css`
                width: 100%;
                height: 500px;
            `
        )}

        ${media.desktop.to(
            css => css`
                width: 100%;
                height: 300px;
            `
        )}
    }
`;
