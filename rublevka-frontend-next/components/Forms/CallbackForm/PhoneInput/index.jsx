import React from 'react';
import { Input } from '@components/UI';
import CountriesSelector from './CountriesSelector';
import styled from 'styled-components';

const masks = require('./CountriesSelector/masks.json');

class PhoneInput extends React.Component {
    state = {
        country: 'ru',
        code: '+7',
        subCode: '',
    };

    handleChangeCode = (country, value) => {
        const [code, subCode] = value.split(' ');

        this.setState(
            {
                country: country.toLowerCase(),
                code,
                subCode,
            },
            this.codeChangeCallback
        );
    };

    codeChangeCallback = () => {
        this.props.onChange('');

        this.inputRef.focus();
    };

    mask = (value = '') => value.replace(/9/g, '\\9');

    phoneNumberMask = () => {
        const { country, subCode } = this.state;
        const currentMask = masks[country] || '(999) 999-99-99';

        if (!subCode) return currentMask.replace(/\d/g, 9);

        if (currentMask.search(subCode) === 1) {
            const noSub = currentMask.replace(`(${subCode})`, '');

            return `(${this.mask(subCode)}) ${noSub.replace(/\d/g, 9)}`;
        }
    };

    render() {
        const { code, subCode, country } = this.state;
        const { className, hasError, value, onChange } = this.props;

        return (
            <div className={className}>
                <CountriesSelector onChange={this.handleChangeCode} />
                <Input
                    inputRef={ref => (this.inputRef = ref)}
                    hasError={hasError}
                    type="tel"
                    mask={`${this.mask(code)} ${this.phoneNumberMask()}`}
                    placeholder={`${code} ${masks[country]}`}
                    onChange={e => onChange(e.target.value)}
                    value={value}
                />
            </div>
        );
    }
}

export default styled(PhoneInput)`
    position: relative;

    ${Input} {
        width: 100%;
        padding-left: 56px;
    }
`;
