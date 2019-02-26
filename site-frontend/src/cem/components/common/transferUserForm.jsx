import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import {
  selectLabels,
  headers,
  valueKeys,
} from 'cem/constants/transfer/dictionaries';

import UI from 'cem/components/ui';
const {
  Form,
  Button,
  AsyncSelect,
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import FormField from 'cem/helpers/formField';
import { fetchResource } from 'cem/helpers/autocomplete';

import submitValidator from 'core/decorators/submitValidator';
import validate from 'cem/validators/transfer';

const formSettings = {
  form: `transfer`,
  fields: [`responsibleUserId`],
  destroyOnUnmout: true,
  validate,
};

class TransferUser extends Component {
  transferObject() {
    const {
      values: { responsibleUserId },
      objectKind,
      objectId,
      transferAction,
      reloadAction,
      closeModal,
    } = this.props;

    return transferAction(objectKind, objectId, responsibleUserId).then(() => {
      closeModal();
      reloadAction(objectId);
    });
  }

  render() {
    const {
      fields,
      handleSubmit,
      destinationKind,
      responsibleUser,
      restrictToCurrentDepartment = false,
    } = this.props;

    const departmentFilter = {
      'details.departmentId':
        (restrictToCurrentDepartment &&
          responsibleUser.details &&
          responsibleUser.details.departmentId) ||
        undefined,
    };

    const selectOptions = {
      users: fetchResource(
        `/v1/users/staff`,
        `lastName`,
        [`firstName`, `lastName`],
        { id: responsibleUser.id },
        departmentFilter,
      ),
      departments: fetchResource(
        `/v1/daily_duty/current`,
        `departmentTitle`,
        [`departmentTitle`],
        {
          departmentId:
            responsibleUser.details && responsibleUser.details.departmentId,
        },
      ),
    };

    return (
      <Form.Container onSubmit={handleSubmit(::this.transferObject)}>
        <Container fluid className={s.container}>
          <Row className={sUtils.pushedBottom3}>
            <Col xs="20">
              <Heading size="md">Передача {headers[destinationKind]}</Heading>
            </Col>
          </Row>
          <Row className={sUtils.pushedBottom3}>
            <Col sm="20">
              <FormField
                field={fields.responsibleUserId}
                label={selectLabels[destinationKind]}
                float
              >
                <AsyncSelect
                  asyncOptions={selectOptions[destinationKind]}
                  valueKey={valueKeys[destinationKind]}
                />
              </FormField>
            </Col>
          </Row>
        </Container>
        <Button type="submit" block kind="success" className={sButton.btnWide}>
          Передать
        </Button>
      </Form.Container>
    );
  }
}

export default reduxForm(formSettings)(submitValidator()(TransferUser));
