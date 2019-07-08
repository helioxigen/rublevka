import React, { useRef } from 'react';
import styled from 'styled-components';
import { Map, ZoomControl, Clusterer, Placemark } from 'react-yandex-maps';

const LayoutMap = ({ className, items }) => {
    const ymaps = useRef(null);

    console.log(ymaps, ymaps.templateLayoutFactory);

    return (
        <Map
            className={className}
            state={{
                center: [55.73, 36.95],
                zoom: 11,
            }}
            instanceRef={ymaps}
            width="100%"
            height="100%"
        >
            <ZoomControl
                options={{
                    position: {
                        left: 'auto',
                        right: 10,
                        top: 108,
                    },
                }}
            />
            <Clusterer
                options={{
                    // preset: 'islands#redClusterIcons',
                    minClusterSize: 1,
                    gridSize: 128,
                }}
                properties={{
                    clusterDisableClickZoom: true,
                    // Используем макет "аккордеон"
                    clusterBalloonContentLayout: 'cluster#balloonAccordion',
                    // clusterIconLayout: ymaps.templateLayoutFactory.createClass(
                    //     '<div class="clusterIcon">{{ properties.geoObjects.length }}</div>'
                    // ),
                    // Чтобы метка была кликабельной, переопределим ее активную область.
                    clusterIconShape: {
                        type: 'Rectangle',
                        coordinates: [[0, 0], [20, 20]],
                    },
                }}
            >
                {items
                    .filter(i => i.location)
                    .map(({ id, location }) => (
                        <Placemark
                            key={id}
                            geometry={[location.latitude, location.longitude]}
                            properties={{
                                hintContent: 'Собственный значок метки',
                                balloonContent: 'Это красивая метка',
                                iconContent: 'islands#redCircleIcon',
                                clusterDisableClickZoom: true,
                                // Используем макет "карусель"
                                clusterBalloonContentLayout: 'cluster#balloonCarousel',
                                // Запрещаем зацикливание списка при постраничной навигации.
                                clusterBalloonCycling: false,
                                // Настройка внешнего вида панели навигации.
                                // Элементами панели навигации будут маркеры.
                                clusterBalloonPagerType: 'marker',
                                // Количество элементов в панели.
                                clusterBalloonPagerSize: 6,
                            }}
                            options={{
                                iconLayout: 'default#image',
                            }}
                        />
                    ))}
            </Clusterer>
        </Map>
    );
};

export default styled(LayoutMap)`
    width: 100%;
    height: 100%;
`;
