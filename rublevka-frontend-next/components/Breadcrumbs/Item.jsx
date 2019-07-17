import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Icon } from '@components/UI';
import { sc } from '@utils';

const Breadcrumb = ({ className, href, idx, title }) => (
    <li className={className} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
        <Link href={href}>
            <a itemProp="item">
                <span itemProp="name">{title}</span>
                <meta itemProp="position" content={idx + 1} />
            </a>
        </Link>
        <Icon name="arrow" />
    </li>
);

export default styled(Breadcrumb)`
    margin: 0;
    padding: 0;

    display: flex;
    align-items: center;

    &:nth-child(2):last-child a {
        color: ${sc.theme.colors.darkGrey};
        pointer-events: none;
    }

    a {
        line-height: 15px;
        font-size: 13px;
        color: ${sc.theme.colors.grey};
        text-decoration: none;
        transition: 0.1s;
    }

    &:hover a {
        color: ${sc.theme.colors.black};
    }

    ${Icon} {
        width: 6px;
        height: 15px;
        margin: 0 7px 0 10px;
        fill: #979797;
        display: none;
    }

    &:not(:last-child) ${Icon} {
        display: inline-block;
    }
`;
