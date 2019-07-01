import styled from 'styled-components';
import Breadcrumbs from '@components/Breadcrumbs';
import { media } from '@utils';
import { Header } from '../atoms';

export default styled.section`
    display: grid;
    grid-template:
        'nav'
        'header' 46px
        'triggers' 29px
        'cards'
        'footer';

    grid-gap: 10px;

    padding: 18px 10px 0;

    ${media.lg`
        grid-template:
        'nav nav nav nav'
        'header header header header' 90px
        'filter cards cards cards'
        '. footer footer footer' 200px;
        width: auto;

        padding-top: 28px;
    `}

    margin: 0 auto;

    ${Breadcrumbs} {
        grid-area: nav;
    }

    ${Header.Catalog} {
        grid-area: header;
    }
`;
