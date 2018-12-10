import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import { formSettings } from 'cem/constants/selections/form';

import PropertiesSelection from 'cem/components/common/propertiesSelection';

import UI from 'cem/components/ui';
const {
  Heading,
  Select,
  Form: { Textarea, Input },
  Grid: { Row, Col },
} = UI;

import Status from './status';

import FormField from 'cem/helpers/formField';

import s from 'cem/styles/id/content';
import sHeader from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';

import * as propertyOptions from 'cem/constants/properties/options';
import * as propertyDict from 'cem/constants/properties/dictionaries';
import * as dict from 'core/constants/selections/dictionaries';
import * as options from 'core/constants/selections/options';

class About extends Component {
  handleAddProperty(ids) {
    const { fields, values } = this.props;

    fields.propertyIds.onChange([...(Array.isArray(values.propertyIds) ? values.propertyIds : []), ...ids]);
  }

  handleRemoveProperty(id) {
    const { fields, values } = this.props;

    fields.propertyIds.onChange(values.propertyIds.filter(propertyId => propertyId !== id));
  }

  render() {
    const { actions, state, data = {}, values, fields, formKey, isUpdateAllowed } = this.props;

    const isPropertiesSelected = Array.isArray(values.propertyIds) && values.propertyIds.length;

    return (
      <Row>
        <section className={s.section}>
          <Heading>Описание</Heading>
          <Row className={sUtils.pushedBottom6}>
            <Col xs="20" lg="4">
              <FormField label="Категория" field={fields.propertyCategory} options={propertyDict.categories} static={(!isUpdateAllowed && formKey !== `create`) || isPropertiesSelected}>
                <Select valueKey="id" labelKey="title" className={sUtils.fontSizeMd} options={propertyOptions.categories} {...fields.propertyCategory} disableReset />
              </FormField>
            </Col>
            <Col xs="20" lg="4" lgOffset="1">
              <FormField label="Тип" field={fields.offerKind} static={!isUpdateAllowed} float>
                <Select className={sUtils.fontSizeMd} options={options.offerKinds} />
              </FormField>
            </Col>
            <Col xs="20" lg="4" lgOffset="1">
              <FormField options={dict.sites} label="Сайт" field={fields.site} static={!isUpdateAllowed} float>
                <Select className={sUtils.fontSizeMd} options={options.sites} />
              </FormField>
            </Col>
            <Col xs="20" lg="5" lgOffset="1">
              <FormField options={dict.pages} label="Раздел сайта" field={fields.pages} static={!isUpdateAllowed} float>
                <Select multi className={sUtils.fontSizeMd} options={options.pages} />
              </FormField>
            </Col>
          </Row>
          <Row className={sUtils.pushedBottom6}>
            <Col xs="20">
              <FormField field={fields.title} label="Подзаголовок" float static={!isUpdateAllowed}>
                <Input className={sHeader.input} block type="text" />
              </FormField>
            </Col>
            <Col xs="20">
              <Heading>Текст подборки</Heading>
              <FormField field={fields.description}>
                <Textarea className={s.textarea} rows="9" block kind="primary" />
              </FormField>
            </Col>
          </Row>
          <Row>
            <Col xs="20">
              <PropertiesSelection title="Объекты" category={values.propertyCategory} idsField={fields.propertyIds} isStatic={!isUpdateAllowed && formKey !== `create`}
                onAdd={::this.handleAddProperty} onRemove={::this.handleRemoveProperty} />
            </Col>
          </Row>
          <Status actions={actions} data={data} usersState={state.users} />
        </section>
      </Row>
    );
  }
}

export default reduxForm(formSettings)(About);
