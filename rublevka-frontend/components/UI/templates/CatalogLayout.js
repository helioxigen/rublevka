import styled from 'styled-components';
import { Filter, Breadcrumbs, Pagination } from '@components';
import { media } from '@utils';
import CardsGrid from './CardsGrid';
import Toolbar from './Toolbar';

export default styled.main`
    display: grid;
    grid-template:
        'header'
        'cards'
        'pagination' 200px;

    grid-gap: 10px;

    ${media.minDesktop`
        grid-template:
        'header header header header'
        'filter cards cards cards'
        '. pagination pagination pagination' 200px / 
        20% 1fr 1fr 1fr [end]
        ;
        width: auto;
    `}

    ${Filter} {
        padding-right: 24px;

        ${media.upToMinDesktop`
            position: fixed;
            display: none;
        `}
    }

    margin: 0 auto;

    ${Breadcrumbs} {
        grid-area: nav;
    }

    > header {
        grid-area: header;

        ${media.desktop`
            display: flex;
            justify-content: space-between;
            align-items: flex-start;

            margin-bottom: 32px;
        `}

        ${media.upToTablet`
            h1 {
                display: none;
            }
        `}

        ${media.upToDesktop`
            h1, ${Toolbar} {
                margin-bottom: 1em;
            }
        `}
    }

    ${CardsGrid} {
        grid-area: cards;

        ${media.minDesktop`
            grid-column: 2 / span end;
        `}
    }

    ${Pagination} {
        grid-area: pagination;

        align-self: center;
    }
`;
