import React from 'react';
import Link from 'next/link';
import { page } from '@utils';

export default ({ to, query, path, children }) => {
    const { as, href } = page.to(to, query, path);

    return (
        <Link href={href} as={as}>
            {children}
        </Link>
    );
};
