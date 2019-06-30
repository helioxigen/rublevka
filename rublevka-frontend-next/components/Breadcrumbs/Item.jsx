import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Icon } from '@components/UI';

const Breadcrumb = ({ className, href, idx, title }) => (
    <li className={className} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
        <Link href={href}>
            <a itemProp="item">
                <span itemProp="name">{title}</span>
                <meta itemProp="position" content={idx + 1} />
                <Icon name="arrow-left" />
            </a>
        </Link>
    </li>
);

export default styled(Breadcrumb)`
    margin: 0;
    padding: 0;

    ${Icon} {
        width: 4px;
        height: 8px;
        margin: 0 7px 0 10px;
        fill: rgba(35, 35, 35, 0.5);
        display: none;
    }

    &:not(:last-child) ${Icon} {
        display: block;
    }
`;
