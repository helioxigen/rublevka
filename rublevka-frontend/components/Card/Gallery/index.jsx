import React, { useState, useEffect } from 'react';
import ReactSwipe from 'react-swipe';
import styled from 'styled-components';
import { cdn } from '@utils';
import Indicators from './Indicators';

const Gallery = ({ className, images }) => {
    const [currentIdx, changeCurrentIdx] = useState(0);
    const [fullyLoaded, changeFullyLoaded] = useState(false);

    useEffect(() => {
        if (currentIdx === images.length) {
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
                    <a key={id} role="button" tabIndex={0}>
                        {(idx <= currentIdx + 6 || fullyLoaded) && (
                            <img
                                data-id={id}
                                alt={id}
                                src={idx <= currentIdx + 1 ? cdn.get.thumbnail(id, 512) : cdn.get.thumbnail(id, 128)}
                            />
                        )}
                    </a>
                ))}
            </ReactSwipe>
            <Indicators currentIdx={currentIdx} size={images.length} />,
        </figure>
    );
};

export default styled(Gallery)`
    img {
        object-fit: cover;
        height: 220px;
        width: 100%;
    }
`;
