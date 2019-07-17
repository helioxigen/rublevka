import styled from 'styled-components';
import { MapButton } from '@components/Catalog';
import { media } from '@utils';

export default styled.div`
    display: flex;

    font-size: 16px;
    font-weight: 500;
    color: #232323;

    ${media.upToDesktop`
        justify-content: space-between;
    `}

    ${media.upToTablet`
        ${MapButton} {
            display: none;
        }

        justify-content: center;

        width: 100%;
        background: white;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
        margin: 0;
        font-size: 15px;
    `}

    justify-content: unset;

    > * {
        background: #f2f2f2;
        border-radius: 4px;

        padding: 8px 12px;

        &:not(:first-child) {
            margin-left: 11px;
        }

        ${media.upToTablet`
            background: white;
            padding: 13px 15px 12px;
        `}
    }
`;
