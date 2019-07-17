import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../utils';
import { Icon } from '../../../UI/atoms';

const Options = ({
    className,
    children,
    getToggleButtonProps,
    getMenuProps,
    withSaveButton,
    isResetButtonActive,
    onReset,
}) => (
    <div className={className} {...getMenuProps()}>
        <header>
            <button className="close-btn" type="button" {...getToggleButtonProps()}>
                <Icon name="close-button" />
            </button>
            <button className="reset-btn" type="button" disabled={!isResetButtonActive} onClick={onReset}>
                Сбросить
            </button>
        </header>
        {children}
        {withSaveButton && (
            <button type="button" className="save-btn" {...getToggleButtonProps()}>
                Применить
            </button>
        )}
    </div>
);

export default styled(Options)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #fff;
    z-index: 3;

    overflow: hidden;

    cursor: default;

    ${media.xs`
        padding: 0;
        position: absolute;
        top: 110%;
        left: auto;
        right: auto;
        bottom: auto;
        width: 100%;
        border-radius: 8px;
        max-height: 300px;
        padding: 16px 0;
        border: 1px solid #d9d9d9;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
    `}

    header {
        width: 100%;
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        ${media.xs`
            display: none;  
        `}
    }

    button {
        padding: 0;
        background: none;
        border: none;
    }

    .save-btn {
        width: 100%;
        text-align: center;
        margin-top: 32px;
        line-height: 20px;
        text-transform: uppercase;
        color: #f44336;
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
