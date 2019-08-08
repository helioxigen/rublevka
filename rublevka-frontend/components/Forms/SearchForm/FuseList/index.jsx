import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { PageLink } from '@components/UI';
import config from '@config';
import { media } from '@utils';
import { useFuseSearch } from '@hooks';

const FuseList = ({ className, listSelector, value }) => {
    const list = useSelector(listSelector);
    const results = useFuseSearch(value, list) || config.site.popularSettlements;

    return (
        <ul className={className}>
            {results
                .map(({ id, name }) => [id, name])
                .slice(0, 10)
                .map(([id, name]) => (
                    <li key={`${id}${name}`}>
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

    overflow: hidden;

    border-radius: 8px;

    ${media.desktop.to(
        css => css`
            li {
                display: none;
            }

            li:nth-child(-n + 5) {
                display: block;
            }
        `
    )}

    li {
        line-height: 20px;
        font-size: 16px;
        padding: 0;
        margin: 0;

        &:hover a {
            transform: translateX(15px) scale(1.07);
        }
    }
    a {
        line-height: 20px;
        font-size: 16px;
        display: block;

        transition: 225ms cubic-bezier(0.55, 0.055, 0.675, 0.19);

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
