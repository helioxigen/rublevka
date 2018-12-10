import React from 'react';

import moment from 'moment';

import UI from 'cem/components/ui';
const { Daypicker, Icon, Form: { Group, Label, Input, Helper, Static } } = UI;

import cn from 'classnames';
import sUtils from 'cem/styles/utils';
import sDaypicker from 'cem/styles/ui/daypicker';

export default (props) => {
  const { field = {}, label, isStatic } = props;

  const hasError = field.touched && !!field.error;

  const value = props.value || field.value;
  const onChange = props.onChange || field.onChange;

  if (!isStatic) {
    return (
      <Group kind={hasError && 'error'}>
        <Label block>{label}</Label>

        <Daypicker
          className={cn(sUtils.displayBlock, sUtils.noMargin)}
          kind={props.kind}
          control={
            <Input
              block
              type="text"
              className={props.className}
              placeholder={props.placeholder}
              value={value}
              onChange={onChange}
              {...field}
            />
          }
          button={
            <UI.Button className={sDaypicker.btn}>
              <Icon className={sDaypicker.icon} icon="calendar" />
            </UI.Button>
          }
          onDayClick={day => onChange(day)}
        />
        {hasError &&
          <Helper>
            {field.error}
          </Helper>}
      </Group>
    );
  }
  return (
    <Group kind={hasError && 'error'}>
      <Label block>{label}</Label>

      <Static className={props.className}>
        {moment(field.value).format('D MMM, ddd')}
      </Static>
    </Group>
  );
};
