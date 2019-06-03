import React from 'react';
import styled from 'styled-components';
import Tags from '../../../UI/Tags';
import Block from '../Filter/Block';
import { orderBy, dictionaryToOptions } from '../../constants/dictionaries';

const StSort = styled.section``;

const Section = styled.section`
  margin-bottom: 52px;
`;

const getNextValue = (value) => {
  if (value === 'asc') {
    return 'desc';
  }
  if (value === 'desc') {
    return null;
  }
  return 'asc';
};

const getSymbolByValue = (value) => {
  if (value === 'asc') {
    return '↑';
  }
  if (value === 'desc') {
    return '↓';
  }
  return '';
};

export default function Filter({ state = {}, ...props }) {
  const update = (key) => {
    const nextValue = getNextValue(state[key]);
    if (nextValue === null) {
      props.remove(key);
    } else {
      props.update(key, nextValue);
    }
  };
  const currentValue = Object.keys(state);
  const hasValue = currentValue.length > 0;
  const options = dictionaryToOptions(orderBy).map((el) => {
    const symbol = getSymbolByValue(state[el.value]);
    return { ...el, label: `${el.label} ${symbol}` };
  });

  return (
    <StSort>
      <Section>
        <h2>Сортировка</h2>
        <Block title="&nbsp;" hasValue={hasValue} remove={() => props.reset()}>
          <Tags
            options={options}
            currentValue={currentValue}
            onChange={value => update(value)}
          />
        </Block>
      </Section>
    </StSort>
  );
}
