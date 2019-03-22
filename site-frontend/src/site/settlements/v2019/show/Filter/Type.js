import React from 'react';

import {
  CheckboxWrapper,
  ControlsContainer,
  Title,
  FilterHeader,
} from '../../../../countryProperties/v2019/list/filter/styled';

import UI from '../../../../ui/v2019';

const {
  Grid: { Container },
  RadioButton,
} = UI;

export default ({ onTypeChange, dealType }) => (
  <ControlsContainer>
    <Container fluid styleName="contentContainer">
      <FilterHeader>
        <Title>Тип сделки</Title>
      </FilterHeader>
      <CheckboxWrapper>
        <RadioButton
          checked={dealType === 'prodaja'}
          name="sale"
          handleChange={() => onTypeChange('sale')}
          text="Продажа"
        />

        <RadioButton
          checked={dealType === 'arenda'}
          name="rent"
          handleChange={() => onTypeChange('rent')}
          text="Аренда"
        />
      </CheckboxWrapper>
    </Container>
  </ControlsContainer>
);
