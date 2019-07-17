import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { cdn, media, sc } from '@utils';

// const ifLoaded = (idx, current) => idx + 7 <= current && current >= ;

const Shaft = ({ className, images, currentIdx, onImageClick, layoutButton }) => {
    const [fullyLoaded, changeFullyLoaded] = useState(false);

    useEffect(() => {
        if (currentIdx === images.length) {
            changeFullyLoaded(true);
        }
    }, [currentIdx]);

    return (
        <div className={className}>
            {images.map(({ id }, idx) => (
                <a
                    key={id}
                    tabIndex={0}
                    role="menuitem"
                    className="gallery-nav-item"
                    onKeyDown={() => onImageClick(idx)}
                    onClick={() => onImageClick(idx)}
                >
                    <img
                        key={id}
                        alt={id}
                        data-current={idx === currentIdx}
                        src={idx <= currentIdx + 7 || fullyLoaded ? cdn.get.thumbnail(id, 512) : '//'}
                    />
                </a>
            ))}
            {layoutButton}
        </div>
    );
};

export default styled(Shaft)`
    display: flex;

    .gallery-nav-item {
        outline: none;

        padding: 0 1.5px;
    }

    .gallery-nav-item,
    button {
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

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    img:not([data-current='true']) {
        opacity: 0.5;
        cursor: pointer;

        &:hover {
            opacity: 0.75;
        }
    }
`;
