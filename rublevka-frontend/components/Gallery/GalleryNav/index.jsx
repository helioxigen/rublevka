import React, { useContext } from 'react';
import styled from 'styled-components';
import Shaft from './Shaft';
import { media, sc } from '@utils';
import GalleryContext from '../GalleryContext';

const GalleryNav = ({ className, layoutButton, images }) => {
    const [currentSlide, changeSlide] = useContext(GalleryContext);

    return (
        <div className={className}>
            <div className="container">
                <Shaft
                    currentIdx={currentSlide}
                    images={images}
                    onImageClick={changeSlide}
                    layoutButton={images.length < 6 && layoutButton}
                />
            </div>
            {images.length > 6 && layoutButton}
        </div>
    );
};

const shift = size => props => sc.calcTranslateShift(props.currentIdx, props.images.length, !!props.layoutButton, size);

export default styled(GalleryNav)`
    position: relative;
    overflow: hidden;

    .container {
        margin: 0 -2px;
    }

    @media screen and (max-width: 992px) {
        .container {
            overflow-x: scroll;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
        }

        .gallery-nav-item,
        .layout-button {
            height: 12vw;

            flex: 0 0 auto;

            width: 22vw;

            ${media.sm`
                    width: 100px;
                `}

            ${media.xs`
                    height: 60px;
                `}
        }
    }

    ${media.md`
        ${Shaft} {
            transition: 0.5s;
            transform: ${shift(5)};

            @media screen and (min-width: 560px) {
                transform: ${shift(6)};
            }

            ${media.sm`
                transform: ${shift(7)};
            `}
        }

        .gallery-nav-item,
        .layout-button {
            height: 12vw;

            flex: 0 0 auto;

                width: calc(1 / 5 * 100%);

                ${media.xs`
                    height: 60px;
                `}

                @media screen and (min-width: 560px) {
                    width: calc(1 / 6 * 100%);
                }

                ${media.sm`
                    width: calc(1 / 7 * 100%);
                `}
            }

            .layout-button {
                width: calc(1 / 5 * 100% - 1.5px);

                @media screen and (min-width: 560px) {
                    width: calc(1 / 6 * 100% - 1.5px);
                }

                ${media.sm`
                     width: calc(1 / 7 * 100% - 1.5px);
                `}
            }
    `}

    & > .layout-button {
        position: absolute;
        right: 0;
        top: 0;
    }
`;
