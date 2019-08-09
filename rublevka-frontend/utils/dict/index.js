import translit from './translit';
import details from './details';
import declesions from './declesions';
import settlements from './settlements';

const dealTypes = {
    sale: ['Продажа', 'Купить'],
    rent: ['Аренда', 'Арендовать'],
};

export const kinds = {
    flat: ['Квартира', 'квартиры'],
    apartment: ['Апартаменты', 'апартаментов'],
    house: ['Дом', 'дома'],
    townhouse: ['Таунхаус', 'таунхауса'],
    penthouse: ['Пентхаус', 'пентхауса'],
    land: ['Участок', 'участка'],
};

const translateDealType = dealType => {
    const [noun, verb] = dealTypes[dealType] || [];

    return {
        noun,
        verb,
    };
};

const translateKind = kindType => {
    const [noun, genitive] = kinds[kindType] || [];

    return {
        noun,
        genitive,
    };
};

export default {
    translit,
    translateDealType,
    translateKind,
    details,
    declesions,
    settlements,
    validate: {
        dealType: v => Object.keys(dealTypes).includes(v),
        kind: v => (v ? Object.keys(kinds).includes(v) : true),
    },
};
