import React, { useContext } from 'react';
import styled from 'styled-components';
import GalleryContext from '@components/Gallery/GalleryContext';
import { format } from '@utils';

const GalleryCount = ({ className, overall }) => {
    const [currentIndex] = useContext(GalleryContext);

    return (
        <div className={className}>
            {format.prefixZero(currentIndex + 1)} / {format.prefixZero(overall)}
        </div>
    );
};

export default styled(GalleryCount)`
    padding: 6px 8px;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 6px;

    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.535714px;
    color: white;
    text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.35);

    z-index: 2;

    span:nth-child(2) {
        margin: 0 2px;
    }
`;
