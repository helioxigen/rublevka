import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';

const cleanObject = obj => pickBy(obj, v => !isEmpty(v));

const sleep = ms => new Promise(res => setTimeout(res, ms));

export default {
    cleanObject,
    sleep,
};
