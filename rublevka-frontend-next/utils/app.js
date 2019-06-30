import config from '@config';

const isRublevka = config.app === 'rublevka';

const ifDomain = (ifRublevka, ifRiga) => (isRublevka ? ifRublevka : ifRiga);

const getConfig = () => config.sites[config.app];

export default {
    ifDomain,
    getConfig,
};
