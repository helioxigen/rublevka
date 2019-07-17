import React from 'react';
import styled from 'styled-components';

const Avatar = ({ className, src, alt }) => (
    <figure className={className}>
        <img src={src} alt={alt} />
    </figure>
);

export default styled(Avatar)`
    margin: 0;

    border-radius: 50%;
    overflow: hidden;

    width: 1em;
    height: 1em;

    img {
        width: 100%;
        height: 100%;
    }
`;
