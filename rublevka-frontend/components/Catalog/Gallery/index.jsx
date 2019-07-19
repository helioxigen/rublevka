import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactSwipe from 'react-swipe';
import { IconButton, FavoriteButton } from '@components/UI';
import CarouselLayout from './CarouselLayout';
import CarouselControl from './CarouselControl';
import Counter from './Counter';
import { cdn, media } from '@utils';
import GalleryNav from './GalleryNav';

const Gallery = ({ className, dealType, images, layoutImages, id }) => {
    const carousel = useRef(null);
    const [currentIdx, changeCurrentIdx] = useState(0);
    const [fullyLoaded, changeFullyLoaded] = useState(false);

    useEffect(() => {
        if (currentIdx === images.length) {
            changeFullyLoaded(true);
        }
    }, [currentIdx]);

    return (
        <section className={className}>
            <CarouselLayout>
                <span className="id">№ {id}</span>
                <IconButton className="expand-button" icon="expand" />
                <CarouselControl left onClick={() => carousel.current.prev()} />
                <ReactSwipe
                    ref={carousel}
                    swipeOptions={{
                        callback: idx => changeCurrentIdx(idx),
                        startSlide: currentIdx,
                    }}
                >
                    {images.map(({ id }, idx) => (
                        <a key={id} role="button" tabIndex={0}>
                            {(idx <= currentIdx + 6 || fullyLoaded) && (
                                <span
                                    className="image-view"
                                    style={{
                                        backgroundImage:
                                            idx <= currentIdx + 1 ? cdn.get.full(id, 1024) : cdn.get.thumbnail(id, 512),
                                    }}
                                />
                            )}
                        </a>
                    ))}
                </ReactSwipe>
                <CarouselControl right onClick={() => carousel.current.next()} />
                <Counter overall={images.length} currentIndex={currentIdx + 1} />
                <FavoriteButton id={id} dealType={dealType} />
            </CarouselLayout>
            <GalleryNav
                layoutButton={
                    layoutImages.length > 0 && (
                        <IconButton red className="layout-button" icon="house-layout">
                            планировки
                        </IconButton>
                    )
                }
                currentIdx={currentIdx}
                images={images}
                onImageClick={idx => carousel.current.slide(idx)}
            />
        </section>
    );
};

export default styled(Gallery)`
    .expand-button {
        position: absolute;
        z-index: 5;
        right: 0px;
        top: 0;
        background: none;
        font-size: 18px;

        transition: opacity 225ms;
        opacity: 0;
    }

    .layout-button {
        border-radius: 0;

        font-size: 2.5vw;
        text-transform: lowercase;
        font-weight: normal;

        display: flex;
        flex-direction: column;

        span {
            margin: 0 0 5px;
        }

        ${media.xs`
            font-size: 13px;
        `}
    }

    ${FavoriteButton} {
        position: absolute;
        top: 5px;
        right: 0;

        ${media.mediaquery.tabletLandscape.at(
            css => css`
                display: none;
            `
        )}
    }

    ${Counter} {
        position: absolute;
        bottom: 20px;
        right: 15px;

        ${media.mediaquery.tablet.at(
            css => css`
                right: unset;
                left: 15px;
            `
        )}
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

    ${media.mediaquery.tabletLandscape.to(
        css => css`
            ${CarouselControl}, .expand-button {
                display: none;
            }
        `
    )}

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

        z-index: 200;

        ${media.mediaquery.tabletLandscape.at(
            css => css`
                display: none;
            `
        )}
    }
`;
