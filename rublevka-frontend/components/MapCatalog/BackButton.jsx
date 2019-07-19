import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/UI';
import { sc, media } from '@utils';

const BackButton = ({ className, children, onClick }) => (
    <button type="button" className={className} onClick={onClick}>
        <Icon copy name="arrow-squared" />
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
        position: absolute;
        left: 10%;
        transition: 0.3s;

        flex: 0 0 auto;

        font-size: 14px;

        width: 1em;
        height: 1em;

        background: ${sc.theme.colors.lightGrey};
        border-radius: 50%;
        padding: 7px 4px 7px 10px;

        &:nth-child(2) {
            padding: 7px 8px 7px 6px;
        }

        svg:nth-child(2) {
            transform: rotate(180deg) translate(0.4em, 1em);
        }
    }

    ${media.mediaquery.tabletLandscape.to(
        css => css`
            justify-content: flex-start;
            ${Icon}:first-child {
                display: none;
            }

            ${Icon}:nth-child(2) {
                position: relative;
                left: auto;
                margin-right: 12px;
            }
        `
    )}

    ${media.mediaquery.tabletLandscape.at(
        css => css`
            transition: background 0.3s;

            &:hover {
                color: white;
                background: ${sc.theme.colors.red};
            }

            &:hover {
                [data-icon='arrow-squared']:nth-child(2) {
                    transform: scale(0);
                }
            }
        `
    )}
`;
