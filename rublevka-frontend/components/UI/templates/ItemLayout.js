import styled from 'styled-components';
import { Section } from '@components/Item';
import { FavoriteButton } from '@components/UI';
import { Gallery } from '@components/Catalog';
import { ContactToolbar } from '@components/Toolbars';
import { Header } from '../atoms';
import { media } from '@utils';

export default styled.main`

    ${ContactToolbar} {
        padding: 8px 15px;
        border: 1px solid #eeeeee;
        box-shadow: 0px -3px 4px rgba(0, 0, 0, 0.05);

        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;

        ${media.tablet.at(
            css => css`
                display: none;
            `
        )}
    }

    ${media.desktop.at(
        css => css`
            display: grid;
            grid-template-columns: minmax(300px, 740px) 360px;
            grid-gap: 30px;

            > article,
            > aside {
                background: #ffffff;
                border: 1px solid #eeeeee;
                box-sizing: border-box;
                border-radius: 4px;
            }
        `
    )}

    > article {
        margin-top: 18px;
        

        ${media.tablet.at(
            css => css`
                max-width: 740px;
                margin-top: 0;
            `
        )}

        ${media.desktop.at(
            css => css`
                padding: 24px 20px;
            `
        )}

        ${Header.Item} {
            margin-bottom: 18px;
            padding: 0 15px;

            ${media.desktop.at(
                css => css`
                    margin-bottom: 20px;
                    padding: 0;
                `
            )}
        }

        ${media.desktop.at(
            css => css`
                ${Gallery} {
                    margin: 20px 0;
                }
            `
        )}

        ${Section} {
            margin: 12px 0 16px;
            ${media.desktop.at(
                css => css`
                    margin: 20px 0 32px;
                `
            )}

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    > aside {
        align-self: flex-start;
        display: none;

        ${media.desktop.at(
            css => css`
                display: block;
            `
        )}

        > * {
            padding: 24px 20px;
        }

        > header {
            display: flex;
            flex-direction: column;
            justify-content: center;

            font-size: 24px;
            font-weight: 500;

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
