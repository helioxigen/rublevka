import React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PageLink = ({ className, page, current }) => {
    const {
        query: { dealType, page: pageQ, ...query },
    } = useRouter();

    const pageQuery = page !== 1 ? { page } : {};

    return current ? (
        <span data-current="true" className={className}>
            {page}
        </span>
    ) : (
        <Link
            shallow
            href={{
                path: '/catalog',
                pathname: '/catalog',
                query: {
                    ...query,
                    ...pageQuery,
                    page,
                    dealType,
                },
            }}
            as={{
                pathname: `/zagorodnaya/${dealType}`,
                query: {
                    ...query,
                    ...pageQuery,
                },
            }}
        >
            <a className={className}>{page}</a>
        </Link>
    );
};

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
