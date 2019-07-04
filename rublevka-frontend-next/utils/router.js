import Router from 'next/router';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
// import { filter as filterUtils } from '@utils';

const pushFilter = filter => {
    const { page, dealType } = Router.query;

    // const url = {
    //     path: '/catalog',
    //     pathname: window.location.pathname,
    //     query: {
    //         ...(page ? { page } : {}),
    //         ...filterUtils.query.filterToQuery(filter),
    //     },
    // };

    // console.log(url, Router.query, Router, filterUtils.query.filterToQuery(filter));

    const cleanFilter = pickBy(filter, v => !isEmpty(v));

    const query = pickBy(
        {
            page,
            filter: !isEmpty(cleanFilter) ? JSON.stringify(cleanFilter) : {},
        },
        v => !isEmpty(v)
    );

    console.log(query, Router);

    Router.push(
        {
            pathname: '/catalog',
            query,
        },
        {
            pathname: `/zagorodnaya/${dealType}`,
            query,
        },
        { shallow: true }
    );
};

export default {
    pushFilter,
};
