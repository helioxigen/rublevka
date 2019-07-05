import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactSwipe from 'react-swipe';
import { IconButton } from '@components/UI';
import CarouselLayout from './CarouselLayout';
import CarouselControl from './CarouselControl';
import Counter from './Counter';
import { cdn, media } from '@utils';
import GalleryNav from './GalleryNav';

const Gallery = ({ className, images, layoutImages, propertyId }) => {
    const carousel = useRef(null);
    const [currentIdx, changeCurrentIdx] = useState(0);

    return (
        <section className={className}>
            <CarouselLayout>
                <span className="id">№ {propertyId}</span>
                <IconButton className="expand-button" icon="expand" />
                <CarouselControl left onClick={() => carousel.current.prev()} />
                <ReactSwipe
                    ref={carousel}
                    swipeOptions={{
                        callback: idx => changeCurrentIdx(idx),
                        startSlide: currentIdx,
                    }}
                >
                    {images.map(({ id }) => (
                        <a key={id} role="button" tabIndex={0}>
                            <img data-id={id} alt={id} src={cdn.get.full(id, 1024)} />
                        </a>
                    ))}
                </ReactSwipe>
                <CarouselControl right onClick={() => carousel.current.next()} />
                <Counter overall={images.length} currentIndex={currentIdx + 1} />
            </CarouselLayout>
            <GalleryNav
                layoutButton={layoutImages.length > 0 && <IconButton icon="house-layout" />}
                currentIdx={currentIdx}
                images={images}
                onImageClick={idx => carousel.current.slide(idx)}
            />
        </section>
    );
};

export default styled(Gallery)`
    width: 700px;

    .expand-button {
        position: absolute;
        z-index: 5;
        right: 0px;
        top: 0;
        background: none;
        font-size: 10px;

        transition: opacity 225ms;
        opacity: 0;
    }

    ${Counter} {
        position: absolute;
        bottom: 20px;
        right: 15px;

        ${media.md`
            right: unset;
            left: 15px;
        `}
    }

    ${CarouselControl} {
        position: absolute;
        height: 100%;

        top: 0;

        transition: opacity 225ms;

        opacity: 0;
    }

    ${CarouselLayout}:hover {
        ${CarouselControl}, .expand-button {
            opacity: 1;
        }
    }

    ${GalleryNav} {
        margin-top: 4px;
    }

    span.id {
        margin: 0;
        padding: 5px;
        position: absolute;
        top: 20px;
        left: 15px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;

        line-height: 18px;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0.535714px;

        color: #ffffff;

        text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.35);

        ${media.md`
            display: none;
        `}
    }
`;
