import Router from 'next/router';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import compact from 'lodash/compact';

const optionalFn = (fn, getArg) => (typeof fn === 'function' ? fn(getArg()) : fn);

const to = (
    pathname,
    buildQuery = [] || (qry => [qry.qry, 'asQry']),
    buildAsPath = [] || (qry => [qry.path, qry.path])
) => {
    const [query, asQuery] = optionalFn(buildQuery, () => Router.query).map(qry =>
        pickBy(qry, v => (typeof v === 'number' ? v : !isEmpty(v)))
    );

    const href = {
        pathname: `${pathname}`,
        query,
    };

    const as = {
        pathname: `/zagorodnaya/${compact(optionalFn(buildAsPath, () => query)).join('/')}`,
        query: asQuery,
    };

    return { href, as };
};

const go = ({ href, as }, shallow) => Router.push(href, as, { shallow });

const queryTpl = {
    catalog: query => q => [{ dealType: q.dealType, ...query, filter: null, orderBy: null }, query],
};

const goTo = {
    catalog: query => go(to('/catalog', queryTpl.catalog(query), q => [q.dealType, q.kind])),
    map: query => go(to('/catalog.map', queryTpl.catalog(query), q => [q.dealType, 'map', q.kind])),
};

const pushQuery = (queryObj, internalQuery, pathnamePostfix) => {
    const { kind, ...pageQuery } = Router.query;

    const isMap = Router.pathname === '/catalog.map';

    const { dealType, ...shared } = {
        ...pageQuery,
        ...queryObj,
    };

    go(
        to(
            Router.pathname,
            () => [{ dealType, ...internalQuery, ...shared }, shared],
            q => [q.dealType, isMap && 'map', pathnamePostfix]
        )
    );
};

export default {
    pushQuery,
    goTo,
    to,
};
