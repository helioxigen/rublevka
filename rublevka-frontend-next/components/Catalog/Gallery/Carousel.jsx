import React from 'react';
import styled from 'styled-components';
import Slider from 'react-multi-carousel';
import { cdn } from '@utils';
import CarouselControl from './CarouselControl';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const Carousel = ({ className, images, controls: [left, right] }) => (
    <Slider infinite responsive={responsive} customLeftArrow={left} customRightArrow={right} containerClass={className}>
        {images.map(({ id }) => (
            <img key={id} src={cdn.get.full(id)} alt={id} />
        ))}
    </Slider>
);

export default styled(Carousel)`
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;

    ${CarouselControl} {
        opacity: 0;
        transition: opacity 225ms;
    }

    &::before,
    &::after {
        content: '';
        width: 80px;
        position: absolute;
        top: 0;
        bottom: 0;

        transition: opacity 0.5s;
        opacity: 0;
        z-index: 2;
    }

    &::before {
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
        left: 0;
    }

    &::after {
        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
        right: 0;
    }

    &:hover {
        &::before,
        &::after,
        ${CarouselControl} {
            opacity: 1;
        }
    }

    .react-multi-carousel-track {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        position: relative;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        will-change: transform, transition;
    }
    .react-multiple-carousel__arrow {
        position: absolute;
        outline: none;
        transition: all 0.5s;
        border-radius: 35px;
        z-index: 1000;
        border: none;
        background: rgba(0, 0, 0, 0.5);
        min-width: 43px;
        min-height: 43px;
        opacity: 1;
        cursor: pointer;
    }
    .react-multiple-carousel__arrow:hover {
        background: rgba(0, 0, 0, 0.8);
    }
    .react-multiple-carousel__arrow::before {
        font-size: 20px;
        color: #fff;
        display: block;
        font-family: revicons;
        text-align: center;
        z-index: 2;
        position: relative;
    }

    .react-multiple-carousel__arrow--left {
        left: calc(4% + 1px);
    }
    .react-multiple-carousel__arrow--left::before {
        content: '\e824';
    }
    .react-multiple-carousel__arrow--right {
        right: calc(4% + 1px);
    }
    .react-multiple-carousel__arrow--right::before {
        content: '\e825';
    }

    .react-multi-carousel-dot-list {
        position: absolute;
        bottom: 0;
        display: flex;
        left: 0;
        right: 0;
        justify-content: center;
        margin: auto;
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: center;
    }
    .react-multi-carousel-dot button {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        opacity: 1;
        padding: 5px 5px 5px 5px;
        box-shadow: none;
        transition: background 0.5s;
        border-width: 2px;
        border-style: solid;
        border-color: grey;
        padding: 0;
        margin: 0;
        margin-right: 6px;
        outline: 0;
        cursor: pointer;
    }
    .react-multi-carousel-dot button:hover {
        background: #080808;
    }
    .react-multi-carousel-dot--active button {
        background: #080808;
    }
    .react-multi-carousel-item {
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        .react-multi-carousel-item {
            flex-shrink: 0 !important;
        }
        .react-multi-carousel-track {
            overflow: visible !important;
        }
    }
`;
