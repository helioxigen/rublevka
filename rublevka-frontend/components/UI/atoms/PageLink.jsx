import React from 'react';
import Link from 'next/link';
import routes from '../../../routes';

/**
 * @template K
 * @typedef {Parameters<Routes[K]>[0]} ToArgs
 */

/**
 * @typedef {typeof routes} Routes
 * @type {<K extends keyof Routes>(props: { to: K, params: ToArgs<K> })}
 */
export default ({ to, params, children }) => {
    const tpl = routes[to];

    const { as, href, label } = tpl(params);

    return (
        <Link href={href} as={as}>
            {children || <a>{label}</a>}
        </Link>
    );
};
