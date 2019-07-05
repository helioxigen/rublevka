import React, { createRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';
import CarouselControl from './CarouselControl';
import { media } from '@utils';

const Gallery = ({ className, images }) => (
    <section className={className}>
        <Carousel controls={[<CarouselControl key={0} left />, <CarouselControl key={1} right />]} images={images} />
    </section>
);

export default styled(Gallery)`
    width: 700px;

    ${CarouselControl} {
        position: absolute;

        &[data-left="true"] {
            left: 0;
        }

        &[data-right="true"] {
            right: 0;
        }
    }

    img {
        width: 100%;
        height: 300px;
        object-fit: cover;

        pointer-events: none;

        ${media.xs`
            height: 400px;
        `}

        ${media.sm`
            height: 480px;
        `}

        ${media.md`
            height: 450px;
            pointer-events: all;
        `}
    }
`;
