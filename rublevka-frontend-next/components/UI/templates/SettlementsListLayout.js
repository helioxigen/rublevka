import styled from 'styled-components';
import { Hero, ListSection } from '@components/Settlements';
import { media } from '@utils';
import { Breadcrumbs } from '@components';

export default styled.main`
    .hero-container, article {
        margin: 0 auto;
        ${media.sm`
            max-width: 740px;
        `}

        ${media.md`
            max-width: 960px;
        `}

        ${media.lg`
            max-width: 1340px;
                
        `}

        height: 100%;
    }


    article {
        position: relative;

        ${ListSection} {
            margin-bottom: 28px;

            ${media.xs`
                margin-bottom: 32px;
            `}

            ${media.md`
                margin-bottom: 37px;
            `}

            &:first-child {
                margin-top: 24px;

                ${media.xs`
                    margin-top: 40px;
                `}

                ${media.md`
                    margin-top: 46px;
                `}
            }
        }
    }

    ${Breadcrumbs} a{
        color: rgba(255,255,255,0.75)!important;
    }
`;
