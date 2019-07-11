import styled from 'styled-components';
import { Section } from '@components/Item';
import { FavoriteButton } from '@components/UI';
import { Gallery } from '@components/Catalog';
import { Header } from '../atoms';
import { media } from '@utils';

export default styled.main`
    display: flex;
    align-items: flex-start;

    > article,
    > aside {
        background: #ffffff;
        border: 1px solid #eeeeee;
        box-sizing: border-box;
        border-radius: 4px;
    }

    > article {
        flex: 1 0 auto;
        width: 740px;
        padding: 24px 20px;

        ${Header.Item} {
            margin-bottom: 20px;
        }

        ${Gallery} {
            margin: 20px 0;
        }

        ${Section} {
            margin: 20px 0 32px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    > aside {
        width: 360px;
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

        > footer {
            border-top: 1px solid #eeeeee;
            padding: 0;

            ${FavoriteButton} {
                padding: 24px 0;

                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;

                height: 66px;
                padding: 0;

                color: #aaa;

                font-size: 15px;

                .favorite-icon {
                    margin-right: 10px;
                }

                .text {
                    width: 95px;
                }
            }
        }
    }
`;
