import { instance } from './instance';

const limit = 24;
const maxLimit = 256;

const repeatList = apiFn => async query => {
    const first = await apiFn(query, 0);

    const count = Math.ceil(first.pagination.total / maxLimit) - 1;

    const tail = await Promise.all([...new Array(count)].map((_, idx) => apiFn(query, (idx + 1) * 256)));

    return { items: [first, ...tail].reduce((acc, resp) => acc.concat(resp.items), []), total: first.pagination.total };
};

export default {
    properties: {
        getOne: id => instance(`properties/country/${id}`),
        getMany: (page, query) =>
            instance('properties/country', { pagination: { limit, offset: page * limit - limit }, ...query }),
        getChunk: (query, chunkIdx = 0, chunkSize = 256) =>
            instance('properties/country', {
                pagination: { limit: chunkSize, offset: chunkIdx * chunkSize },
                ...query,
            }),
    },
};
