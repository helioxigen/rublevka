import { instance } from '@api/index';

const getMany = (pagination, filter) => instance('properties/country', { pagination, filter });
const getOne = id => instance(`properties/country/${id}`);

export default {
    getMany,
    getOne,
};
