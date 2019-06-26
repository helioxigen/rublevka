import React from 'react';
import Input from '../atoms/Input';
import CountriesSelector from '../atoms/CountriesSelector';
import styled from 'styled-components';

class PhoneInput extends React.Component {
  state = {
    code: '+7',
    subCode: '',
  };

  handleChangeCode = value => {
    const [code, subCode] = value.split(' ');

    this.setState({
      code,
      subCode,
    });

    this.props.onChange('');

    this.inputRef.focus();
  };

  render() {
    const { code, subCode } = this.state;
    const { className, hasError, value, onChange } = this.props;

    return (
      <div className={className}>
        <CountriesSelector onChange={this.handleChangeCode} />
        <Input
          inputRef={ref => (this.inputRef = ref)}
          hasError={hasError}
          type="tel"
          mask={`${code} (${subCode || 999}) 999-99-99`}
          alwaysShowMask
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
    padding-left: 48px;
  }
`;
