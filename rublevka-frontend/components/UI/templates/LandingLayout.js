import styled from 'styled-components';
import Location from '../../Landing/Location';

import { Button } from '../atoms';
import { media, sc } from '@utils';

export default styled.main`
    ${media.tablet.at(
        css => css`
            display: grid;

            grid-template:
                100vh repeat(2, 640px)
                / [start] 20px [first] 40fr 60fr [last] 20px [end];

            grid-gap: 30px;

            .object-block {
                display: none;
            }

            .call-block {
                padding: 0 114px;
                grid-column: first / span last;
                color: ${sc.theme.colors.black};
                background: linear-gradient(115.53deg, #eeeeee 0%, rgba(238, 238, 238, 0.25) 100%);
            }

            .sell-block {
                padding: 0 42px;
                text-align: center;

                grid-row: 3;
                grid-column: 3;
            }
        `
    )}

    .landing-hero {
        grid-column: 1 / span end;
    }

    ${media.tablet.to(
        css => css`
            .call-block {
                background: url('/static/landing/call.background.jpg') center / cover no-repeat;
                color: white;
            }

            .sell-block {
                h3 {
                    text-align: left;
                }
                text-align: left;
                ${Button} {
                    font-weight: 600;
                    line-height: initial;
                    padding: 0;
                    &,
                    &:hover,
                    &:active {
                        background: none;
                    }

                    color: ${sc.theme.colors.red};
                }
            }

            figure {
                height: 260px;

                img {
                    object-position: auto 60%;
                }
            }
        `
    )}

    figure {
        grid-row: 3;
        grid-column: first;

        margin: 0;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    ${Location} {
        grid-column: first / span last;
        margin: 40px 0 0;

        ${media.xs`
            margin-bottom: 32px;
        `}

        ${media.md`
            margin: 60px 0 72px;
        `};
    }
`;
