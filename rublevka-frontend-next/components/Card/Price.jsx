import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import config from '@config';

const Price = ({ className, deal: { multiCurrencyPrice = {} }, dealType }) => {
    const { symbol, code } = useSelector(state => config.currencies.find(c => c.code === state.user.currency));

    const price = multiCurrencyPrice[code];

    return (
        <footer className={className}>
            {price && price.toLocaleString('ru')}
            {symbol}
            {dealType === 'rent' && ' / месяц'}
        </footer>
    );
};

export default styled(Price)`
    font-weight: 500;

    color: #232323;
`;
