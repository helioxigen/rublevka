import config from '@config';

const isRublevka = config.app === 'rublevka';

const ifDomain = (ifRublevka, ifRiga) => (isRublevka ? ifRublevka : ifRiga);

const getConfig = () => config.sites[config.app];

export const PROPERTIES_FETCHED = 'List.Fetched';

export default {
    ifDomain,
    getConfig,
};
