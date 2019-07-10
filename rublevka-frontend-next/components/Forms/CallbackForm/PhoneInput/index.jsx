import React from 'react';
import { Input } from '@components/UI';
import InputMask from 'react-input-mask';
import CountriesSelector from './CountriesSelector';
import styled from 'styled-components';

class PhoneInput extends React.Component {
    state = {
        code: '+7',
        subCode: '',
    };

    handleChangeCode = value => {
        const [code, subCode] = value.split(' ');

        this.setState(
            {
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

    render() {
        const { code, subCode } = this.state;
        const { className, hasError, value, onChange } = this.props;

        return (
            <div className={className}>
                <CountriesSelector onChange={this.handleChangeCode} />
                <InputMask
                    hasError={hasError}
                    type="tel"
                    mask={`${this.mask(code)} (${this.mask(subCode) || 999}) 999-99-99`}
                    placeholder={`${code} (${subCode || 374}) 654-32-45`}
                    onChange={e => onChange(e.target.value)}
                    value={value}
                >
                    {inputProps => <Input ref={ref => (this.inputRef = ref)} {...inputProps} />}
                </InputMask>
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
