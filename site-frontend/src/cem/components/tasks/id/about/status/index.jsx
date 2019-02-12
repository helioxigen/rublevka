import React, { Component } from 'react';

import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

import submitValidator from 'core/decorators/submitValidator';

import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  AsyncSelect,
  Icon,
  Heading,
  Grid: { Row, Col },
} = UI;

import ResponsibleUser from './responsibleUser';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import { fetchResource } from 'cem/helpers/autocomplete';

import { taskFormSettings } from 'cem/constants/tasks/form';

class About extends Component {
  render() {
    const { fields, values, formKey, data } = this.props;

    const isTaskCreatorShown =
      formKey !== 'create' &&
      values.responsibleUser.id !== data.reportedByUserId;

    return (
      <Row>
        {isTaskCreatorShown && (
          <Col sm="10">
            <Heading size="md">
              Поставил
              <Link
                className={s.linkIcon}
                to={`/staff/${data.reportedByUserId}`}
              >
                <Icon className={s.icon} icon="arrow" />
              </Link>
            </Heading>
            <ResponsibleUser id={data.reportedByUserId} />
          </Col>
        )}
        <Col className={sUtils.pushedTopXs4} sm="10">
          <Heading size="md">
            Ответственный
            {values.responsibleUser.id && (
              <Link
                className={s.linkIcon}
                to={`/staff/${values.responsibleUser.id}`}
              >
                <Icon className={s.icon} icon="arrow" />
              </Link>
            )}
          </Heading>
          {formKey === 'create' && (
            <FormField field={fields.responsibleUser.id}>
              <AsyncSelect
                asyncOptions={fetchResource('/v1/users/staff', 'lastName', [
                  'firstName',
                  'lastName',
                ])}
              />
            </FormField>
          )}
          <ResponsibleUser id={values.responsibleUser.id} />
        </Col>
      </Row>
    );
  }
}

export default reduxForm(taskFormSettings)(submitValidator()(About));
