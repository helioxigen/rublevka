import React from 'react';
import Input from '../atoms/Input';
import CountriesSelector from '../atoms/CountriesSelector';
import styled from 'styled-components';

class PhoneInput extends React.Component {
  state = {
    code: '+7',
    phone: '',
  };

  handleChange = name => value => {
    this.setState({ [name]: value }, this.stateCallback);
  };

  stateCallback = () => {
    const { code, phone } = this.state;

    this.props.onChange(`${code} ${phone}`);
  };

  render() {
    const { phone } = this.state;
    const { className, hasError } = this.props;

    return (
      <div className={className}>
        <CountriesSelector onChange={this.handleChange('code')} />
        <Input
          hasError={hasError}
          type="tel"
          mask="(999) 999-99-99"
          placeholder="(943) 235-56-34"
          onChange={e => this.handleChange('phone')(e.target.value)}
          value={phone}
        />
      </div>
    );
  }
}

export default styled(PhoneInput)`
  position: relative;

  ${CountriesSelector} {
    position: absolute;
    left: 0;
  }

  ${Input} {
    width: 100%;
    padding-left: 48px;
  }
`;
