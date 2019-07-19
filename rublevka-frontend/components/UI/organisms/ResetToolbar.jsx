import React from 'react';
import styled from 'styled-components';
import { IconButton } from '../molecules';
import { sc, media } from '@utils';

const ResetToolbar = ({ className, onClose, onReset, isResetActive }) => (
    <header className={className}>
        <IconButton secondary icon="cross" onClick={onClose} />
        <button disabled={!isResetActive} className="reset-button" type="button" onClick={onReset}>
            Сбросить
        </button>
    </header>
);

export default styled(ResetToolbar)`
    display: flex;
    justify-content: space-between;
    font-size: 24px;

    margin-bottom: 1em;

    ${IconButton} {
        padding: 0;
        color: #080808;
    }

    .reset-button {
        color: ${sc.theme.colors.red};
        font-size: 16px;

        background: none;
        border: 0;
        outline: none;

        &:disabled {
            opacity: 0.6;
        }
    }

    ${media.mediaquery.tabletLandscape.at(
        css => css`
            display: none;
        `
    )}
`;
