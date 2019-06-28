/* eslint-disable import/no-dynamic-require */
import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line global-require
const getIcon = name => require(`./assets/${name}.svg`).default;

const Icon = ({ className, name }) => {
    const IconSVG = getIcon(name);

    return (
        <span className={className}>
            <IconSVG />
        </span>
    );
};

export default styled(Icon)`
    width: 1em;
    height: 1em;

    svg {
        width: 100%;
        height: 100%;
    }
`;
