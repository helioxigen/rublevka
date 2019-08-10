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
 * @type {<K extends keyof Routes>(to: K, params: ToArgs<K>, resetScrollTop?: boolean) => Promise<boolean>}
 */
const navTo = (to, params, resetScrollTop = false) => {
    const tpl = routes[to];

    const { as, href } = tpl(params);

    const pushReq = Router.push(href, as);

    if (resetScrollTop) {
        pushReq.then(() => {
            window.scrollTo(0, 0);
        });
    }
};

export default {
    to: navTo,
};
