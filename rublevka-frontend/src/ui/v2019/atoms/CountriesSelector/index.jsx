import React from 'react';
import styled from 'styled-components';

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

    .flag {
      width: 18px;
    }

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

  render() {
    const { current, isDropDownOpen } = this.state;
    const { className } = this.props;

    return (
      <button type="button" className={className} onClick={this.toggleDropDown}>
        <span className="flag">
          <img src={require(`./flags/${current.toLowerCase()}.png`)} />
        </span>
        <List style={{ display: isDropDownOpen ? 'block' : 'none' }}>
          {codes.map(({ dial_code, code }) => (
            <li
              role="menuitem"
              onClick={this.handleCountryChange(code, dial_code)}
            >
              <span className="flag">
                <img src={require(`./flags/${code.toLowerCase()}.png`)} />
              </span>
              {countries[code]} {dial_code}
            </li>
          ))}
        </List>
      </button>
    );
  }
}

// const CountrySelector = ({ current = 'ru', className }) => (
//   <button type="button" className={className}>
//     <span
//       style={{
//         backgroundImage: `url(${require(`./flags/${current.toLowerCase()}.png`)})`,
//       }}
//     />
//   </button>
// );

export default styled(CountrySelector)`
  width: 40px;
  height: 100%;

  background: none;
  border: none;
  outline: none;

  padding: 20px 0 16px 14px;

  display: flex;
  align-items: center;

  .flag {
    display: flex;
    align-items: center;
    width: 30px;

    border-radius: 1px;
    margin-right: 4px;

    background: center / contain no-repeat;

    img {
      width: 100%;
      box-shadow: 0px 0px 1px 0px #888;
    }
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
