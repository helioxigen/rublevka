import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import groupBy from 'lodash/groupBy';
import { Header, SettlementsListLayout } from '@components/UI';
import { Hero, ListSection, ListNav } from '@components/Settlements';
import { SearchForm } from '@components/Forms';
import { Element, Link as ScrollLink } from 'react-scroll';
import { Breadcrumbs } from '@components';
import { fetchSettlements } from '@store';
import { dict, app } from '@utils';

const SettlementsListPage = ({ list = [] }) => {
    const settlements = useMemo(() => {
        const grouped = Object.entries(groupBy(list, i => i.name.charAt(0)));

        return dict.settlements.sortEntries(grouped);
    }, [list]);

    return (
        <SettlementsListLayout>
            <Hero
                breadcrumbs={
                    <Breadcrumbs second={['/settlements.list', '/zagorodnaya/kottedzhnye-poselki', 'Посёлки']} />
                }
            >
                <Header.Settlements className="list-header">
                    Посёлки на {app.ifDomain('Рублёвке', 'Риге')}
                </Header.Settlements>
                <SearchForm type="settlements" />
            </Hero>
            <article>
                {settlements.map(([firstLetter, items]) => (
                    <ListSection key={firstLetter + items.length}>
                        <Element name={`anchor-${firstLetter}`}>
                            <h2>{firstLetter}</h2>
                            {items.map(i => (
                                <Link key={i.id} href={`/settlements.item?id=${i.id}`}>
                                    <a>{i.name}</a>
                                </Link>
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
        </SettlementsListLayout>
    );
};

SettlementsListPage.getInitialProps = async ({ store }) => {
    await store.dispatch(fetchSettlements());

    return {};
};

export default connect(state => ({
    list: state.settlements.list,
}))(SettlementsListPage);
