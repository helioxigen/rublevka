import React, { Component } from 'react';

import FormField from 'cem/helpers/formField';
import { fetchResource } from 'cem/helpers/autocomplete';

import UI from 'cem/components/ui';
const {
  AsyncSelect,
  Heading,
  Grid: { Row, Col },
  Form: { Container },
} = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';

export default class extends Component {
  render() {
    return (
      <Container className={s.container} fluid>
        <Row className={sUtils.pushedBottom3}>
          <Col xs="20">
            <Heading size="md">Выбрать исполнителя</Heading>
          </Col>
        </Row>
        <Row className={sUtils.pushedTop3}>
          <Col sm="20">
            <FormField
              float
              label="Ответственный сотрудник"
              field={this.props.field}
            >
              <AsyncSelect
                asyncOptions={fetchResource(
                  '/v1/users/staff',
                  'lastName,firstName',
                  ['firstName', 'lastName'],
                )}
              />
            </FormField>
          </Col>
        </Row>
      </Container>
    );
  }
}
