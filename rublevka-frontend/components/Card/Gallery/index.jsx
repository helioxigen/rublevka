import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { cdn } from '@utils';
import Indicators from './Indicators';

const ReactSwipe = dynamic(() => import('react-swipe'));

const Gallery = ({ className, images }) => {
    const [currentIdx, changeCurrentIdx] = useState(0);
    const [fullyLoaded, changeFullyLoaded] = useState(false);

    useEffect(() => {
        if (currentIdx === images.length - 1) {
            changeFullyLoaded(true);
        }
    }, [currentIdx]);

    return (
        <figure className={className}>
            <ReactSwipe
                swipeOptions={{
                    callback: idx => changeCurrentIdx(idx),
                    startSlide: currentIdx,
                }}
            >
                {images.map(({ id }, idx) => (
                    <a key={id}>
                        {(idx <= currentIdx + 1 || fullyLoaded) && <img alt="" src={cdn.get.thumbnail(id, 512)} />}
                    </a>
                ))}
            </ReactSwipe>
            <Indicators currentIdx={currentIdx} size={images.length} />
        </figure>
    );
};

export default styled(Gallery)`
    background: center / cover no-repeat;
    .display {
        display: block;
        background: center / cover no-repeat;
        /* height: 220px; */
        width: 100%;
    }
    img {
        object-fit: cover;
        height: 220px;
        width: 100%;
    }
`;
