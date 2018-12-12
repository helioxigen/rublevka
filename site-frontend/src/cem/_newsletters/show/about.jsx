import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import { formSettings } from 'cem/_newsletters/constants/form';

import PropertiesSelection from 'cem/components/common/propertiesSelection';

import UI from 'cem/components/ui';
const { Heading, Select, Form: { Input }, Grid: { Row, Col } } = UI;

import Template from './template';

import FormField from 'cem/helpers/formField';

import s from 'cem/styles/id/content';
import sHeader from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';

import * as dict from 'cem/_newsletters/constants/dictionaries';
import * as options from 'cem/_newsletters/constants/options';

class About extends Component {
  constructor(props) {
    super(props);

    this.handleAddProperty = this.handleAddProperty.bind(this);
    this.handleRemoveProperty = this.handleRemoveProperty.bind(this);
  }

  handleAddProperty(ids) {
    const { fields, values } = this.props;

    fields.propertyIds.onChange([
      ...(Array.isArray(values.propertyIds) ? values.propertyIds : []),
      ...ids,
    ]);
  }

  handleRemoveProperty(id) {
    const { fields, values } = this.props;

    fields.propertyIds.onChange(values.propertyIds.filter(propertyId => propertyId !== id));
  }

  render() {
    const { values, fields, formKey, isUpdateAllowed } = this.props;

    return (
      <Row>
        <section className={s.section}>
          {formKey === 'create' && <Heading>Описание</Heading>}

          {formKey === 'create' &&
            <Row className={sUtils.pushedBottom6}>
              <Col xs="20" lg="10">
                <FormField field={fields.name} label="Заголовок" float static={!isUpdateAllowed}>
                  <Input className={sHeader.input} block type="text" />
                </FormField>
                <FormField
                  field={fields.subTitle}
                  label="Подзаголовок"
                  float
                  static={!isUpdateAllowed}
                >
                  <Input className={sHeader.input} block type="text" />
                </FormField>
              </Col>
              <Col xs="20" lg="10">
                <Row>
                  <Col xs="20" lg="10">
                    <FormField label="Тип" field={fields.offerKind} static={!isUpdateAllowed} float>
                      <Select className={sUtils.fontSizeMd} options={options.offerKinds} />
                    </FormField>
                  </Col>
                  <Col xs="20" lg="10">
                    <FormField
                      options={dict.sites}
                      label="Сайт"
                      field={fields.site}
                      static={!isUpdateAllowed}
                      float
                    >
                      <Select className={sUtils.fontSizeMd} options={options.sites} />
                    </FormField>
                  </Col>
                  <Col xs="10">
                    <FormField
                      label="Валюта"
                      field={fields._currency}
                      static={!isUpdateAllowed}
                      float
                    >
                      <Select
                        className={sUtils.fontSizeMd}
                        options={options.currencies}
                        disableReset
                      />
                    </FormField>
                  </Col>
                </Row>
              </Col>
            </Row>}
          {formKey === 'create' &&
            values.offerKind &&
            values.site &&
            values._currency &&
            <Row>
              <Col xs="20">
                <PropertiesSelection
                  title="Объекты"
                  idsField={fields.propertyIds}
                  isStatic={!isUpdateAllowed && formKey !== 'create'}
                  onAdd={this.handleAddProperty}
                  onRemove={this.handleRemoveProperty}
                />
              </Col>
            </Row>}
          {formKey === 'create' && <Template values={values} />}
          {formKey !== 'create' &&
            // because we need preview
            // eslint-disable-next-line
            <div dangerouslySetInnerHTML={{ __html: values.template }} />}
        </section>
      </Row>
    );
  }
}

export default reduxForm(formSettings)(About);
