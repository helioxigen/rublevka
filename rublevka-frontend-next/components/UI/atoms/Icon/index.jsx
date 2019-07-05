/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Icon = ({ className, name }) => {
    const IconSVG = require(`./assets/${name}.svg`).default;

    return (
        <span className={className}>
            <IconSVG />
        </span>
    );
};

export default styled(Icon)`
    width: 1.6em;
    height: 1.6em;

    svg {
        width: 100%;
        height: 100%;
    }
`;
