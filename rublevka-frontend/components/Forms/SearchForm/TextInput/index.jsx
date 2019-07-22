import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI';
import { media } from '@utils';

const TextInput = ({ className, placeholder, value, onChange }) => (
    <div className={className}>
        <Icon name="search" />
        <input placeholder={placeholder} value={value} onChange={onChange} />
    </div>
);

export default styled(TextInput)`
    position: relative;
    background: white;

    font-size: 16px;

    padding: 0 15px;

    ${media.tablet.at(
        css => css`
            font-size: 18px;
            padding: 0 0 0 56px;
        `
    )}

    input {
        background: none;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;

        line-height: 1.3;
        font-size: inherit;
    }

    input::placeholder {
        color: #aaa;
    }

    ${Icon} {
        position: absolute;
        left: 0;
        font-size: 20px;
        color: #aaa;
        height: 100%;
        width: 56px;
        box-sizing: border-box;
        padding: 12px;

        ${media.tablet.to(
            css => css`
                display: none;
            `
        )}
    }

    &:focus {
        box-shadow: inset 0px 0px 6px rgba(153, 153, 153, 0.4);
    }
`;
