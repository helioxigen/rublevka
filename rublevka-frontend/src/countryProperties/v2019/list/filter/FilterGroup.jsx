import React from 'react';
import {
  CheckboxWrapper,
  ControlsContainer,
  Title,
  FilterHeader,
  IconReset,
} from './styled';

import UI from '../../../../ui/v2019';
import Checkbox from './Checkbox';

const {
  Grid: { Container },
} = UI;

export default ({
  title,
  onChange,
  onOnlyClick,
  onReset,
  items,
  values = [],
  name,
  hasAll,
}) => (
  <section>
    <Container fluid>
      <FilterHeader>
        <Title>{title}</Title>
        {items.length > 0 && <IconReset onClick={onReset} icon="times" />}
      </FilterHeader>
      <ControlsContainer>
        <CheckboxWrapper>
          {items.map(({ label, value }) => (
            <Checkbox
              checked={values.includes(value)}
              label={label}
              name={value}
              onChange={onChange(name)}
              onOnlyClick={onOnlyClick(name)}
              showOnly={values.length > 1}
            />
          ))}
        </CheckboxWrapper>
      </ControlsContainer>
    </Container>
  </section>
);
