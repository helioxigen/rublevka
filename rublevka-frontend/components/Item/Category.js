import styled from 'styled-components';
import { media } from '@utils';
import Summary from './Summary';

export default styled.div`
    ${media.desktop.at(
        css => css`
            margin: 20px 0 32px;

            &:first-child {
                margin-top: 0;
            }

            &:last-child {
                margin-bottom: 0;
            }

            .article-price {
                display: none;
            }
        `
    )}

    ${media.desktop.to(
        css => css`
            background: white;
            border: 1px solid #eeeeee;
            box-sizing: border-box;
            border-radius: 4px;

            padding: 16px 10px;

            margin: 8px 5px;

            ${media.tablet.at(
                () => css`
                    padding: 24px 16px;

                    margin: 16px 5px;
                `
            )}

            > *:first-child {
                margin-top: 0;
            }

            > *:last-child {
                margin-bottom: 0;
            }

            &.main-cat {
                .article-price {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 16px;

                    ${media.tablet.at(
                        () => css`
                            font-size: 23px;
                        `
                    )}

                    ${media.desktop.at(
                        () => css`
                            display: none;
                        `
                    )}
                }

                ${Summary} {
                    .summary-label {
                        display: none;
                    }

                    .summary-param {
                        margin: 0;
                        p {
                            margin: 0;
                        }
                        .summary-value {
                            font-size: 15px;
                            text-transform: lowercase;

                            display: inline-block;

                            color: #232323;
                            font-weight: 400;
                        }

                        &::before {
                            content: ' · ';
                            margin: 0 5px;
                        }

                        &:first-of-type::before {
                            content: '';
                            margin: 0;
                        }

                        .summary-label[data-name='bedrooms'] {
                            display: inline-block;
                            color: currentColor;
                            text-transform: lowercase;
                            margin-left: 5px;
                        }
                    }
                }
            }
        `
    )}
`;
