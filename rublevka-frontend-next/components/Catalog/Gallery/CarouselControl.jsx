import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI';
import { sc } from '@utils';

const CarouselControl = ({ className, left, right, onClick }) => (
    <button data-left={left} data-right={right} type="button" className={className} onClick={onClick}>
        <Icon name="arrow-carousel" mirror={left} />
    </button>
);

export default styled(CarouselControl)`
    background: ${sc.ifProp(
        'left',
        'linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%)',
        'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)'
    )};

    z-index: 3;

    border: none;
    outline: none;
    height: 100%;
    width: 50px;

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
