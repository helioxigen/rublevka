import config from '@config';

const isRublevka = config.app === 'rublevka';

const ifDomain = (ifRublevka, ifRiga) => (isRublevka ? ifRublevka : ifRiga);

export const PROPERTIES_FETCHED = 'List.Fetched';

export default {
    ifDomain,
    config: config.site,
    // getRouteIds,
};
