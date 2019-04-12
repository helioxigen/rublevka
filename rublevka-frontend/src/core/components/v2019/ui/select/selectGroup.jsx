import React from 'react';
import styled from 'styled-components';

import UI from '../../../../../ui/v2019';
import media from '../../../../../styles/media';
import s from '../../../../../styles/ui/v2019/selectGroup.css';
// import sSelect from '../../../../../styles/ui/v2019/select.css';

const { /* Select, */ Visibility } = UI;

const Select = styled.select`
  width: 45%;
  padding: 1.7rem 1.5rem;

  font-size: 1.4rem;
  color: #636363;

  background: #ffffff;
  border: 1px solid #d8d8d8;
  box-shadow: none;
  appearance: none;

  &:focus {
    outline: none;
  }

  ${media.md`
    width: 50%;
    font-weight: 500;
    font-size: 1.5rem;
    padding: 1.1rem 1.2rem;
    display: inline-block;
    vertical-align: top;
    border-color: #d9d9d9;
    border-radius: .4rem;

    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;

    &:hover, &:focus {
      cursor: pointer;
      border-color: #999;
    }
  `}

  & option[disabled] {
    display: none;
  }
`;

export default (props) => {
  const { selected = {}, options = [] } = props;

  const optionsReverse = [...options].reverse();

  const optionsDecrease = options.filter(
    item => item.value >= (selected.min || 0),
  );

  const optionsIncrease = options.filter(
    item => item.value <= (selected.max || optionsReverse[0].value),
  );

  return (
    <div className={s.selectContainer}>
      <Visibility>
        <Select
          value={selected.min || 'placeholder'}
          onChange={e => props.onUpdate('min', e.target.value)}
        >
          <option value="placeholder" disabled>
            от
          </option>
          {optionsIncrease.map(option => (
            <option value={option.value}>{option.label}</option>
          ))}
        </Select>

        <span className={s.dash}>-</span>

        <Select
          value={selected.max || 'placeholder'}
          onChange={e => props.onUpdate('max', e.target.value)}
        >
          <option value="placeholder" disabled>
            до
          </option>
          {optionsDecrease.map(option => (
            <option value={option.value}>{option.label}</option>
          ))}
        </Select>
      </Visibility>

      {/* <Visibility
          xs="hidden"
          sm="hidden"
          md="hidden"
          className={s.visibility}
        >
          <div className={s.flexWrapper}>
            <div className={s.flexItem}>
              <Select
                className={sSelect.filterSelect}
                value={selected.min}
                placeholder={'от'}
                options={optionsIncrease}
                onChange={value => props.onUpdate('min', value)}
                disableReset
              />
            </div>
            <span className={s.dash}>-</span>
            <div className={s.flexItem}>
              <Select
                className={sSelect.filterSelect}
                value={selected.max}
                placeholder={'до'}
                options={optionsDecrease}
                onChange={value => props.onUpdate('max', value)}
                disableReset
              />
            </div>
          </div>
        </Visibility> */}
    </div>
  );
};
