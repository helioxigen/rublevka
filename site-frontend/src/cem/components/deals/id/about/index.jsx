import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';

import { validate } from 'cem/validators/deals';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Form, Button, Heading,
  Grid: { Row, Col },
  Form: { Group, Textarea, Static },
} = UI;
import ClientInfo from './clientInfo';
import DealInfoForm from '../dealInfoForm';
import ResponsibleUser from './responsibleUser';
import Source from './source';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class About extends Component {
  onSubmitSuccess() {
    this.props.actions.pop(`success`, `Сделка обновлена!`);
  }

  onSubmitFail() {
    this.props.actions.pop(`error`, `Ошибка обновления сделки!`);
  }

  update(values) {
    const { formKey, actions } = this.props;
    if (formKey !== `create`) {
      const { expectedAgentFee, expectedAgentFixedPrice, ...otherDetails } = values.details;
      return actions.update({
        ...values,
        details: {
          ...otherDetails,
          ...(values.isAgentFixed === `true` ? { expectedAgentFixedPrice } : { expectedAgentFee }),
          isAgentFixed: undefined,
        },
      });
    }
  }

  render() {
    const {
      fields, values, formKey, handleSubmit, pristine, error, submitting,
      isUpdateAllowed, isSensitiveDataVisible,
    } = this.props;
    const isDealFinalized = fields.state.value === `successful` || fields.state.value === `unsuccessful`;
    const isApprovalNeeded = fields.stateDetails.toApprove.value === `successful` || fields.stateDetails.toApprove.value === `unsuccessful`;

    const isFormStatic = !isUpdateAllowed || isApprovalNeeded || isDealFinalized;

    const propertyIdStates = [`negotiation`, `deposit_paid`, `agreement`, `successful`];
    const isPropertySelectionAvailable = propertyIdStates.indexOf(fields.state.value) > - 1;

    return (
      <Row>
        <section className={s.section}>
          <Form.Container onSubmit={handleSubmit(::this.update, ::this.onSubmitSuccess, ::this.onSubmitFail)}>
            <Row className={sUtils.pushedBottom3}>
              <Col sm="10">
                <Row>
                  <Col lg="16">
                    <DealInfoForm values={values} fields={fields} isStatic={isFormStatic}
                      isPropertySelectionAvailable={isPropertySelectionAvailable}
                      headerSection={<Heading size="md">Информация о сделке</Heading>} />
                  </Col>
                </Row>
              </Col>
              {isSensitiveDataVisible &&
                <Col sm="10">
                  <Row>
                    <Col lg="16">
                      <ClientInfo {...this.props.linkedContactData} kindIdField={fields.contactDetails.kindId} isStatic={isFormStatic} />
                    </Col>
                  </Row>
                </Col>
              }
            </Row>
            <Row className={sUtils.pushedBottom3}>
              <Col lg="18">
                {(!isFormStatic || !!fields.details.note.value) && <Heading size="md">Примечание</Heading>}
                <Group>
                  {!isFormStatic && <Textarea className={s.textarea} rows="9" block kind="primary" {...fields.details.note} value={fields.details.note.value || ``} />}
                  {isFormStatic && <Static>{fields.details.note.value}</Static>}
                </Group>
              </Col>
            </Row>
            <Row>
              <Col sm="10">
                {!!this.props.linkedUserData.id && (
                  <ResponsibleUser {...this.props.linkedUserData} />
                )}
              </Col>
              <Col sm="10">
                {!!this.props.linkedLeadData.id && (
                  <Source {...this.props.linkedLeadData} />
                )}
              </Col>
            </Row>
            {formKey !== `create` && <Button className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)} disabled={error || submitting} type="submit" kind="warning" size="md" block>Сохранить</Button>}
          </Form.Container>
        </section>
      </Row>
    );
  }
}

const formSettings = {
  form: `deal`,
  validate,
};

export default reduxForm(formSettings)(submitValidator()(About));
