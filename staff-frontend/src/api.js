import axios from 'axios';

// to utils
const environment = {
  legacy: 'legacy',
  development: 'development',
};

// to utils
const currEnvironment = environment.development;

// core

const baseUrlByEnvironment = {
  [environment.development]: 'https://staff-dev.rublevka.ru/v1/',
  [environment.legacy]: 'https://staff-dev.rublevka.ru/v1/',
};

const getApi = () => {
  const baseUrl = baseUrlByEnvironment[currEnvironment];
  return axios.create({
    baseURL: baseUrl,
    headers: {},
  });
};

// api methods

const getProperty = id => getApi().get(`properties/country/${id}`);

const getPropertiesList = () => getApi().get('properties/country/');

export const properties = { getProperty, getPropertiesList };

export default { properties };
