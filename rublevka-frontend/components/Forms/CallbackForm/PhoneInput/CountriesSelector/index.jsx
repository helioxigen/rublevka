/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import Flag from './Flag';
import { media } from '@utils';

const countries = require('./countries.json');
const codes = require('./codes.json').sort((a, b) => countries[a.code].localeCompare(countries[b.code]));

const List = styled.ul`
    background: #ffffff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
    border-radius: 8px;

    max-height: 300px;

    overflow-y: scroll;

    position: absolute;
    z-index: 100;
    top: 100%;
    margin-top: 4px;
    left: 0;
    padding: 0;

    li {
        display: flex;
        align-items: center;
        list-style: none;
        cursor: pointer;
        padding: 11px 10px;

        ${Flag} {
            width: 35px;
            flex: 0 0 auto;
        }

        span:nth-child(2) {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
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
        this.props.onChange(code, dialCode);

        this.setState({
            current: code,
            isDropDownOpen: false,
        });
    };

    handleSelectChange = e => {
        const { code, dial_code } = codes.find(({ code }) => code === e.target.value);

        this.handleCountryChange(code, dial_code)();
    };

    render() {
        const { current, isDropDownOpen } = this.state;
        const { className } = this.props;

        return (
            <div tabIndex={-1} className={className}>
                <button type="button" tabIndex={-1} onClick={this.toggleDropDown}>
                    <Flag code={current.toLowerCase()} />
                    <select onChange={this.handleSelectChange} value={current}>
                        {codes.map(({ dial_code: dialCode, code }) => (
                            <option key={code} value={code}>
                                {countries[code]} {dialCode}
                            </option>
                        ))}
                    </select>
                </button>
                {isDropDownOpen && <div className="click-away-overlay" onClick={this.toggleDropDown} />}
                <List style={{ visibility: isDropDownOpen ? 'visible' : 'hidden' }}>
                    {codes.map(({ dial_code: dialCode, code }) => (
                        <li
                            key={code}
                            role="menuitem"
                            onKeyPress={this.handleCountryChange(code, dialCode)}
                            onClick={this.handleCountryChange(code, dialCode)}
                        >
                            <Flag code={code.toLowerCase()} />
                            {countries[code]} {dialCode}
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
        height: 100%;

        background: none;
        border: none;
        outline: none;

        padding: 0 0 0 15px;
        cursor: pointer;

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
        margin-left: 3px;
    }

    select {
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;

        ${media.sm`
      display: none;
    `}
    }

    .click-away-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
    }

    ${List} {
        width: 100%;
        display: none;

        ${media.sm`
      display: block;
    `}
    }
`;
