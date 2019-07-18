/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import dynamic from 'next/dynamic';
import styled, { css } from 'styled-components';
import { sc } from '@utils';

const Icon = ({ className, name, copy }) => {
    const IconSVG = dynamic(() => import(`./assets/${name}.svg`));

    return (
        <span data-icon={name} className={className}>
            <IconSVG />
            {copy && <IconSVG />}
        </span>
    );
};

export default styled(Icon)`
    width: 1em;
    height: 1em;

    display: inline-block;

    svg {
        width: 100%;
        height: 100%;
        display: block;

        ${sc.ifProp('stroke')('stroke: currentColor;', 'fill: currentColor;')}

        ${sc.ifProp('mirror')(
            css`
                transform: scaleX(-1);
            `
        )}
    }
`;
