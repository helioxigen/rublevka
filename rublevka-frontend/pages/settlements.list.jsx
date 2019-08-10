import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import groupBy from 'lodash/groupBy';
import { Header, PageLink } from '@components/UI';
import { Hero, ListSection, ListNav } from '@components/Settlements';
import { Element, Link as ScrollLink } from 'react-scroll';
import { SearchForm } from '@components/Forms';
import { Breadcrumbs } from '@components';
import { fetchSettlements } from '@store';
import { dict, app, media, seo } from '@utils';

const SettlementsListPage = ({ className, query: { name: settlementName, distance = { from: 0 } } }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSettlements());
    }, []);

    const list = useSelector(state => state.settlements.list);

    const settlements = useMemo(() => {
        const filteredList = list.filter(({ name, location: { mkadDistance = 0 } = {} }) => {
            const nameMatched = name.match(new RegExp(settlementName, 'ig'));

            if (!nameMatched) return false;

            const { from = 0, to = mkadDistance } = distance;

            const isMin = from <= mkadDistance;
            const isMax = to >= mkadDistance;

            return to ? isMin && isMax : isMin;
        });

        const grouped = Object.entries(groupBy(filteredList, i => i.name.toLowerCase().charAt(0)));

        return dict.settlements.sortEntries(grouped);
    }, [list, distance, list]);

    return (
        <main className={className}>
            <Hero
                breadcrumbs={
                    <Breadcrumbs
                        className="breadcrumbs"
                        second={['/settlements.list', '/zagorodnaya/kottedzhnye-poselki', 'Посёлки']}
                    />
                }
            >
                <Header.Settlements className="list-header">
                    Посёлки на {app.ifDomain('Рублёвке', 'Риге')}
                </Header.Settlements>
                <SearchForm type="settlements" initialState={{ settlementName, distance }} />
            </Hero>
            <article>
                {settlements.map(([firstLetter, items]) => (
                    <ListSection key={firstLetter + items.length}>
                        <Element name={`anchor-${firstLetter}`}>
                            <h2>{firstLetter}</h2>
                            {items.map(({ name, id }) => (
                                <PageLink to="settlements.item" params={{ id, name }} key={name} />
                            ))}
                        </Element>
                    </ListSection>
                ))}
                <ListNav
                    list={settlements
                        .filter((_, idx) => idx % 2 === 0)
                        .map(([firstLetter]) => (
                            <ScrollLink key={firstLetter} to={`anchor-${firstLetter}`} smooth offset={-60}>
                                {firstLetter}
                            </ScrollLink>
                        ))}
                />
            </article>
        </main>
    );
};

// eslint-disable-next-line no-unused-vars
SettlementsListPage.getInitialProps = async ({ query: { name, distance = '{}' } }) => {
    // console.log(store.getState().settlements);

    return {
        title: 'Посёлки',
        meta: seo.settlements.list,
        query: { name, distance: JSON.parse(distance) },
        menuEntry: 'settlements',
    };
};

export default styled(SettlementsListPage)`
    .hero-container,
    article {
        margin: 0 auto;

        ${media.at(css => ({
            tablet: css`
                max-width: 720px;
            `,
            desktop: css`
                max-width: 925px;
            `,
        }))}

        height: 100%;
    }

    article {
        position: relative;
        padding: 0 15px;

        ${ListSection} {
            margin: 0 0 28px;

            ${media.at(css => ({
                phoneL: css`
                    margin: 0 0 32px;
                `,
                tablet: css`
                    margin: 0 0 37px;
                `,
            }))}

            &:first-child {
                margin-top: 24px;

                ${media.at(css => ({
                    phoneL: css`
                        margin-top: 40px;
                    `,
                    tablet: css`
                        margin-top: 46px;
                    `,
                }))}
            }
        }
    }

    .breadcrumbs {
        ${media.tablet.to(
            css => css`
                display: none;
            `
        )}
    }

    nav a {
        color: rgba(255, 255, 255, 0.75) !important;
    }
`;
