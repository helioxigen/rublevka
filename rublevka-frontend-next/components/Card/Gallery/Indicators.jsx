import React from 'react';
import styled from 'styled-components';

const GalleryIndicators = ({ className, currentIdx, size }) => (
    <div className={className}>
        {[...Array(size)].slice(0, 6).map((_, idx) => (
            <span key={`${idx + 1}`} data-selected={idx === currentIdx} />
        ))}
    </div>
);

export default styled(GalleryIndicators)`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        margin: 0px 2.5px;
        width: 6px;
        height: 6px;
        border-radius: 5px;
        background: #ffffff;
        opacity: 0.75;

        transition: 0.3s;

        &[data-selected='true'] {
            width: 8px;
            height: 8px;
            opacity: 1;
        }
    }
`;
