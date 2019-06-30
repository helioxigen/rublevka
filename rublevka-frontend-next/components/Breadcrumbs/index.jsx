import React from 'react';
import styled from 'styled-components';
import { dict } from '@utils';
import Item from './Item';

const Breadcrumbs = ({ className, dealType, last }) => (
    <nav className={className}>
        <ol itemScope itemType="http://schema.org/BreadcrumbList">
            {[['/', 'Главная'], [`/zagorodnaya/${dict.translit(dealType)}`, dict.translateDealType(dealType)], last]
                .filter(v => v)
                .map(([link, title]) => (
                    <Item key={link} href={link} title={title} />
                ))}
        </ol>
    </nav>
);

export default styled();
