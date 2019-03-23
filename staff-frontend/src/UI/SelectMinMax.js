import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
`;

const Select = styled.select`
  appearance: none;
  width: 100%;
  border: 1px solid #dcdcdc;
  background: #fff;
  border-radius: 4px;
  padding: 8px 12px;
`;

export default function ({ selected = {}, options = [], ...props }) {
  const [state, update] = React.useState({ min: null, max: null });

  const optionsMin = options.slice(0, options.length - 1);
  const optionsMax = options
    .slice(1)
    .filter(
      (item, index) =>
        index > options.findIndex(({ value }) => value === selected.min),
    );

  function onChange(key, value) {
    update({ ...state, [key]: value });
  }

  React.useEffect(
    () => {
      props.onChange(state);
    },
    [state],
  );

  return (
    <Wrapper>
      <Select
        value={selected.min}
        onChange={e => onChange('min', e.target.value)}
      >
        <option value="" disabled selected>
          от
        </option>
        {optionsMin.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>

      <Select
        value={selected.max}
        onChange={e => onChange('max', e.target.value)}
      >
        <option value="" disabled selected>
          до
        </option>
        {optionsMax.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
}
