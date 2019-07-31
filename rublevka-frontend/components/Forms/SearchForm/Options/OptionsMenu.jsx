import React from 'react';
import styled from 'styled-components';
import { ResetToolbar } from '@components/UI';
import { media } from '../../../../utils';

const Options = ({ className, children, getToggleButtonProps, getMenuProps, isResetButtonActive, onReset }) => (
    <div className={className} {...getMenuProps()}>
        <ResetToolbar
            isResetActive={isResetButtonActive}
            onReset={onReset}
            closeAdditionalProps={getToggleButtonProps()}
        />
        {children}
        <button type="button" className="save-btn" {...getToggleButtonProps()}>
            Применить
        </button>
    </div>
);

export default styled(Options)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 25000;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #fff;

    overflow: hidden;

    cursor: default;

    ${media.xs`
        position: absolute;
        top: 110%;
        left: auto;
        right: auto;
        bottom: auto;
        width: 100%;
        border-radius: 8px;
        max-height: 300px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
    `}

    ${media.desktop.at(
        css => css`
            padding: 15px 0;
        `
    )}

    ${ResetToolbar} {
        color: #bbb;
        ${media.desktop.at(
            css => css`
                display: none;
            `
        )}
    }

    button {
        padding: 0;
        background: none;
        border: none;
    }

    .save-btn {
        width: 100%;
        text-align: center;
        font-size: 16px;
        margin-top: 32px;
        line-height: 20px;
        text-transform: uppercase;
        color: #f44336;

        ${media.phoneL.at(
            css => css`
                display: none;
            `
        )}
    }

    .reset-btn {
        line-height: 19px;
        font-size: 16px;
        font-weight: 500;
        color: #f44336;

        &:disabled {
            color: rgba(244, 67, 54, 0.3);
        }
    }
`;
