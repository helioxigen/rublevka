import styled from 'styled-components';
import { Section } from '@components/Item';
import { Gallery } from '@components/Catalog';
import { Header } from '../atoms';
import { media } from '@utils';

export default styled.main`
    display: flex;

    > article,
    > aside {
        background: #ffffff;
        border: 1px solid #eeeeee;
        box-sizing: border-box;
        border-radius: 4px;
    }

    > article {
        flex: 1 0 auto;
        /* width: 700px; */
        padding: 24px 20px;

        ${Header.Item} {
            margin-bottom: 20px;
        }

        ${Gallery} {
            margin: 20px 0;
        }

        ${Section} {
            margin: 20px 0 32px;
        }
    }

    > aside {
        flex: 1 0 auto;
        display: none;
        margin-left: 20px;

        ${media.lg`
            display: block;
        `}

        > * {
            padding: 24px 20px;
        }

        > header {
            display: flex;
            flex-direction: column;
            justify-content: center;

            border-bottom: 1px solid #eeeeee;
        }
    }
`;
