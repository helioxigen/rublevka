import React, { useState, useEffect } from 'react';
import ReactSwipe from 'react-swipe';
import styled from 'styled-components';
import { cdn } from '@utils';
import Indicators from './Indicators';

const Gallery = ({ className, images }) => {
    const [currentIdx, changeCurrentIdx] = useState(0);
    const [shown, changeShown] = useState([]);
    const [fullyLoaded, changeFullyLoaded] = useState(false);

    useEffect(() => {
        if (currentIdx === images.length) {
            changeFullyLoaded(true);
        }

        if (!shown.includes(currentIdx)) {
            changeShown([...shown, currentIdx]);
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
                        {(idx <= currentIdx + 1 || fullyLoaded) && (
                            <span
                                className="display"
                                style={{
                                    backgroundImage: `url(${
                                        idx === currentIdx || shown.includes(idx)
                                            ? cdn.get.thumbnail(id, 512)
                                            : cdn.get.thumbnail(id, 128)
                                    })`,
                                }}
                            />
                            // <img
                            //     data-id={id}
                            //     alt={id}
                            //     src={idx <= currentIdx + 1 ? cdn.get.thumbnail(id, 512) : cdn.get.thumbnail(id, 128)}
                            // />
                        )}
                    </a>
                ))}
            </ReactSwipe>
            <Indicators currentIdx={currentIdx} size={images.length} />,
        </figure>
    );
};

export default styled(Gallery)`
    .display {
        display: block;
        background: center / cover no-repeat;
        height: 220px;
        width: 100%;
    }
    /* img {
        object-fit: cover;
        height: 220px;
        width: 100%;
    } */
`;
