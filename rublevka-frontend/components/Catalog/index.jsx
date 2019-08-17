import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import { CardsGrid, Button } from '@components/UI';
import { media, dict, app, optional } from '@utils';
import { Filter, Card } from '@components';
import { useToggle, useScrollState } from '@hooks';
import Toolbar from './Toolbar';
import Pagination from './Pagination';
import FloatingControls from './FloatingControls';
import Header from './Header';
import { setFilter } from '@store';

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
    prevPage,
    shortFilter = false,
    dealType = 'sale',
    itemsExplicit,
    kind,
    single,
    noMap = false,
    titleTag,
    locationTitle,
    totalItems,
}) => {
    const { current, total } = useSelector(pagination);
    const items = useSelector(state => itemsExplicit || state.properties.list[dealType]);
    const fetching = useSelector(state => state.properties.fetching);
    const totalItemsCatalog = useSelector(state => state.properties.pagination.total);
    const [isFilterOpen, toggleFilter] = useToggle(false);

    const dispatch = useDispatch();

    const [mainRef, mainInView] = useInView();
    const [bottomRef, bottomInView] = useInView();
    const isScrollingDown = useScrollState(true);

    const title = optional
        .str(
            dict.translateDealType(dealType).verb,
            (dict.translateKind(kind).noun || 'недвижимость').toLowerCase(),
            locationTitle || `на ${app.ifDomain('Рублёвке', 'Риге')}`
        )
        .join(' ');

    return (
        <main ref={mainRef} className={className} data-single={single}>
            <FloatingControls
                onFilterClick={toggleFilter}
                isFilterVisible={mainInView && !bottomInView && !isScrollingDown}
                isMapAvailable={!noMap}
            />
            <header>
                <Header as={titleTag}>{title}</Header>
                <Toolbar totalItems={totalItems} map={!noMap} />
            </header>
            <Filter
                totalItems={totalItems || totalItemsCatalog}
                short={shortFilter}
                switchDealType={single}
                className="filter"
                onClose={() => {
                    toggleFilter();
                    window.scrollTo(0, 0);
                }}
                isOpen={isFilterOpen}
                dealType={dealType}
            />
            {!fetching && !items.length && (
                <div className="empty-items">
                    <h2>Не найдено таких объектов</h2>
                    <Button onClick={() => dispatch(setFilter({}, true))}>Новый поиск</Button>
                </div>
            )}
            <CardsGrid fetching={fetching}>
                {items.map(data => (
                    <Card key={data.id} prevPage={prevPage} dealTypeExplicit={dealType} data={data} />
                ))}
            </CardsGrid>
            {!single && total > 1 && <Pagination count={total} currentPage={current} dealType={dealType} />}
            <div ref={bottomRef} />
        </main>
    );
};

export default styled(Catalog)`
    display: grid;
    grid-template:
        'header'
        'cards'
        'pagination';

    grid-gap: 10px;

    &.single {
        margin-bottom: 48px;
    }

    ${media.desktop.at(
        css => css`
            grid-template:
                'header header header header'
                'filter cards cards cards'
                '. pagination pagination pagination' /
                20% 1fr 1fr 1fr [end];
            width: auto;
        `
    )}

    .empty-items {
        grid-area: cards;

        h2 {
            font-weight: 300;
        }

        text-align: center;
    }

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

        &:last-child {
            margin-bottom: 48px;
        }
    }

    ${Pagination} {
        height: 200px;
        justify-content: center;
    }

    > header {
        grid-area: header;

        display: flex;
        align-items: center;

        ${Header} {
            flex: auto;
        }

        ${media.tablet.at(
            css => css`
                ${Toolbar} {
                    padding-left: 36px;
                    flex: 0 0 auto;
                }
            `
        )}

        ${media.desktopL.to(
            css => css`
                h1,
                h2,
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
