import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../utils';

const DropdownToggle = ({ className, label, value, getToggleButtonProps }) => (
    <div className={className} {...getToggleButtonProps()}>
        {label && <span className="display-label">{label}</span>}
        <p className="display-value">{value}</p>
    </div>
);

export default styled(DropdownToggle)`
    padding: 10px 15px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: none;

    ${media.md`
        padding: 0 16px;
    `}

    .display-label {
        font-weight: 700;
        line-height: 13px;
        font-size: 11px;

        text-transform: uppercase;
        color: #aaaaaa;

        ${media.md`
            line-height: 15px;
            font-size: 13px;
        `}
    }

    .display-value {
        margin: 4px 0 0;
        line-height: 19px;
        font-size: 16px;
        font-weight: 600;

        color: #232323;

        ${media.md`
            margin: 6px 0 0;
            line-height: 21px;
            font-size: 18px;
        `}
    }
`;
