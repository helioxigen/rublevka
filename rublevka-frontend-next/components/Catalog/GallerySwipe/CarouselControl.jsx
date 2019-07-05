import React from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '@components/UI';
import { sc } from '@utils';

const CarouselControl = ({ className, left, right, onClick }) => (
    <button data-left={left} data-right={right} type="button" className={className} onClick={onClick}>
        <Icon name="arrow-carousel" mirror={left} />
    </button>
);

export default styled(CarouselControl)`
    z-index: 3;

    background: none;
    border: none;
    outline: none;
    height: 100%;
    width: 50px;

    ${sc.ifProp(
        'left',
        css`
            left: 0;
        `,
        css`
            right: 0;
        `
    )}

    cursor: pointer;

    ${Icon} {
        display: block;
        font-size: 22px;
    }

    svg {
        stroke: white;
        fill: white;
    }
`;
