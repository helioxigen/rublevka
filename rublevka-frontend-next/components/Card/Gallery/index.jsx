import React, { useState } from 'react';
// import ReactSwipe from 'react-swipe';
import styled from 'styled-components';
import { cdn } from '@utils';
import Indicators from './Indicators';

const Gallery = ({ className, images }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <figure className={className}>
            {/* <ReactSwipe
                swipeOptions={{
                    callback: idx => setSelectedImage(idx),
                }}
            >
                {images.slice(0, 6).map(image => (
                    <img key={image.id} alt={image.id} src={cdn.get.thumbnail(image.id)} />
                ))}
            </ReactSwipe> */}
            <Indicators currentIdx={selectedImage} size={images.length} />,
        </figure>
    );
};

export default styled(Gallery)`
    width: 100%;
    .react-swipe-container {
        width: 100%;
    }
    img {
        object-fit: cover;
        width: 100%;
        height: 220px;
    }
`;
