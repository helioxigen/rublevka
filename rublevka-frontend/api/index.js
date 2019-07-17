import { instance } from './instance';
import { filter } from '@utils';

const limit = 24;

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

    settlements: {
        getOne: id => instance(`places/settlements/${id}`),
        getMany: () =>
            instance('places/settlements', {
                pagination: { limit: 256 },
                ...filter.query.getDefaults('settlements'),
            }),
    },
};
