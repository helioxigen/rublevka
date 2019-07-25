import styled from 'styled-components';
import { ListSection } from '@components/Settlements';
import { media } from '@utils';

export default styled.main`
    .hero-container,
    article {
        margin: 0 auto;

        ${media.at(css => ({
            tablet: css`
                max-width: 720px;
            `,
            desktop: css`
                max-width: 925px;
            `,
        }))}

        height: 100%;
    }

    article {
        position: relative;
        padding: 0 15px;

        ${ListSection} {
            margin: 0 0 28px;

            ${media.at(css => ({
                phoneL: css`
                    margin: 0 0 32px;
                `,
                tablet: css`
                    margin: 0 0 37px;
                `,
            }))}

            &:first-child {
                margin-top: 24px;

                ${media.at(css => ({
                    phoneL: css`
                        margin-top: 40px;
                    `,
                    tablet: css`
                        margin-top: 46px;
                    `,
                }))}
            }
        }
    }

    .breadcrumbs {
        ${media.tablet.to(
            css => css`
                display: none;
            `
        )}
    }

    nav a {
        color: rgba(255, 255, 255, 0.75) !important;
    }
`;
