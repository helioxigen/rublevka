import React from 'react';
import styled from 'styled-components';
import compact from 'lodash/compact';
import { dict } from '@utils';
import Item from './Item';

const Breadcrumbs = ({ className, dealType, second, last = false }) => (
    <nav className={className}>
        <ol itemScope itemType="http://schema.org/BreadcrumbList">
            {compact([
                ['/', 'Главная'],
                second || [`/zagorodnaya/${dict.translit.byWord(dealType)}`, dict.translateDealType(dealType).noun],
                last,
            ]).map(([link, title], idx) => (
                <Item key={link} idx={idx} href={link} title={title} />
            ))}
        </ol>
    </nav>
);

export default styled(Breadcrumbs)`
    margin: 28px 0 16px;

    ol {
        padding: 0;
        margin: 0;
        display: flex;
        list-style: none;
    }
`;
