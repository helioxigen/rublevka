import { API } from 'core/config/sources';
import { DADATA } from 'cem/config/sources';

const traverseObject = (object, keys) => {
  const [key, ...nextKeys] = keys;
  const value = object[key];
  if (value instanceof Object) {
    return traverseObject(value, nextKeys);
  }
  return value;
};

const getPath = (object, objectPath) => {
  const keys = objectPath.split('.');
  return traverseObject(object, keys);
};

const getKeys = (object, keys) => keys.map(key => getPath(object, key)).filter(item => item);

export const fetchDictionary = (kind, parentId = null) => (value, valueKey = 'id', id, callback, exclude = [], parent = parentId) => {
  const filter = {
    'filter[kind]': kind,
    'filter[title]': value ? `*${value}*` : undefined,
    'filter[id]': id,
    'filter[parentId]': (parent && !id) && `${parent}`,
    'filterNot[id]': exclude,
  };

  API.get('/v1/dictionary_items', filter).then(
    ({ body: { items } }) => {
      callback(items);
    },
  );
};

export const findCompanies = (query, options, callback) => {
  if (options.length) callback(options);
  if (!options.length) {
    return DADATA.post('/suggest/party', { count: 10, query }).then(({ body: { suggestions } }) => {
      const newOptions = suggestions.map(item => ({ label: `Добавить ${item.value} (ОГРН: ${item.data.ogrn})\n${item.data.address.value}?`, ...item.data }));
      if (callback) {
        callback(newOptions);
      }
      return Promise.resolve(newOptions);
    });
  }
};

export const fetchResource = (resource, filterBy, labels, customFilterNot = {}, customFilter = {}, postProcess) => (value, valueKey = 'id', id, callback, exclude = [], linkedTo = {}) => {
  const labelKeys = labels || [filterBy];
  const linkedFilter = {};
  Object.keys(linkedTo).map(key => (linkedFilter[`filter[${key}]`] = linkedTo[key]));

  // TODO: Extract custom filter reducing logic
  const options = {
    [`filter[${valueKey}]`]: id,
    [`filterNot[${valueKey}]`]: exclude,
    ...linkedFilter,
    ...Object.keys(customFilter).reduce((result, key) => ({
      ...result,
      [`filter[${key}]`]: customFilter[key],
    }), {}),
    ...Object.keys(customFilterNot).reduce((result, key) => ({
      ...result,
      [`filterNot[${key}]`]: customFilterNot[key],
    }), {}),
    pagination: {
      limit: 256,
    },
  };

  if (filterBy) options[`filter[${filterBy}]`] = value ? `*${value}*` : undefined;

  API.get(resource, options).then(
    ({ body: { items } }) => {
      const selectOptions = items.map((item) => {
        const label = (labels instanceof Function) ? labels(item) : getKeys(item, labelKeys).join(' ');
        return { value: item.id, label, ...item };
      });
      if (!postProcess) callback(selectOptions);
      if (postProcess) postProcess(value, selectOptions, callback);
    },
  );
};

export const fetchAddress = (count, locations = []) => (query, valueKey, value, callback) => {
  if (query) {
    return DADATA.post('/suggest/address', { count, query, locations }).then(({ body: { suggestions } }) => {
      const options = suggestions.map(item => ({ value: item.data.fias_id, label: item.value, data: item.data, isFromDadata: true }));
      if (callback) callback(options);
      return Promise.resolve(options);
    });
  }
};

export const findAddress = (query, options, callback) => {
  if (options.length) callback(options);
  if (!options.length) {
    fetchAddress(10)(query, null, null, callback);
  }
};

export const fetchCompanies = (count, postProcess) => (query, valueKey, value, callback) => {
  if (query) {
    return DADATA.post('/suggest/party', { count, query }).then(({ body: { suggestions } }) => {
      const options = suggestions.map(item => ({ value: false, label: `${item.value} (ОГРН: ${item.data.ogrn})\n${item.data.address.value}`, data: item.data }));
      if (callback) {
        if (postProcess) postProcess(options, callback);
        if (!postProcess) callback(options);
      }
      return Promise.resolve(options);
    });
  }
  if (value) {
    API.get(`/v1/companies/${value}`).then(({ body }) => callback([{ value: body.id, label: body.name, ...body }]));
  }
};
