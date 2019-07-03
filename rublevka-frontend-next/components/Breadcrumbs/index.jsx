import React from 'react';
import styled from 'styled-components';
import { dict } from '@utils';
import Item from './Item';

const Breadcrumbs = ({ className, dealType, last = false }) => (
    <nav className={className}>
        <ol itemScope itemType="http://schema.org/BreadcrumbList">
            {[
                ['/', 'Главная'],
                [`/zagorodnaya/${dict.translit(dealType)}`, dict.translateDealType(dealType).noun],
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
    padding-top: 28px;
    ol {
        padding: 0;
        margin: 0;
        display: flex;
        list-style: none;
    }
`;
