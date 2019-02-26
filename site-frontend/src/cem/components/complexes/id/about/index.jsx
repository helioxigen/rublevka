import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import { formSettings } from 'cem/constants/complexes/form';

import Comments from 'cem/containers/common/comments';
import Buildings from 'cem/containers/complexes/buildings';
import LinkedContacts from 'cem/containers/complexes/linkedContacts';

import UI from 'cem/components/ui';
const {
  // Heading,
  Grid: { Row, Col },
  // Form: { Group, Textarea, Helper },
} = UI;

import Address from './address';
import Status from './status';
import Description from './description';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class About extends Component {
  render() {
    const { formKey, data, isUpdateAllowed } = this.props;

    return (
      <Row>
        <section className={s.section}>
          <Address className={sUtils.pushedBottom6} {...this.props} />
          {formKey !== 'create' && (
            <Row className={sUtils.pushedBottom6}>
              <Col sm="20">
                <Buildings {...this.props} />
              </Col>
            </Row>
          )}
          <Row className={sUtils.pushedBottom6}>
            <Col xs="20">
              <Description {...this.props} />
            </Col>
          </Row>
          {formKey !== 'create' && (
            <Row className={sUtils.pushedBottom6}>
              <Col xs="20">
                <LinkedContacts
                  complexData={data}
                  isUpdateAllowed={isUpdateAllowed}
                />
              </Col>
            </Row>
          )}
          {/* <Row className={sUtils.pushedBottom6}>
            <Col xs="20">
              <Heading size="md">Примечание</Heading>
              <Group kind={fields.note.touched && fields.note.error && `error`}>
                <Textarea className={s.textarea} disabled={!isUpdateAllowed} rows="9" block kind="primary" {...fields.note} value={fields.note.value || ``} />
                {fields.note.touched && fields.note.error && <Helper>{fields.note.error}</Helper>}
              </Group>
            </Col>
          </Row> */}
          {formKey !== 'create' && (
            <Row className={sUtils.pushedBottom6}>
              <Col sm="20">
                <Comments
                  entity={{ key: 'complexes', id: formKey.toString() }}
                  isSubscriptionAvailable
                />
              </Col>
            </Row>
          )}
          <Status {...this.props} />
        </section>
      </Row>
    );
  }
}

export default reduxForm(formSettings)(About);
