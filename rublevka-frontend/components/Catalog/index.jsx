import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { CardsGrid } from '@components/UI';
import { media, dict, app } from '@utils';
import { Filter, Card } from '@components';
import { useToggle } from '@hooks';
import Toolbar from './Toolbar';
import Pagination from './Pagination';
import FloatingControls from './FloatingControls';

const pagination = ({
    properties: {
        pagination: { offset, limit, total },
    },
}) => ({
    current: (offset + limit) / limit,
    total: Math.floor(total / limit),
});

const Catalog = ({ className, dealType, kind, items, single }) => {
    const { current, total } = useSelector(pagination);
    const fetching = useSelector(state => state.properties.fetching);
    const [isFilterOpen, toggleFilter] = useToggle(false);

    return (
        <main className={className}>
            <header>
                <h1>
                    {dict.translateDealType(dealType).verb}{' '}
                    {(dict.translateKind(kind).noun || 'недвижимость').toLowerCase()} на{' '}
                    {app.ifDomain('Рублёвке', 'Риге')}
                </h1>
                <Toolbar />
            </header>
            <Filter className="filter" onClose={toggleFilter} isOpen={isFilterOpen} dealType={dealType} />
            <CardsGrid fetching={fetching}>
                {items.map(data => (
                    <Card key={data.id} dealType={dealType} data={data} />
                ))}
            </CardsGrid>
            {!single && total > 1 && <Pagination count={total} currentPage={current} />}
            <FloatingControls onFilterClick={toggleFilter} />
        </main>
    );
};

export default styled(Catalog)`
    display: grid;
    grid-template:
        'header'
        'cards'
        'pagination' 200px;

    grid-gap: 10px;

    ${media.desktop.at(
        css => css`
            grid-template:
                'header header header header'
                'filter cards cards cards'
                '. pagination pagination pagination' 200px /
                20% 1fr 1fr 1fr [end];
            width: auto;
        `
    )}

    .filter {
        padding-right: 24px;

        position: fixed;

        ${media.desktop.at(
            css => css`
                position: static;
            `
        )}
    }

    ${CardsGrid} {
        ${media.desktop.at(
            css => css`
                grid-column: 2 / span end;
            `
        )}
    }

    > header {
        grid-area: header;

        ${media.desktopL.to(
            css => css`
                h1,
                ${Toolbar} {
                    margin: 0 0 1em;
                }
            `
        )}

        ${media.desktopL.at(
            css => css`
                display: flex;
                justify-content: space-between;
                align-items: flex-start;

                margin: 0 0 32px;
            `
        )}

        h1 {
            margin: 0;
            font-weight: bold;

            font-size: 28px;

            display: none;

            ${media.at(css => ({
                tablet: css`
                    display: block;
                `,
                desktopL: css`
                    font-size: 32px;
                `,
            }))}
        }
    }
`;
