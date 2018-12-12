import React, { Component } from 'react';

import Deal from 'cem/containers/common/deal';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Form, Button, Heading,
  Grid: { Row, Col },
  Form: { Textarea },
} = UI;

import FormField from 'cem/helpers/formField';

import CallDetails from './details/call';

import ContactInlineCard from 'cem/_contacts/inlineCard';
import UserInlineCard from 'cem/_users/inlineCard';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class About extends Component {
  changeKind(requestKind) {
    const { data } = this.props;

    this.props.actions.pushPath(`/client_leads/${data.kind}/${data.id}?requestKind=${requestKind}`);
  }

  update() {
    const { values, formKey } = this.props;

    this.props.actions.updateLead(formKey, values);
  }

  render() {
    const {
      handleSubmit, formKey, pristine, error, submitting,
      data = {},
      fields,
      isUpdateAllowed, isSensitiveDataVisible,
    } = this.props;

    const isNew = formKey === `create`;
    const { id: clientLeadId, stateDetails = {}, responsibleUser = {}, createdByUser = {} } = data;
    const state = stateDetails.toApprove || data.state;
    const isStatic = (formKey !== `create` && !isUpdateAllowed) || data.stateDetails.toApprove || [`spam`, `rejected`, `processed`].indexOf(state) > -1;

    return (
      <Row>
        <section className={s.section}>
          <Form.Container onSubmit={handleSubmit(::this.update)}>
            <CallDetails className={sUtils.pushedBottom6} phoneCallDetails={data.phoneCallDetails} />

            {data.state === `processed` && data.dealId && (
              <Row className={sUtils.pushedBottom6}>
                <Col xs="20">
                  <Deal id={data.dealId} />
                </Col>
              </Row>
            )}

            {(formKey === `create` || isSensitiveDataVisible) && (
              <ContactInlineCard id={data.contactId} className={sUtils.pushedBottom6} />
            )}

            {!isStatic && <Heading size="md">Запрос</Heading>}
            {!isStatic && (
              <Row className={sUtils.pushedBottom6} sm="center">
                <Col md="18">
                  <Row sm="center">
                    <Col sm="6">
                      <div className={sUtils.textCenter}>
                        <Heading size="md">На покупку</Heading>

                        <Button kind="warning" type="button" onClick={() => ::this.changeKind(`purchase`)}>выбрать тип заявки</Button>
                      </div>
                    </Col>

                    <Col sm="6">
                      <div className={sUtils.textCenter}>
                        <Heading size="md">На продажу</Heading>

                        <Button kind="warning" type="button" onClick={() => ::this.changeKind(`selling`)}>выбрать тип заявки</Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}

            <Row className={sUtils.pushedBottom6}>
              <Col sm="20">
                <Heading size="md">Заметки</Heading>

                <FormField field={fields.note} isStatic={isStatic}>
                  <Textarea rows="6" block />
                </FormField>
              </Col>
            </Row>
            <Button className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)} disabled={error || submitting} kind="warning" size="md" block>Сохранить</Button>
          </Form.Container>

          {!isNew && (
            <Row>
              <Col sm="10">
                <UserInlineCard id={createdByUser.id} title="Принял" />
              </Col>
              <Col sm="10">
                <UserInlineCard id={responsibleUser.id} />
              </Col>
            </Row>
          )}
        </section>
      </Row>
    );
  }
}

export default About;
