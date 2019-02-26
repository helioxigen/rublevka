import React, { Component } from 'react';

import FormField from 'cem/helpers/formField';

import ContactDetails from './contactDetails';
import RequestDetails from './requestDetails';

import UI from 'cem/components/ui';
const {
  Form,
  Heading,
  Grid: { Container, Row, Col },
  Form: { Textarea },
} = UI;

import s from 'cem/styles/id/content';
import sModal from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';

class About extends Component {
  render() {
    const {
      fields,
      data = {},
      formKey,
      isUpdateAllowed,
      isSensitiveDataVisible,
    } = this.props;
    const state = data.state;
    const stateDetails = data.stateDetails || {};

    const isStatic =
      (formKey !== 'create' && !isUpdateAllowed) ||
      stateDetails.toApprove ||
      ['spam', 'processed', 'rejected'].indexOf(state) > -1;
    const isPhoneStatic =
      isStatic || !(data.kind === 'recommendation' || formKey === 'create');

    return (
      <Container fluid>
        <Row>
          <Col xs="20">
            <Form.Container className={sModal.container}>
              <div className={sUtils.height60}>
                {(formKey === 'create' || isSensitiveDataVisible) && (
                  <ContactDetails
                    fields={fields.contactDetails}
                    isStatic={isStatic}
                    isPhoneStatic={isPhoneStatic}
                    data={data}
                  />
                )}
                <RequestDetails {...this.props} isStatic={isStatic} />

                <Row className={sUtils.pushedBottom3}>
                  <Col xs="20">
                    <Heading size="md">Комментарий</Heading>
                    <FormField field={fields.note}>
                      <Form.Textarea
                        className={s.textarea}
                        rows="9"
                        block
                        kind="primary"
                        disabled={isStatic}
                      />
                    </FormField>
                  </Col>
                </Row>
              </div>
            </Form.Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default About;
