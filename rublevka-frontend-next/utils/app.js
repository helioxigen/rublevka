import config from '../config';

const isRublevka = config.app === 'rublevka';

const ifDomain = (ifRublevka, ifRiga) => (isRublevka ? ifRublevka : ifRiga);

export default {
    ifDomain,
};
