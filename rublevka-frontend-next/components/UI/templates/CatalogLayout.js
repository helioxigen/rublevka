import styled from 'styled-components';
import { Filter, Breadcrumbs, Pagination } from '@components';
import { media } from '@utils';
import CardsGrid from './CardsGrid';

export default styled.main`
    display: grid;
    grid-template:
        'header' 46px
        'triggers' 29px
        'cards'
        'pagination';

    grid-gap: 10px;

    ${media.lg`
        grid-template:
        'header header header header' 70px
        'filter cards cards cards'
        '. pagination pagination pagination' 200px / 
        20% 1fr 1fr 1fr [end]
        ;
        width: auto;
    `}

    ${Filter} {
        padding-right: 24px;
    }

    margin: 0 auto;

    ${Breadcrumbs} {
        grid-area: nav;
    }

    > header {
        grid-area: header;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    ${CardsGrid} {
        grid-column: 2 / span end;
    }

    ${Pagination} {
        grid-area: pagination;

        align-self: center;
    }
`;
