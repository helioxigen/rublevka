import styled from 'styled-components';
import { Filter, Breadcrumbs, Pagination } from '@components';
import { media } from '@utils';
import CardsGrid from './CardsGrid';
import Toolbar from './Toolbar';
import { Icon } from '../atoms';

export default styled.main`
    display: grid;
    grid-template:
        'header'
        'cards'
        'pagination' 200px;

    grid-gap: 10px;

    @media ${media.device.tabletLandscape} {
        grid-template:
        'header header header header'
        'filter cards cards cards'
        '. pagination pagination pagination' 200px / 
        20% 1fr 1fr 1fr [end]
        ;
        width: auto;
    }

    ${Filter} {
        padding-right: 24px;
        
        position: fixed;

        @media ${media.device.tabletLandscape} {
            position: static;
        }
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

    .floating-controls {
        position: fixed;
        display: flex;
        justify-content: center;
        left: 0;
        right: 0;
        bottom: 32px;

        z-index: 1250;

        @keyframes appear{
            from {
                transform: translateY(200%);
            }
            to {
                transform: translateY(0);
            }
        }

        animation: appear 225ms cubic-bezier(0.250, 0.460, 0.450, 0.940);

        transition: transform 225ms cubic-bezier(0.250, 0.460, 0.450, 0.940);

        &[data-hide="true"] {            
            transform: translateY(200%);
        }

        @media ${media.device.tabletLandscape} {
            display: none;
        }

        .placemark-button{
            padding: 0.7em;
            font-size: 20px;
            flex: 0;
            margin-right: 8px;

            @media ${media.device.tablet} {
                display: none;
            }
        }

        .settings-button {
            line-height: 2.85;
            ${Icon} {
                font-size: 14px;
            }
            text-transform: initial;
        }
    }
`;
