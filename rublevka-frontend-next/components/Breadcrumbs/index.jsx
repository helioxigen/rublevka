import React from 'react';
import styled from 'styled-components';
import { dict } from '@utils';
import Item from './Item';

const Breadcrumbs = ({ className, dealType, last = false }) => (
    <nav className={className}>
        <ol itemScope itemType="http://schema.org/BreadcrumbList">
            {[
                ['/', 'Главная'],
                [`/zagorodnaya/${dict.translit.byWord(dealType)}`, dict.translateDealType(dealType).noun],
                last,
            ]
                .filter(v => v)
                .map(([link, title], idx) => (
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
