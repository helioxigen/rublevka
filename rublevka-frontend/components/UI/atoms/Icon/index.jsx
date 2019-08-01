/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import styled, { css } from 'styled-components';
import { sc } from '@utils';

// const getIcon = name => require(`./assets/${name}.svg`).default;

const LIcon = ({ iconName }) => {
    const resolved = require(`./assets/${iconName}.svg`).default;

    if (!resolved) {
        throw Error(`Could not find icon/${iconName}`);
    }

    return React.createElement(resolved);
};

const Icon = ({ className, name, copy }) => {
    return (
        <span data-icon={name} className={className}>
            <LIcon iconName={name} />
            {copy && <LIcon iconName={name} />}
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
