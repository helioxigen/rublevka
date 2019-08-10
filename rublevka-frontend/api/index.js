import { instance } from './instance';

import { filter } from '@utils';

const limit = 24;

export default {
    properties: {
        getOne: (id, ...restrictedStates) =>
            instance(`properties/country/${id}`).then((item = {}) => {
                const isRestricted = restrictedStates.includes(item.state);

                if (isRestricted) {
                    throw new Error('Not Found');
                }

                return item;
            }),
        getMany: (page, query) =>
            instance('properties/country', { pagination: { limit, offset: page * limit - limit }, ...query }),
        getChunk: (query, chunkIdx = 0, chunkSize = 256) =>
            instance('properties/country', {
                pagination: { limit: chunkSize, offset: chunkIdx * chunkSize },
                ...query,
            }),
    },

    settlements: {
        getOne: id => instance(`places/settlements/${id}`),
        getMany: () =>
            instance('places/settlements', {
                pagination: { limit: 256 },
                ...filter.query.getDefaults('settlements'),
            }),
    },
};
