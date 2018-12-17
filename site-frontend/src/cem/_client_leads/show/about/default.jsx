import React, { Component } from 'react';

import Deal from 'cem/containers/common/deal';

import UI from 'cem/components/ui';
const {
  Form,
  Heading,
  Grid: { Container, Row, Col },
  Form: { Textarea },
} = UI;

import FormField from 'cem/helpers/formField';

import CallDetails from './details/call';
import ContactDetails from './details/contact';
import RequestDetailsList from './details/request';

import ContactInlineCard from 'cem/_contacts/inlineCard';
import UserInlineCard from 'cem/_users/inlineCard';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class About extends Component {
  render() {
    const {
      fields,
      data = {},
      formKey,
      requestKind,
      isUpdateAllowed,
      isSensitiveDataVisible,
    } = this.props;
    const RequestDetails = RequestDetailsList[requestKind];
    const {
      id: clientLeadId,
      state,
      stateDetails = {},
      responsibleUser = {},
      createdByUser = {},
    } = data;

    const isNew = formKey === 'create';

    const isStatic =
      (formKey !== 'create' && !isUpdateAllowed) ||
      stateDetails.toApprove ||
      ['spam', 'processed', 'rejected'].indexOf(state) > -1 ||
      (state === 'new' && !requestKind);

    return (
      <Row>
        <section className={s.section}>
          <Form.Container>
            {data.kind === 'phone_call' && (
              <CallDetails
                className={sUtils.pushedBottom6}
                phoneCallDetails={data.phoneCallDetails}
              />
            )}

            {data.state === 'processed' && data.dealId && (
              <Deal id={data.dealId} className={sUtils.pushedBottom6} />
            )}

            {formKey !== 'create' && isSensitiveDataVisible && (
              <ContactInlineCard id={data.contactId} className={sUtils.pushedBottom6} />
            )}

            {formKey === 'create' && (
              <ContactDetails fields={fields.contactDetails} isStatic={isStatic} data={data} />
            )}

            {!!requestKind && (
              <RequestDetails
                {...this.props}
                className={sUtils.pushedBottom6}
                leadState={state}
                isStatic={isStatic}
              />
            )}

            <Row className={sUtils.pushedBottom6}>
              <Col sm="20">
                <Heading size="md">Заметки</Heading>

                <FormField float label="Заметки" field={fields.note} isStatic={isStatic}>
                  <Textarea rows="6" block />
                </FormField>
              </Col>
            </Row>
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
