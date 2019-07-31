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
import Header from './Header';

const pagination = ({
    properties: {
        pagination: { offset, limit, total },
    },
}) => ({
    current: (offset + limit) / limit,
    total: Math.floor(total / limit),
});

const Catalog = ({
    className,
    shortFilter = false,
    dealType = 'sale',
    kind,
    single,
    noMap = false,
    titleTag,
    locationTitle,
}) => {
    const { current, total } = useSelector(pagination);
    const items = useSelector(state => state.properties.list);
    const fetching = useSelector(state => state.properties.fetching);
    const [isFilterOpen, toggleFilter] = useToggle(false);

    return (
        <main className={className}>
            <header>
                <Header as={titleTag}>
                    {dict.translateDealType(dealType).verb}{' '}
                    {(dict.translateKind(kind).noun || 'недвижимость').toLowerCase()}{' '}
                    {locationTitle || `на ${app.ifDomain('Рублёвке', 'Риге')}`}
                </Header>
                <Toolbar map={!noMap} />
            </header>
            <Filter
                short={shortFilter}
                switchDealType={single}
                className="filter"
                onClose={toggleFilter}
                isOpen={isFilterOpen}
                dealType={dealType}
            />
            <CardsGrid fetching={fetching}>
                {items.map(data => (
                    <Card key={data.id} dealTypeExplicit={dealType} data={data} />
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
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

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

        h1, h2 {
        }
    }
`;
