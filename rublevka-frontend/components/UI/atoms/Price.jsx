import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import config from '@config';

const Price = ({ className, deal: { multiCurrencyPrice = {} }, dealType, kind, landDetails, showSubheader }) => {
    const { symbol, code } = useSelector(state => config.currencies.find(c => c.code === state.user.currency));

    const price = multiCurrencyPrice[code];

    const getSub = () => {
        const result = kind === 'land' && landDetails && price / landDetails.area;

        if (!result) return '';

        return `${result.toLocaleString('ru')} ${symbol} / сот.`;
    };

    const subheader = showSubheader && getSub(price, symbol);

    return (
        <p className={className}>
            {price && price.toLocaleString('ru')} {symbol}
            {dealType === 'rent' && ' / месяц'}
            {subheader && <span className="subheader">{subheader}</span>}
        </p>
    );
};

export default styled(Price)`
    font-weight: 500;

    color: #232323;

    margin: 0;

    .subheader {
        font-size: 0.65em;
        color: #919191;
        display: block;
    }
`;
