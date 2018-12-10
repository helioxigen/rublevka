import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import submitValidator from 'core/decorators/submitValidator';

import Property from 'cem/components/common/property/listItem';
import ModalAddProperty from './addPropertyModal';

import UI from 'cem/components/ui';
const {
  Button, Icon, Heading,
  Grid: { Row, Col },
  Form: { Group, Helper },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sButton from 'cem/styles/buttons';
import sUtils from 'cem/styles/utils';

import { taskFormSettings, previewPropertiesLimit } from 'cem/constants/tasks/form';

class PropertiesList extends Component {
  handlePropertiesAddition(items) {
    const { detailsField } = this.props;

    detailsField.propertyId.onChange(items[0].propertyId);
    detailsField.propertyCategory.onChange(items[0].propertyCategory);
  }

  handlePropertyRemove() {
    const { detailsField } = this.props;

    detailsField.propertyId.onChange(undefined);
    detailsField.propertyCategory.onChange(undefined);
  }

  render() {
    const { values: { state }, formKey, detailsField, detailsField: { propertyId, propertyCategory }, isUpdateAllowed } = this.props;

    const cardsLimit = previewPropertiesLimit - (!!propertyId.value ? 1 : 0);
    const isLimitReached = cardsLimit <= 0;

    const isStatic = !isUpdateAllowed || state !== `to_do`;

    return (
      <section className={sUtils.pushedBottom6}>
        <Row>
          <Col xs="20">
            <Heading size="md">
              Объект
              {(formKey === `create` || (state === `to_do` && isUpdateAllowed)) && !isLimitReached &&
                <ModalAddProperty field={!!propertyId.value ? [{ propertyId: propertyId.value }] : []} onAdd={::this.handlePropertiesAddition} initialValues={{ properties: [] }} currentLimit={cardsLimit} totalLimit={previewPropertiesLimit}>
                  <Button type="button" className={sButton.btnRoundPlus} block size="lg" onClick={() => this.toggle()}>
                    <Icon className={s.icon} icon="modal" />
                  </Button>
                </ModalAddProperty>
              }
              <Group kind={detailsField.propertyId.touched && !!detailsField.propertyId.error && `error`}>
                {detailsField.propertyId.touched && detailsField.propertyId.error && <Helper>{detailsField.propertyId.error}</Helper>}
              </Group>
            </Heading>
          </Col>
        </Row>
        <Row>
          <Col xs="20">
            {!!propertyId.value && <Property isPreview id={propertyId.value} resourcePath={`/v1/properties/${propertyCategory.value}`} handleDelete={() => ::this.handlePropertyRemove(propertyId.value)} isStatic={isStatic} />}
            {!propertyId.value && <Heading notFound className={cn(sUtils.pushedBottom3, sUtils.pushedTop3)}>Нет объектов</Heading>}
          </Col>
        </Row>
      </section>
    );
  }
}

class PropertiesSelectionWrapper extends Component {
  render() {
    const { fields, values, formKey, data } = this.props;

    const isPreview = formKey === `create` ? values.kind === `preview` : data.kind === `preview`;
    const isNegotiation = formKey === `create` ? values.kind === `negotiation` : data.kind === `negotiation`;

    if (!isPreview && !isNegotiation) return null;

    return (
      <PropertiesList {...this.props} detailsField={isPreview ? fields.previewDetails : fields.negotiationDetails} />
    );
  }
}

export default reduxForm(taskFormSettings)(submitValidator()(PropertiesSelectionWrapper));
