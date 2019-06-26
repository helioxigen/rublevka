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
    cursor: pointer;
    padding: 11px 9px;

    text-overflow: ellipsis;
    overflow: hidden;

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
      isDropDownOpen: false,
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
      <div className={className}>
        <button type="button" onClick={this.toggleDropDown}>
          <Flag code={current.toLowerCase()} />
          <select onChange={this.handleSelectChange} value={current}>
            {codes.map(({ dial_code, code }) => (
              <option value={code}>
                {countries[code]} {dial_code}
              </option>
            ))}
          </select>
        </button>
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
      </div>
    );
  }
}

export default styled(CountrySelector)`
  button {
    position: absolute;
    width: 42px;
    height: 100%;

    background: none;
    border: none;
    outline: none;

    padding: 20px 0 16px 14px;

    display: flex;
    align-items: center;
  }

  button::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: #aaaaaa transparent transparent transparent;
  }

  select {
    opacity: 0;
    position: absolute;
    width: 26px;

    ${media.sm`
      display: none;
    `}
  }

  ${List} {
    width: 100%;
    display: none;

    ${media.sm`
      display: block;
    `}
  }
`;
