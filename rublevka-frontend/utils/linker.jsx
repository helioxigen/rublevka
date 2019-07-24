/* eslint-disable */
import React from 'react';
import dict from './dict';

// const tos = {
// settlements: () => ({
//     href: '/settlements.list',
//     as: '/zagorodnaya/kottedzhnye-poselki',
//     label: 'Посёлки',
// }),
// 'settlements.item': ({ id, name }) => ({
//     href: `/settlements.item?id=${id}`,
//     as: `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(name)}_${id}`,
//     label: name,
// }),
//     contacts: () => ({
//         href: '/contacts',
//         label: 'Контакты',
//     }),
// };

/**
 * @template M, K
 * @typedef {Parameters<M[K]>[0]} ToArgs
 */

/**
 * @template M
 * @typedef {<M, K extends keyof M>(props: { to: K, params: ToArgs<K, M> }) => React.ReactNode} PageLink
 */

/**
 *  @typedef {{ [key: string]: (data) => LinkDest}} LinkdMap
 */

/**
 * @template M
 * @typedef {<K extends keyof M>(props: { to: K, params: Parameters<M[K]>})} Linkkk
 */

/**
 * @typedef {{ href, as, label}} LinkDest
 * @type {<LinkedMap>(linkedMap: LinkedMap) => { PageLink: Linkkk<typeof LinkedMap>, Par: Parameters<(typeof LinkedMap)['settlements.item']>[0] }
 */
const createLinks = linkedMap => {
    /**
     * @typedef {typeof linkedMap} ToFns
     * @type {<K extends keyof ToFns>(props: { to: K, params: ToArgs<K> })}
     */
    const PageLink = ({ to, params, children }) => {
        const tpl = linkedMap[to];

        const { as, href, label } = tpl(params);

        return (
            <Link href={href} as={as}>
                {children || <a>{label}</a>}
            </Link>
        );
    };

    return {
        PageLink,
    };
};

const xss = {
    'settlements.item': ({ id, name }) => ({
        href: `/settlements.item?id=${id}`,
        as: `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(name)}_${id}`,
        label: name,
    }),
};

/**
 * @template XD
 * @param {XD} ma
 */
const Qt = ma => {};

Qt({
    'settlements.item': ({ id, name }) => ({
        href: `/settlements.item?id=${id}`,
        as: `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(name)}_${id}`,
        label: name,
    }),
});

const links = {
    settlements: () => ({
        href: '/settlements.list',
        as: '/zagorodnaya/kottedzhnye-poselki',
        label: 'Посёлки',
    }),
    'settlements.item': ({ id, name }) => ({
        href: `/settlements.item?id=${id}`,
        as: `/zagorodnaya/kottedzhnye-poselki/${dict.translit.byLetters(name)}_${id}`,
        label: name,
    }),
    contacts: () => ({
        href: '/contacts',
        label: 'Контакты',
    }),
};

const qq = createLinks(links);

const X = <qq.PageLink to="settlements.item" params={{}} />;
