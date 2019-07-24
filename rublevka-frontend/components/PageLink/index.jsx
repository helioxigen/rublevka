import React from 'react';
import Link from 'next/link';
import routes from '../../routes';

/**
 * @typedef {typeof routes} Routes
 * @type {<K extends keyof Routes>(props: { to: K, params: Parameters<Routes[K]>[0] })}
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
