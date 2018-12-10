import React, { Component } from 'react';

import { validatorShortcut } from 'core/decorators/submitValidator';

import { commonFieldsFormSettings as formSettings } from 'cem/constants/settlements/form';

import UI from 'cem/components/ui';
const {
  Button, Heading,
  Grid: { Row, Col },
} = UI;

import CommonFields from './commonFields';
import PropertiesTable from 'cem/containers/settlements/table';

import cn from 'classnames';
import sButton from 'cem/styles/buttons';
import sUtils from 'cem/styles/utils';

import { transformProperty } from 'cem/actions/properties/helpers';

class PrimaryProperties extends Component {
  updateSettlement(values) {
    const { actions, settlementData } = this.props;

    // TODO Extract request data transformation
    const transformedDefaults = transformProperty(values || {});
    const updatedData = {
      ...settlementData,
      propertyDefaults: {
        ...(settlementData.propertyDefaults || {}),
        ...values,
        saleOffer: transformedDefaults.saleOffer,
      },
    };

    return actions.updateSettlement(settlementData.id, updatedData);
  }

  render() {
    const {
      id, isUpdateAllowed,
      fields, values, handleSubmit, pristine, error, submitting, valid,
    } = this.props;

    return (
      <section>
        <Row>
          <Col xs="20">
            <Heading size="md">Первичка</Heading>
          </Col>
          <Col xs="20">
            <CommonFields fields={fields} isUpdateAllowed={isUpdateAllowed} />
            <PropertiesTable id={id} commonValues={values} customSubmit={handleSubmit} commonFieldsValid={valid} />
          </Col>
        </Row>
        <Button className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)} disabled={error || submitting} kind="warning" size="md" block onClick={handleSubmit(::this.updateSettlement)}>Сохранить</Button>
      </section>
    );
  }
}

export default validatorShortcut(formSettings)(PrimaryProperties);
