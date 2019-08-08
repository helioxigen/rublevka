import React from 'react';
import styled from 'styled-components';
import MapButton from './MapButton';
import Sort from './Sort';
import { media } from '@utils';

const CatalogToolbar = ({ className, totalItems, map = true, sort = true }) => (
    <div className={className}>
        {sort && <Sort totalItems={totalItems} />}
        {map && <MapButton />}
    </div>
);

export default styled(CatalogToolbar)`
    display: flex;

    font-size: 16px;
    font-weight: 500;
    color: #232323;
    justify-content: center;

    ${media.tablet.at(
        css => css`
            justify-content: space-between;
        `
    )}

    ${media.tablet.to(
        css => css`
            ${MapButton} {
                display: none;
            }

            width: 100%;
            background: white;
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
            margin: 0;
            font-size: 15px;
        `
    )}


    > * {
        background: white;
        padding: 13px 15px 12px;

        border-radius: 4px;

        &:not(:first-child) {
            margin-left: 11px;
        }

        ${media.tablet.at(
            css => css`
                background: #f2f2f2;
                padding: 8px 12px;
            `
        )}
    }
`;
