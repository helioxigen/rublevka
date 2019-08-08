import React from 'react';

import styled from 'styled-components';
import { sc, media } from '@utils';

const ItemHeader = ({ className, children, id }) => (
    <header className={className}>
        <h1>
            {children} <span>№ {id}</span>
        </h1>
    </header>
);

export default styled(ItemHeader)`
    margin: 0 0 16px;

    h1 {
        font-size: 24px;
        font-weight: 500;
        margin: 0;
        display: flex;
        flex-direction: column-reverse;
    }

    span {
        font-size: 15px;
        margin-bottom: 8px;
        color: ${sc.theme.colors.grey};
    }

    ${media.tablet.to(
        css => css`
            h1 {
                font-size: 19px;
            }

            span {
                display: none;
            }
        `
    )}
`;
