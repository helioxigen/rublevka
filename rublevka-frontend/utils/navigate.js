import Router from 'next/router';
import routesTpl from '../routes';
import dict from './dict';

const routes = routesTpl(dict);

/**
 * @template K
 * @typedef {Parameters<Routes[K]>[0]} ToArgs
 */

/**
 * @typedef {typeof routes} Routes
 * @type {<K extends keyof Routes>(to: K, params: ToArgs<K>)}
 */
const navTo = (to, params) => {
    const tpl = routes[to];

    const { as, href } = tpl(params);

    Router.push(href, as);
};

export default {
    to: navTo,
};
