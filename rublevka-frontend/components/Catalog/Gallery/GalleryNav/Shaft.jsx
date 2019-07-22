import React from 'react';
import styled from 'styled-components';
import { cdn, media } from '@utils';

const Shaft = ({ className, images, currentIdx, onImageClick, layoutButton }) => (
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
                <img key={id} alt={id} data-current={idx === currentIdx} src={cdn.get.thumbnail(id, 128)} />
            </a>
        ))}
        {layoutButton}
    </div>
);

export default styled(Shaft)`
    display: flex;

    .gallery-nav-item {
        outline: none;

        box-sizing: border-box;
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
