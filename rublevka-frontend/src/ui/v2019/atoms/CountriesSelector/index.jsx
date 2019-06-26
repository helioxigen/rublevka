import React from 'react';
import styled from 'styled-components';
import Flag from './Flag';
import media from '../../../../styles/media.js';

const countries = require('./countries.json');
const codes = require('./codes.json');

const List = styled.ul`
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  max-height: 300px;

  overflow-y: scroll;

  position: absolute;
  top: 100%;
  margin-top: 4px;
  left: 0;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 8px 13px;

    span {
      white-space: nowrap;
    }

    span:last-child {
      margin-left: 5px;
      color: grey;
    }
  }

  li:hover {
    background: #fcd0cd;
  }
`;

class CountrySelector extends React.Component {
  state = {
    current: 'RU',
    isDropDownOpen: false,
  };

  toggleDropDown = () => {
    this.setState({
      isDropDownOpen: !this.state.isDropDownOpen,
    });
  };

  handleCountryChange = (code, dialCode) => () => {
    this.props.onChange(dialCode);

    this.setState({
      current: code,
    });
  };

  handleSelectChange = e => {
    const { code, dial_code } = codes.find(
      ({ code }) => code === e.target.value,
    );

    this.handleCountryChange(code, dial_code)();
  };

  render() {
    const { current, isDropDownOpen } = this.state;
    const { className } = this.props;

    return (
      <button type="button" className={className} onClick={this.toggleDropDown}>
        <Flag code={current.toLowerCase()} />
        <select onChange={this.handleSelectChange} value={current}>
          {codes.map(({ dial_code, code }) => (
            <option value={code}>
              {countries[code]} {dial_code}
            </option>
          ))}
        </select>
        <List style={{ visibility: isDropDownOpen ? 'visible' : 'hidden' }}>
          {codes.map(({ dial_code, code }) => (
            <li
              role="menuitem"
              onClick={this.handleCountryChange(code, dial_code)}
            >
              <Flag code={code.toLowerCase()} />
              {countries[code]} {dial_code}
            </li>
          ))}
        </List>
      </button>
    );
  }
}

export default styled(CountrySelector)`
  width: 40px;
  height: 100%;

  background: none;
  border: none;
  outline: none;

  padding: 20px 0 16px 14px;

  display: flex;
  align-items: center;

  position: relative;

  select {
    opacity: 0;
    position: absolute;
    width: 26px;

    ${media.sm`
      display: none;
    `}
  }

  ${List} {
    display: none;

    ${media.sm`
      display: block;
    `}
  }

  ::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: #aaaaaa transparent transparent transparent;
  }
`;
