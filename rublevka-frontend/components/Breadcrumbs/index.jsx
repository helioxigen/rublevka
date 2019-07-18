import React from 'react';
import styled from 'styled-components';
import compact from 'lodash/compact';
import { dict } from '@utils';
import Item from './Item';

const Breadcrumbs = ({ className, dealType, second, last = false }) => (
    <nav className={className}>
        <ol itemScope itemType="http://schema.org/BreadcrumbList">
            {compact([
                ['/', undefined, 'Главная'],
                second || [
                    `/catalog?dealType=${dict.translit.byWord(dealType)}`,
                    `/zagorodnaya/${dict.translit.byWord(dealType)}`,
                    dict.translateDealType(dealType).noun,
                ],
                last,
            ]).map(([href, as, title], idx) => (
                <Item key={href} idx={idx} href={href} asPath={as} title={title} />
            ))}
        </ol>
    </nav>
);

export default styled(Breadcrumbs)`
    grid-area: nav;
    margin: 28px 0 16px;

    ol {
        padding: 0;
        margin: 0;
        display: flex;
        list-style: none;
    }
`;
