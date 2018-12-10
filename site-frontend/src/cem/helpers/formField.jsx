import React from 'react';

import UI from 'cem/components/ui';
const {
  Form: { Group, Label, Helper, Static },
  StaticDictionary,
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';

import { formatPriceWithGrouping } from 'core/helpers';

const FormField = ({ float, inline, label, children, field = {}, ...props, className, options = {}, asyncValue, valueClassName, labelKey, sideHelper, helperClassName, price = false }) => {
  const value = children.props.type !== 'file' ? children.props.value || field.value : null;

  if (!props.static) {
    return (
      <Group kind={field.touched && !!field.error && 'error'} float={float} inline={inline} className={className}>
        {!float && label && <Label block>{label}</Label>}
        {React.cloneElement(children, { ...field, valueClassName: valueClassName || 'floatLabel', placeholder: float ? label : children.props.placeholder, value })}
        {float && label && <Label>{label}</Label>}
        {field.touched && <Helper className={cn(!!s.formHelper && sideHelper, helperClassName)}>{field.error}</Helper>}
      </Group>
    );
  }
  return (
    <Group className={className} inline={inline}>
      {label && <Label block>{label}</Label>}
      {!!price && <Static className={children.props.className}>{formatPriceWithGrouping(field.value) || '—'}</Static>}
      {!asyncValue && !price && <Static className={children.props.className}>{typeof options[field.value] === 'object' ? options[field.value].title || field.value || '—' : options[field.value] || field.value || '—'}</Static>}
      {!!asyncValue && !price && <StaticDictionary fetch={asyncValue} className={children.props.className} value={field.value} labelKey={labelKey} />}
    </Group>
  );
};

export default FormField;
