import React, { Component } from 'react';

import FormField from 'cem/helpers/formField';
import { fetchResource } from 'cem/helpers/autocomplete';

import UI from 'cem/components/ui';
const {
  Form,
  AsyncSelect,
  Heading,
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';

export default class extends Component {
  render() {
    return (
      <Form.Container>
        <div className={s.container}>
          <Row className={sUtils.pushedBottom3}>
            <Col xs="20">
              <Heading size="md">Заявка на фотосессию</Heading>
            </Col>
          </Row>
          <Row>
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
        </div>
      </Form.Container>
    );
  }
}
