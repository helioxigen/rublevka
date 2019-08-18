import dict from './dict';
import format from './format';

const generate = (dealType, isCard, withOffer, { landDetails = {}, specification = {}, location = {}, kind = '' }) => {
    return [
        withOffer && (kind === 'land' ? 'Участок' : dict.translateDealType(dealType).noun),
        withOffer ? dict.translateKind(kind).genitive : dict.translateKind(kind).noun,
        kind === 'land'
            ? `${Math.floor(landDetails.area)} сот.`
            : format.titleByNumber(specification.bedrooms, ['спальня', 'спальни', 'спален']),
        location.settlementName && `в пос. ${location.settlementName}, `,
        location.mkadDistance && `${location.mkadDistance}${String.fromCharCode(160)}км`,
    ]
        .filter(v => !!v)
        .join(' ');
};

export default {
    generate,
};
