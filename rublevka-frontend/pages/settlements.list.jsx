import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import groupBy from 'lodash/groupBy';
import { Header, PageLink } from '@components/UI';
import { Hero, ListSection, ListNav } from '@components/Settlements';
import { Element, Link as ScrollLink } from 'react-scroll';
import { SearchForm } from '@components/Forms';
import { Breadcrumbs } from '@components';
import { fetchSettlements } from '@store';
import { dict, app, media, seo } from '@utils';

const SettlementsListPage = ({ className }) => {
    const list = useSelector(state => state.settlements.list);

    const settlements = useMemo(() => {
        const grouped = Object.entries(groupBy(list, i => i.name.toLowerCase().charAt(0)));

        return dict.settlements.sortEntries(grouped);
    }, [list]);

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
                <SearchForm type="settlements" />
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

SettlementsListPage.getInitialProps = async ({ store }) => {
    await store.dispatch(fetchSettlements());

    return { title: 'Посёлки', meta: seo.settlements.list, menuEntry: 'settlements' };
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
