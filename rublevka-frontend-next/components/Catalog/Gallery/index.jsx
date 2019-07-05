import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';
import CarouselControl from './CarouselControl';
import { media } from '@utils';

const Gallery = ({ className, images }) => {
    const previewRef = useRef(null);
    const galleryRef = useRef(null);
    const [previewIdx, setPreIdx] = useState(0);
    const [galleryIdx, setGaIdx] = useState(0);
    const [idxDiff, setDiff] = useState(0);
    // const [[previewIdx, galleryIdx], changeIdxs] = useState([]);

    useEffect(() => {
        const gal = galleryRef.current;
        const pre = previewRef.current;

        if (!pre || !gal) return;

        const diff = gal.state.currentSlide - pre.state.currentSlide;

        console.log(diff, gal.state.currentSlide, pre.state.currentSlide);

        setDiff(diff);
    }, []);

    useEffect(() => {
        if (previewIdx === 0 && galleryIdx === 0) return;

        const gal = galleryRef.current;
        const pre = previewRef.current;

        // const galeId = previewIdx + (previewIdx > galleryIdx ? -idxDiff : idxDiff);
        // const preId = galleryIdx - (previewIdx > galleryIdx ? -idxDiff : idxDiff);

        // console.log(galeId, preId, idxDiff);

        if (!pre || !gal) return;

        gal.goToSlide(galleryIdx);
        pre.goToSlide(previewIdx);
    }, [previewIdx, galleryIdx]);

    // useEffect(() => {
    //     const gal = galleryRef.current;
    //     // const pre = previewRef.current;

    //     // console.log(gal, pre);

    //     if (!gal) return;

    //     gal.goToSlide(galleryIdx);
    //     // pre.goToSlide(previewIdx);
    // }, [galleryIdx]);

    return (
        <section className={className}>
            <Carousel
                ref={galleryRef}
                beforeChange={(nextSlide, { currentSlide }) => {
                    if (galleryIdx === nextSlide) return;

                    const previewEl = previewRef.current;

                    if (!previewEl) return;

                    const mult = nextSlide - currentSlide < 0 ? -1 : 1;

                    setPreIdx(previewEl.state.currentSlide + mult);
                }}
                controls={[<CarouselControl key={0} left />, <CarouselControl key={1} right />]}
                images={images}
            />
            <Carousel
                beforeChange={(nextSlide, { currentSlide }) => {
                    const diff = nextSlide - currentSlide;

                    if (previewIdx === nextSlide) return;

                    const galleryEl = galleryRef.current;

                    if (!galleryEl) return;

                    const nextGalleryIDx = galleryEl.state.currentSlide + diff;

                    // setPreIdx()
                    setGaIdx(nextGalleryIDx);
                }}
                additionalTransform={100 * 3}
                previewIdx={previewIdx}
                preview
                ref={previewRef}
                images={images}
            />
        </section>
    );
};

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

    ${Carousel}[data-preview="true"] {
        margin-top: 4px;

        figure {
            padding: 0 1.5px;
        }

        img {
            width: 100%;
            height: 60px;
            object-fit: cover;

            pointer-events: none;
        }
    }

    ${Carousel}[data-preview="false"] img {
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

    figure[data-preview="false"], figure[data-preview="false"] img {
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
