import React from 'react';
import styled from 'styled-components';
import { IconButton } from '../molecules';
import { sc, media } from '@utils';

const ResetToolbar = ({ className, onClose, onReset, isResetActive, closeAdditionalProps = {} }) => (
    <header className={className}>
        <IconButton secondary icon="times" onClick={onClose} {...closeAdditionalProps} />
        <button disabled={!isResetActive} className="reset-button" type="button" onClick={onReset}>
            Сбросить
        </button>
    </header>
);

export default styled(ResetToolbar)`
    display: flex;
    justify-content: space-between;
    width: 100%;

    margin-bottom: 1em;

    .times-button {
        padding: 0;
        color: #080808;
        height: auto;
        font-size: 24px;
    }

    .reset-button {
        color: ${sc.theme.colors.red};
        font-size: 16px;

        background: none;
        border: 0;
        outline: none;

        padding: 0;

        &:disabled {
            opacity: 0.6;
        }
    }

    ${media.desktop.at(
        css => css`
            display: none;
        `
    )}
`;
