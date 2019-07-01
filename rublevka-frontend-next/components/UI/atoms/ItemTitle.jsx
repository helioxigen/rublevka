import React from 'react';
import { dict, format } from '@utils';

export default ({
    data: { landDetails = {}, specification = {}, location = {}, kind = '' },
    dealType,
    isCard = false,
    withOffer = false,
}) => (
    <>
        {withOffer && (kind === 'land' ? 'Участок' : dict.translateDealType(dealType).noun)}{' '}
        {withOffer ? dict.translateKind(kind).genitive : dict.translateKind(kind).noun}
        {kind === 'land'
            ? `${landDetails.area} сот.`
            : format.titleByNumber(specification.bedrooms, [('спальня', 'спальни', 'спален')])}
    </>
);
