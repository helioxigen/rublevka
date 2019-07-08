/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import styled, { css } from 'styled-components';
import { sc } from '@utils';

const Icon = ({ className, name, copy }) => {
    const IconSVG = require(`./assets/${name}.svg`).default;

    return (
        <span data-icon={name} className={className}>
            <IconSVG />
            {copy && <IconSVG />}
        </span>
    );
};

export default styled(Icon)`
    width: 1.6em;
    height: 1.6em;

    svg {
        width: 100%;
        height: 100%;
        display: block;

        ${sc.ifProp(
            'mirror',
            css`
                transform: scaleX(-1);
            `
        )}
    }
`;
