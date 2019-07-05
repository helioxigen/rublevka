import React, { useState, useRef, useEffect } from 'react';
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

const responsivePreview = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 7,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 6,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 4,
    },
};

const Carousel = React.forwardRef(
    (
        {
            className,
            images,
            beforeChange,
            afterChange,
            additionalTransform,
            preview = false,
            previewIdx,
            controls: [left, right] = [],
        },
        ref
    ) => {
        // const children = articles.map(article => <ArticleCard key={article.title} {...article} />);

        // const images = articles.map(article => <Avatar key={article.title} src={article.imageUrl} />);

        // const CustomDot = ({ index, onClick, active, carouselState: { currentSlide } }) => {
        //     return (
        //         <button
        //             type="button"
        //             onClick={e => {
        //                 onClick();
        //                 e.preventDefault();
        //             }}
        //             // className={classNames('custom-dot', {
        //             //     'custom-dot--active': active,
        //             // })}
        //         >
        //             {images.map(({ id }, idx) => (
        //                 <figure data-active={active} data-idx={idx} data-preview={preview} key={id}>
        //                     <img src={cdn.get.full(id)} alt={id} />
        //                 </figure>
        //             ))}
        //         </button>
        //     );
        // };

        // const handleIdxUpdate = ([preview, gallery]) => changeIdxs([preview || previewIdx, gallery || galleryIdx]);

        // const children = (previeww = false) =>
        //     images.map(({ id }, idx) => (
        //         <figure data-idx={idx} data-preview={previeww} key={id}>
        //             <img src={cdn.get.full(id)} alt={id} />
        //         </figure>
        //     ));

        return (
            <div className={className} data-preview={preview}>
                <Slider
                    ref={ref}
                    beforeChange={beforeChange}
                    // beforeChange={(nextSlide, { isSliding, onMove }) => {
                    //     // changePreviewIdx()
                    //     // handleIdxUpdate([previewRef.current.state.currentSlide + 1]);

                    //     // if (isSliding || )

                    //     // if (!galleryAllowed) return;

                    //     if (galleryIdx === nextSlide) return;

                    //     const previewEl = previewRef.current;

                    //     if (!previewEl) return;

                    //     setPreIdx(previewEl.state.currentSlide + 1);

                    //     // previewEl.next();

                    //     // setPrevAllowed(false);

                    //     // previewRef.current && previewRef.current.goToSlide(previewRef.current.state.currentSlide + 1);
                    // }}
                    arrows={!preview}
                    infinite
                    responsive={preview ? responsivePreview : responsive}
                    customLeftArrow={left}
                    customRightArrow={right}
                    containerClass="gallery-carousel"
                    removeArrowOnDeviceType={['tablet', 'mobile']}
                    focusOnSelect={preview}
                    additionalTransfrom={additionalTransform}
                >
                    {images.map(({ id }, idx) => (
                        <figure data-idx={idx} data-preview={preview} key={id}>
                            <img src={cdn.get.full(id)} alt={id} />
                        </figure>
                    ))}
                </Slider>
                {/* <Slider
                    ref={previewRef}
                    // afterChange={() => setPrevAllowed(true)}
                    beforeChange={(nextSlide, { currentSlide }) => {
                        const diff = nextSlide - currentSlide;

                        if (previewIdx === nextSlide) return;

                        const galleryEl = galleryRef.current;

                        if (!galleryEl) return;

                        const nextGalleryIDx = galleryEl.state.currentSlide + diff;

                        setGaIdx(nextGalleryIDx);

                        // if (!previewAllowed) return;

                        // setGalleryAllowed(false);

                        // handleIdxUpdate([undefined, galleryRef.current.state.currentSlide + diff]);

                        // galleryRef.current &&
                        //     galleryRef.current.goToSlide(galleryRef.current.state.currentSlide + diff);
                    }}
                    infinite
                    responsive={responsivePreview}
                    customLeftArrow={left}
                    customRightArrow={right}
                    containerClass={className}
                    removeArrowOnDeviceType={['tablet', 'mobile']}
                    focusOnSelect
                    additionalTransfrom={100 * 3}
                    // showDots
                    // customDot={<CustomDot />}
                >
                    {children(true)}
                </Slider> */}
            </div>
        );
    }
);

export default styled(Carousel)`
    position: relative;

    .gallery-carousel {
        display: flex;
        align-items: center;
        overflow: hidden;
        position: relative;
    }

    figure {
        margin: 0;
    }

    ${CarouselControl} {
        opacity: 0;
        transition: opacity 225ms;
    }

    &[data-preview='false']::before,
    &[data-preview='false']::after {
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

    &[data-preview='true'] {
        .react-multi-carousel-item {
            opacity: 0.5;
            cursor: pointer;

            &--active {
                opacity: 1;
                cursor: default;
                pointer-events: none;

                & + .react-multi-carousel-item {
                    opacity: 0.5;
                    cursor: pointer;
                }
            }
        }
    }
`;
