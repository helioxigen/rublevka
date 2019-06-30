/* eslint-disable import/no-dynamic-require */
import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line global-require
const getIcon = name => require(`./assets/${name}.svg`).default;

const Icon = ({ className, name, viewBox }) => {
    const IconSVG = getIcon(name);

    return (
        <span className={className}>
            <IconSVG viewBox={viewBox} />
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
