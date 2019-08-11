const dictionary = {
    // constructor stages
    in_progress: 'Строится',
    not_delivered_yet: 'Построен, но не сдан',
    done: 'Сдан в эксплуатацию',
    // specification.wallMaterial
    blue_max: 'Блюмакс',
    wood: 'Дерево',
    brick: 'Кирпич',
    block: 'Блоки',
    monolith: 'Монолит',
    canadian_sip: 'Канадская технология',
    // roof materials
    steel: 'Кровельная сталь',
    soft_tile: 'Мягкая черепица',
    copper: 'Медь',
    metal_tile: 'Металлочерепица',
    slate: 'Сланец',
    tile: 'Черепица',
    rooftop: 'Эксплуатируемая кровля',
    // specification.renovate
    rough_finish: 'Черновая отделка',
    for_finishing: 'Под чистовую отделку',
    full_construction: 'Под ключ',
    partly_turnkey: 'Частично под ключ',
    design: 'Дизайнерский',
    raw: 'Коробка',
    // communication.gasSupply
    without_gas: 'Без газа',
    gas_holder: 'Газгольдер',
    near_border: 'На границе',
    mains: 'Магистральный',
    diesel: 'Дизель',
    // communication.sewerageSupply
    central: 'Центральн',
    septic: 'Септика',
    // communication.waterSupply
    purification: 'Очистные сооружения',
    well: 'Скважина',
};

export default {
    get: (detailsKey, [value, postFix] = []) => {
        if (detailsKey in dictionary) {
            return dictionary[detailsKey] + (value === detailsKey ? postFix : '');
        }

        return '';
    },
};
