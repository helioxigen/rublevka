import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { sc } from '@utils';

const NavList = ({ className, title, links }) => (
    <nav className={className}>
        <h4>{title}</h4>
        <ul>
            {links.map(([label, { href, as }]) => (
                <li key={label}>
                    <Link href={href} as={as}>
                        <a>{label}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
);

export default styled(NavList)`
    h4 {
        font-size: 15px;
        margin: 0 0 1em;
        text-transform: uppercase;
        color: ${sc.theme.colors.black};
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li {
        font-size: 16px;
        &:not(:last-child) {
            margin: 0 0 12px;
        }
    }

    a {
        text-decoration: none;
        color: #666666;

        &:hover {
            color: ${sc.theme.colors.red};
        }
    }
`;
