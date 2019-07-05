/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import styled, { css } from 'styled-components';
import { sc } from '@utils';

const Icon = ({ className, name }) => {
    const IconSVG = require(`./assets/${name}.svg`).default;

    return (
        <span data-icon={name} className={className}>
            <IconSVG />
        </span>
    );
};

export default styled(Icon)`
    width: 1.6em;
    height: 1.6em;

    ${sc.ifProp(
        'mirror',
        css`
            transform: scaleX(-1);
        `
    )}

    svg {
        width: 100%;
        height: 100%;
        display: block;
    }
`;
