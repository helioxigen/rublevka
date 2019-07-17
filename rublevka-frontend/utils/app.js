import config from '@config';

const isRublevka = config.app === 'rublevka';

const ifDomain = (ifRublevka, ifRiga) => (isRublevka ? ifRublevka : ifRiga);

/**
 * @typedef SiteConfig
 * @property {string} phone
 * @property {string} phoneNumbers
 * @property {string} email
 * @property {string} imagePostfix
 * @property {Array<number>} routes
 */

/**
 * @returns {SiteConfig}
 */
const getConfig = () => config.sites[config.app];

export const PROPERTIES_FETCHED = 'List.Fetched';

export default {
    ifDomain,
    getConfig,
    // getRouteIds,
};
