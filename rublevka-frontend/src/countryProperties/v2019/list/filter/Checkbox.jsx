import React from 'react';

import UI from '../../../../ui/v2019';
import { CheckboxLabel } from './styled';

const { Checkbox } = UI;

export default ({ label, checked, onChange, name }) => (
  <Checkbox checked={checked} handleChange={() => onChange(name, checked)}>
    <CheckboxLabel>{label}</CheckboxLabel>
  </Checkbox>
);
