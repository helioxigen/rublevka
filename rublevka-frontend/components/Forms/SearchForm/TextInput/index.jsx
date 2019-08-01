import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI';
import { media } from '@utils';

const TextInput = ({ className, placeholder, value, onChange, children }) => (
    <div className={className}>
        <Icon name="search" />
        <input placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
        {children && <span className="input-results">{children}</span>}
    </div>
);

export default styled(TextInput)`
    position: relative;
    background: white;

    font-size: 16px;

    input {
        background: none;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;

        line-height: 1.3;
        font-size: inherit;

        border-radius: inherit;
        box-sizing: border-box;

        padding: 0 15px;

        ${media.tablet.at(
            css => css`
                font-size: 18px;
                padding: 0 0 0 56px;
            `
        )}
    }

    input::placeholder {
        color: #aaa;
    }

    [data-icon] {
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

    position: relative;

    .input-results {
        position: absolute;
        top: 110%;
        left: 0;
        right: 0;

        &:not(:hover) {
            display: none;
        }

        &:empty {
            display: none;
        }
    }

    input:focus {
        box-shadow: inset 0px 0px 6px rgba(153, 153, 153, 0.4);
        & + .input-results {
            display: block;
        }
    }
`;
