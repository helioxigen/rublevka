import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Link } from '@components/UI';

const PageLink = ({ className, page, children, current }) => {
    const {
        query: { kind, dealType, page: pageQ, ...query },
    } = useRouter();

    const sharedQuery = {
        ...query,
        page: page !== 1 && page,
    };

    return current ? (
        <span data-current="true" className={className}>
            {page}
        </span>
    ) : (
        <Link
            to="/catalog"
            query={[
                {
                    ...sharedQuery,
                    page,
                    dealType,
                },
                sharedQuery,
            ]}
            path={[dealType, kind]}
        >
            <a className={className}>{children || page}</a>
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
