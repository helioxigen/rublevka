import React from 'react';
import styled from 'styled-components';
import { Map, Placemark } from 'react-yandex-maps';
import { media } from '@utils';

const Location = ({ className }) => {
    const size = typeof window !== 'undefined' && window.outerWidth < 992 ? 48 : 64;

    return (
        <section className={className}>
            <h3>Как нас найти</h3>
            <p>Наш офис находится по адресу:</p>
            <address>Рублёво-Успенское шоссе, Жуковка, 44А</address>
            <Map
                className="map-container"
                instanceRef={ref => ref && ref.behaviors.disable('scrollZoom')}
                defaultState={{ center: [55.734871, 37.249479], zoom: 15 }}
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
        </section>
    );
};

export default styled(Location)`
    text-align: center;
    h3,
    p {
        margin: 0;
    }
    h3 {
        margin: 0;
        line-height: 32px;
        font-size: 24px;

        ${media.xs`
            line-height: 48px;
            font-size: 40px;
        `}

        ${media.md`
            line-height: 56px;
            font-size: 48px;
        `}
    }

    p,
    address {
        margin: 0;
        line-height: 24px;
        font-size: 15px;
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
    }

    address {
        margin: 0 0 16px;
        font-style: normal;

        ${media.xs`
            margin: 0 0 24px;
        `}

        ${media.xs`
            font-weight: bold;
            margin: 0 0 32px;
        `}
    }

    .map-container {
        width: 100%;
        height: 300px;

        ${media.xs`
            height: 522px;
        `}

        ${media.lg`
            height: 640px;
        `}
    }
`;
