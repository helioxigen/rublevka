import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconButton } from '@components/UI';
import ReactSwipe from 'react-swipe';
import Control from './Control';
import { cdn, media } from '@utils';
import GalleryNav from './GalleryNav';
import GalleryContext from './GalleryContext';

const Gallery = ({ className, images, keyboardControl, layoutImages = [], onLayoutButtonClick, children }) => {
    const carousel = useRef(null);
    const [currentIdx, changeCurrentIdx] = useState(0);
    const [fullyLoaded, changeFullyLoaded] = useState(false);

    useEffect(() => {
        if (currentIdx === images.length) {
            changeFullyLoaded(true);
        }
    }, [currentIdx]);

    const handleKeyboard = event => {
        if (event.key === 'ArrowLeft') {
            carousel.current.prev();
        }

        if (event.key === 'ArrowRight') {
            carousel.current.next();
        }
    };

    useEffect(() => {
        if (!keyboardControl) return () => {};

        document.addEventListener('keydown', handleKeyboard, false);

        return () => {
            document.removeEventListener('keydown', handleKeyboard, false);
        };
    }, [keyboardControl]);

    const isControlsVisible = images.length > 1;

    return (
        <GalleryContext.Provider value={[currentIdx, idx => carousel.current && carousel.current.slide(idx)]}>
            <section className={className}>
                <div className="gallery-display">
                    {isControlsVisible && <Control className="control" left onClick={() => carousel.current.prev()} />}
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
                                    <img
                                        alt=""
                                        src={
                                            idx <= currentIdx + 1 ? cdn.get.full(id, 1024) : cdn.get.thumbnail(id, 128)
                                        }
                                    />
                                )}
                            </a>
                        ))}
                    </ReactSwipe>
                    <div className="gallery-overlay">{children}</div>
                    {isControlsVisible && <Control className="control" right onClick={() => carousel.current.next()} />}
                </div>
                {isControlsVisible && (
                    <GalleryNav
                        className="gallery-nav"
                        layoutButton={
                            layoutImages.length > 0 && (
                                <IconButton
                                    red
                                    onClick={onLayoutButtonClick}
                                    className="layout-button"
                                    icon="house-layout"
                                >
                                    планировки
                                </IconButton>
                            )
                        }
                        currentIdx={currentIdx}
                        images={images}
                        onImageClick={idx => carousel.current.slide(idx)}
                    />
                )}
            </section>
        </GalleryContext.Provider>
    );
};

export default styled(Gallery)`
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

    ${Control} {
        position: absolute;
        height: 100%;

        top: 0;

        transition: opacity 225ms;

        opacity: 0;
    }

    .gallery-display:hover {
        ${Control}, .expand-button {
            opacity: 1;
        }
    }

    ${media.desktop.to(
        css => css`
            ${Control}, .expand-button {
                display: none;
            }
        `
    )}

    ${GalleryNav} {
        margin-top: 4px;
    }

    .gallery-display {
        position: relative;

        &::before,
        &::after {
            content: '';
            position: absolute;
            pointer-events: none;
            top: 0;
            bottom: 0;
            width: 80px;
            transition: opacity 0.5s;
            opacity: 0;
            z-index: 1;

            display: none;

            ${media.desktop.at(
                css => css`
                    display: block;
                `
            )}
        }

        &::before {
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%);
            left: 0;
        }

        &::after {
            background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
            right: 0;
        }

        ${({ images }) =>
            images.length > 1 &&
            `
            &:hover {
                ::before,
                ::after {
                    opacity: 1;
                }

                ${Control} {
                    opacity: 1;
                }
            }
            `}

        img {
            margin: 0 auto;
            display: block;
            height: 300px;

            background: center / cover no-repeat;

            pointer-events: none;
            width: 100%;
            object-fit: cover;

            ${media.at(css => ({
                phoneL: css`
                    height: 400px;
                `,
                tablet: css`
                    height: 480px;
                `,
                desktop: css`
                    height: 450px;
                    pointer-events: all;
                `,
            }))}
        }
    }
`;
