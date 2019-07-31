import React, { useState } from 'react';
import styled from 'styled-components';
import { YMaps, Map } from 'react-yandex-maps';

import { coords } from '@utils';

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
        const balloonContentBodyLayout = ymaps.templateLayoutFactory.createClass('<div>Test</div>');

        // we need to get nearest mkad km
        const nearestMkadKm = coords.mkad.getNearestMkadPoint(location[0], location[1]);
        // console.log('nearestMkadKm:', nearestMkadKm);

        ymaps
            .route(
                [
                    { type: 'wayPoint', point: [nearestMkadKm[2], nearestMkadKm[1]] },
                    { type: 'wayPoint', point: location },
                ],
                { balloonContentBodyLayout }
            )
            .then(route => {
                // console.log('route:', route);
                try {
                    const points = route.getWayPoints();
                    const lastPoint = points.getLength() - 1;
                    // Задаем стиль метки - иконки будут красного цвета, и
                    // их изображения будут растягиваться под контент.
                    points.options.set('preset', 'islands#redStretchyIcon');
                    // Задаем контент меток в начальной и конечной точках.
                    points.get(0).properties.set('iconContent', 'МКАД');
                    points.get(lastPoint).properties.set('iconContent', settlement.name);

                    const duration = route.getJamsTime();

                    setMinutesFromMkad(Math.round(duration / 60));

                    route.getPaths().options.set({
                        opacity: 0.9,
                    });

                    // добавляем маршрут на карту
                    // console.log('mapref:', mapRef);
                    mapRef.geoObjects.add(route);
                } catch (ex) {
                    // console.log(ex);
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
            <YMaps
                query={{
                    apikey: 'f39a3e9a-410f-431a-a7ff-5d6e570c3834',
                    ns: 'use-load-option',
                    load: 'package.full',
                }}
            >
                <div>
                    <Map
                        instanceRef={ref => {
                            if (ref) {
                                mapRef = ref;
                            }
                        }}
                        onLoad={ymaps => onLoad(ymaps)}
                        modules={['templateLayoutFactory', 'route']}
                        defaultState={{ center: location, zoom: 14, controls: [] }}
                        width="100%"
                        height="500px"
                    />
                </div>
            </YMaps>
        </div>
    );
};

export default styled(SettlementMap)``;
