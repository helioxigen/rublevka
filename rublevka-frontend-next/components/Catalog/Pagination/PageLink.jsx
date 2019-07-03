import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { sc } from '@utils';

const PageLink = ({ className, page, current }) =>
    current ? (
        <span data-current="true" className={className}>
            {page}
        </span>
    ) : (
        <Link href={`?page=${page}`}>
            <a className={className}>{page}</a>
        </Link>
    );

export default styled(PageLink)`
    width: 2.5em;
    height: 2.5em;

    display: flex;
    justify-content: center;
    align-items: center;

    text-decoration: none;

    border-radius: 50%;

    color: #232323;

    transition: background 0.1s;

    &:hover:not([data-current='true']) {
        background: #fcd0cd;
    }

    &[data-current='true'] {
        color: white;
        background: #f44336;
    }
`;
