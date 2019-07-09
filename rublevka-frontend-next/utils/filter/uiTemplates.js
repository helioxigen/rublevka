import range from 'lodash/range';
import config from '@config';

const templateRange = (rangeArr = [], templateFn, multi = 1) =>
    rangeArr.map(value => ({ value: value * multi, label: templateFn(value) }));

const rentTpl = value => `${value} тыс/мес`;

const prices = (currency, dealType) => {
    if (currency === 'rub') {
        if (dealType === 'rent') return templateRange(range(0, 1050, 50, 1000000), rentTpl);

        return templateRange(range(0, 650, 50, 1000000), v => `${v} млн ₽`);
    }

    if (dealType === 'rent') return templateRange(range(0, 11).concat(range(15, 105, 5)), rentTpl, 100000);

    const { symbol } = config.currencies.find(v => v.code === currency);

    return range(0, 11).map(value => ({ value: value * 1000000, label: `${symbol}${value} млн` }));
};

const generic = (end, step, templateFn) =>
    templateRange(range(0, end + step, step), value => templateFn(value === end ? `${value}+` : value));

export default {
    generic,
    prices,
};
