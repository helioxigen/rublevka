import Router from 'next/router';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import compact from 'lodash/compact';

const optionalFn = (fn, getArg) => (typeof fn === 'function' ? fn(getArg()) : fn);

const to = (
    pathname,
    buildQuery = [] || (qry => [qry.qry, 'asQry']),
    buildAsPath = [] || (qry => [qry.path, qry.path]),
    hide = []
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
        query: pickBy(asQuery, (_, key) => !hide.includes(key)),
    };

    return { href, as };
};

const go = ({ href, as }, shallow, resetScroll = false) =>
    Router.push(href, as, { shallow }).then(() => resetScroll && window.scrollTo(0, 0));

const queryTpl = {
    catalog: query => q => [
        { dealType: query.dealType || q.dealType, ...query, filter: query.filter || null, orderBy: null },
        query.filter && { filter: query.filter },
    ],
};

const goTo = {
    settlements: (query = {}) => go(to('/settlements.list', [query, query], ['kottedzhnye-poselki'])),
    catalog: (query = {}) =>
        go(
            to('/catalog', queryTpl.catalog(query), q => [query.dealType || q.dealType, query.kind || q.kind]),
            undefined,
            true
        ),
    map: (query = {}) => go(to('/catalog.map', queryTpl.catalog(query), q => [q.dealType, 'map', q.kind])),
};

const pushQuery = (queryObj, internalQuery, pathnamePostfix) => {
    const { kind, ...pageQuery } = Router.query;

    const isMap = Router.pathname === '/catalog.map';

    const { dealType, ...shared } = {
        ...pageQuery,
        ...queryObj,
    };

    const { hidden, permanentPath } =
        Router.pathname === '/settlements.item'
            ? {
                  hidden: ['id'],
                  permanentPath: `kottedzhnye-poselki/${pageQuery.name}_${pageQuery.id}`,
              }
            : {};

    go(
        to(
            Router.pathname,
            () => [{ dealType, ...internalQuery, ...shared, permanentPath }, shared],
            q =>
                Router.pathname === '/settlements.item'
                    ? [permanentPath]
                    : [q.dealType, isMap && 'map', pathnamePostfix],
            hidden
        )
    );
};

export default {
    pushQuery,
    goTo,
    to,
};
