import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@components/UI';
import InputMask from 'react-input-mask';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const masks = require('./CountriesSelector/masks.json');

const CountriesSelector = dynamic(() => import('./CountriesSelector'));

const mask = (value = '') => value.replace(/9/g, '\\9');

const phoneNumberMask = (country, subCode) => {
    const currentMask = masks[country] || '(999) 999-99-99';

    if (!subCode) return currentMask.replace(/\d/g, 9);

    if (currentMask.search(subCode) !== 1) return '';

    const noSub = currentMask.replace(`(${subCode})`, '');

    return `(${mask(subCode)}) ${noSub.replace(/\d/g, 9)}`;
};

export const PhoneInput = ({ className, hasError, value, onChange }) => {
    const [prefixes, changeValues] = useState(['ru', '+7', '']);

    const [country, code, subCode] = prefixes;

    const handleChangeCode = (nextCountry, selectorValue) => {
        const [nextCode, nextSub] = selectorValue.split(' ');

        changeValues([nextCountry.toLowerCase(), nextCode, nextSub]);
    };

    const inputRef = useRef();

    useEffect(() => {
        onChange('');
    }, [prefixes]);

    const [containerRef, inputInView] = useInView({ triggerOnce: true });

    return (
        <div ref={containerRef} className={className}>
            {inputInView && <CountriesSelector onChange={handleChangeCode} />}
            <InputMask
                hasError={hasError}
                type="tel"
                mask={`${mask(code)} ${phoneNumberMask(country, subCode)}`}
                placeholder={`${code} ${masks[country]}`}
                onChange={e => onChange(e.target.value)}
                value={value}
            >
                {inputProps => <Input className="phone-input" ref={inputRef} {...inputProps} />}
            </InputMask>
        </div>
    );
};

export default styled(PhoneInput)`
    position: relative;

    .phone-input {
        width: 100%;
        padding-left: 56px;
    }
`;
