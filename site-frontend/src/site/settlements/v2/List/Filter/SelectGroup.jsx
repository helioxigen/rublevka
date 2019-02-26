import React, { Component } from 'react';

import UI from 'site/ui';

import styled from 'styled-components';
import media from 'site/styles/media';

const { Select, Visibility } = UI;

const Wrapper = styled.div`
  display: inline-block;
  white-space: nowrap;
`;

const StSelect = styled(Select)`
  width: 11.2rem;
  padding: 0.9rem 1.5rem;
  display: inline-block;
  vertical-align: top;
  font-size: 1.6rem;
  border-width: 1px;
  border-color: ${p => p.theme.grey};
  border-radius: 0.4rem 0 0 0.4rem;

  ${media.xs`
    min-width: 10.4rem;
  `} &:hover, &:focus, &:active {
    border-color: ${p => p.theme.grey};
  }
  & svg {
    display: none;
  }
`;

const StSelectRight = StSelect.extend`
  border-width: 1px;
  border-color: ${p => p.theme.grey} ${p => p.theme.grey} ${p => p.theme.grey}
    transparent;
  border-radius: 0 0.4rem 0.4rem 0;
`;

const StSelectMobile = styled.select`
  width: 11.5rem;
  padding: 1rem 1.5rem;
  display: inline-block;
  vertical-align: top;
  font-size: 1.4rem;
  color: ${p => p.theme.doveGray};
  background: ${p => p.theme.brandWhite};
  border-color: ${p => p.theme.grey};
  border-radius: 0.4rem 0 0 0.4rem;
  box-shadow: none;
  appearance: none;
  &:focus {
    outline: none;
  }

  ${media.xs`
    min-width: 11rem;
  `};
`;

const StSelectMobileRight = StSelectMobile.extend`
  border-width: 1px;
  border-color: ${p => p.theme.grey} ${p => p.theme.grey} ${p => p.theme.grey}
    transparent;
  border-radius: 0 0.4rem 0.4rem 0;
`;

class SelectGroup extends Component {
  render() {
    const { selected = {}, options = [] } = this.props;

    const optionsReverse = [...options].reverse();

    const optionsDecrease = options.filter(
      item => item.value >= (selected.min || 0),
    );

    const optionsIncrease = options.filter(
      item => item.value <= (selected.max || optionsReverse[0].value),
    );

    const minValue = options[0].label || 0;
    const maxValue = optionsReverse[0].label || 0;

    return (
      <Wrapper>
        <Visibility lg="hidden">
          <StSelectMobile
            value={selected.min || options[0].value}
            onChange={e => this.props.onUpdate('min', e.target.value)}
          >
            {optionsIncrease.map(option => (
              <option value={option.value}>{option.label}</option>
            ))}
          </StSelectMobile>

          <StSelectMobileRight
            value={selected.max || optionsReverse[0].value}
            onChange={e => this.props.onUpdate('max', e.target.value)}
          >
            {optionsDecrease.map(option => (
              <option value={option.value}>{option.label}</option>
            ))}
          </StSelectMobileRight>
        </Visibility>

        <Visibility xs="hidden" sm="hidden" md="hidden">
          <StSelect
            value={selected.min}
            placeholder={`${minValue}`}
            options={optionsIncrease}
            onChange={value => this.props.onUpdate('min', value)}
            disableReset
          />
          <StSelectRight
            value={selected.max}
            placeholder={`${maxValue}`}
            options={optionsDecrease}
            onChange={value => this.props.onUpdate('max', value)}
            disableReset
          />
        </Visibility>
      </Wrapper>
    );
  }
}

export default SelectGroup;
