import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import { PageLink } from '@components/UI';
import config from '@config';

const FuseList = ({ className, listSelector, value }) => {
    const [results, setResults] = useState(config.site.popularSettlements);
    const list = useSelector(listSelector);

    const fuse = useMemo(
        () =>
            new Fuse(list, {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: ['name'],
            }),
        [list]
    );

    useEffect(() => {
        if (value) {
            const res = fuse.search(value);

            if (res !== results) {
                setResults(
                    Object.values(res)
                        .map(({ id, name }) => [id, name])
                        .slice(0, 10)
                );
            }
        }
    }, [value]);

    return (
        <ul className={className}>
            {results.map(([id, name]) => (
                <li key={id}>
                    <PageLink to="settlements.item" params={{ id, name }} />
                </li>
            ))}
        </ul>
    );
};

export default styled(FuseList)`
    min-width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    font-weight: 500;
    background: white;

    box-sizing: border-box;

    border-radius: 8px;

    li {
        line-height: 20px;
        font-size: 16px;
        padding: 0;
        margin: 0;
    }
    a {
        line-height: 20px;
        font-size: 16px;
        display: block;

        text-transform: uppercase;
        text-decoration: none;
        padding: 8px 16px;
        color: #232323;

        &:hover {
            background: rgba(244, 67, 54, 0.25);
            cursor: pointer;
        }
    }
`;
