import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI';
import { sc, media } from '@utils';

const BackButton = ({ className, children, onClick }) => (
    <button type="button" className={className} onClick={onClick}>
        <Icon name="arrow" mirror />
        <Icon name="arrow-squared" />
        <span className="back-label">{children}</span>
    </button>
);

export default styled(BackButton)`
    background: none;
    border: none;
    outline: none;
    width: 100%;
    cursor: pointer;

    span:not(${Icon}) {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    font-size: 16px;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    ${Icon} {
        flex: 0 0 auto;
    }

    [data-icon='arrow'] {
        color: black;
        margin: 0 8px 0 0;

        ${media.desktop.at(
            css => css`
                display: none;
            `
        )}
    }

    [data-icon='arrow-squared'] {
        transition: 0.3s;

        position: absolute;
        left: 10%;

        ${media.desktop.to(
            css => css`
                display: none;
            `
        )}

        font-size: 14px;

        background: ${sc.theme.colors.lightGrey};
        border-radius: 50%;
        padding: 7px 8px 7px 6px;
    }

    ${media.desktop.at(
        css => css`
            transition: background 0.3s;

            &:hover {
                color: white;
                background: ${sc.theme.colors.red};

                &[data-icon='arrow-squared'] {
                    transform: translateX(-20%);
                }
            }
        `
    )}
`;
