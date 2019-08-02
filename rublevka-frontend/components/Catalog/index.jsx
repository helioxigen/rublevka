import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { CardsGrid } from '@components/UI';
import { media, dict, app, optional } from '@utils';
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

    const title = optional
        .str(
            dict.translateDealType(dealType).verb,
            (dict.translateKind(kind).noun || 'недвижимость').toLowerCase(),
            locationTitle || `на ${app.ifDomain('Рублёвке', 'Риге')}`
        )
        .join(' ');

    return (
        <main className={className} data-single={single}>
            <FloatingControls onFilterClick={toggleFilter} />
            {/* <FitHeader title={title} tag={titleTag} noMap={noMap} /> */}
            <header>
                <Header as={titleTag}>{title}</Header>
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

        ${Toolbar} {
            padding-left: 36px;
            flex: 0 0 auto;
        }

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
