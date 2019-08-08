import React from 'react';
import { Map, Placemark } from 'react-yandex-maps';

export default () => {
    const size = typeof window !== 'undefined' && window.outerWidth < 992 ? 48 : 64;

    return (
        <Map
            className="map-container"
            instanceRef={ref => ref && ref.behaviors.disable('scrollZoom')}
            defaultState={{ center: [55.734871, 37.249479], zoom: 15, controls: [] }}
            width="100%"
            height="100%"
            modules={['layout.Image']}
        >
            <Placemark
                geometry={[55.734871, 37.249479]}
                options={{
                    iconLayout: 'default#image',
                    iconImageHref: '/static/shared/placemark.png',
                    iconImageSize: [size, size], // размер иконки
                    iconImageOffset: [(-1 * size) / 2, (-1 * size) / 2], // позиция иконки
                }}
            />
        </Map>
    );
};
