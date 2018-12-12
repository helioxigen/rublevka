import React, { Component } from 'react';

import Deal from 'cem/containers/common/deal';

import UI from 'cem/components/ui';
const {
  Form, Heading,
  Grid: { Container, Row, Col },
  Form: { Textarea },
} = UI;

import FormField from 'cem/helpers/formField';

import CallDetails from './details/call';
import ContactDetails from './details/contact';
import RequestDetailsList from './details/request';
import Status from './status';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class About extends Component {
  render() {
    const { fields, data, formKey, requestKind, isUpdateAllowed, isSensitiveDataVisible } = this.props;
    const RequestDetails = RequestDetailsList[requestKind];
    const state = data.state;
    const stateDetails = data.stateDetails || {};

    const isStatic = (formKey !== 'create' && !isUpdateAllowed) || stateDetails.toApprove || (['spam', 'processed', 'rejected'].indexOf(state) > -1) || (state === 'new' && data.kind !== 'phone_call') || (state === 'new' && data.kind === 'phone_call' && !requestKind);
    const isPhoneStatic = isStatic || !(data.kind === 'recommendation' || formKey === 'create');

    return (
      <Container fluid>
        <Row>
          <section className={s.section}>
            <Form.Container>
              {data.kind === 'phone_call' && <CallDetails phoneCallDetails={data.phoneCallDetails} />}

              {data.state === 'processed' && data.dealId &&
                <Row className={sUtils.pushedBottom3}>
                  <Col xs="20">
                    <Deal id={data.dealId} />
                  </Col>
                </Row>
              }

              {(formKey === 'create' || isSensitiveDataVisible) &&
                <ContactDetails fields={fields.contactDetails} isStatic={isStatic} isPhoneStatic={isPhoneStatic} data={data} />
              }

              {!!requestKind &&
                <RequestDetails {...this.props} leadState={state} isStatic={isStatic} />
              }

              <Row className={sUtils.pushedBottom3}>
                <Col sm="20">
                  <Heading size="md">Комментарий</Heading>

                  <FormField field={fields.note}>
                    <Form.Textarea className={s.textarea} rows="9" block kind="primary" disabled={isStatic} />
                  </FormField>
                </Col>
              </Row>

              {formKey !== 'create' &&
                <Row>
                  <Col xs="20">
                    <Status data={data} state={this.props.state} actions={this.props.actions} />
                  </Col>
                </Row>
              }
            </Form.Container>
          </section>
        </Row>
      </Container>
    );
  }
}

export default About;
