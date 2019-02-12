import React, { Component } from 'react';
import { API } from 'core/config/resources';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import { formFields } from 'cem/constants/documents';
import validate from 'cem/validators/document';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { documents } from 'cem/actions/users/id';

import { fetchDictionary } from 'cem/helpers/autocomplete';
import { FormattedDate } from 'react-formatted';

import UI from 'cem/components/ui';
const {
  Table,
  Button,
  Icon,
  AsyncSelect,
  Heading,
  Form: { Group, Input, Helper },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const formSettings = {
  form: `documentsOfStaff`,
  fields: formFields,
  validate,
};

const DocumentForm = reduxForm(formSettings)(
  submitValidator()(
    class extends Component {
      onSubmitSuccess() {
        this.props.resetForm();
      }

      createOrUpdate(values) {
        const { formKey, resourceId, actions } = this.props;

        if (formKey === `add`) {
          return actions.createDocument(resourceId, values);
        } else {
          return actions.updateDocument(resourceId, formKey, values);
        }
      }

      remove() {
        const { formKey, actions, resourceId } = this.props;

        return actions.deleteDocument(resourceId, formKey);
      }

      render() {
        const {
          formKey,
          fields,
          values,

          handleSubmit,

          pristine,
          error,
          submitting,
        } = this.props;

        return (
          <Table.Row>
            <Table.Cell>
              <Group
                className={sUtils.resetIndentation}
                kind={fields.kindId.touched && !!fields.kindId.error && `error`}
              >
                <AsyncSelect
                  className={sUtils.resetBorder}
                  {...fields.kindId}
                  asyncOptions={fetchDictionary(`staff_document_type`)}
                  labelKey="title"
                  valueKey="id"
                  onBlur={() => {}}
                />
                {fields.kindId.touched && fields.kindId.error && (
                  <Helper>{fields.kindId.error}</Helper>
                )}
              </Group>
            </Table.Cell>
            <Table.Cell>
              <Row>
                <Col xs="16">
                  {formKey !== `add` && (
                    <FormattedDate
                      mask="dd.mm.yy @ HH:MM"
                      value={values.createdAt}
                    />
                  )}
                  {formKey === `add` && (
                    <Group
                      className={sUtils.resetIndentation}
                      kind={
                        fields.file.touched && !!fields.file.error && `error`
                      }
                    >
                      <Input type="file" {...fields.file} value={null} />
                      {fields.file.touched && fields.file.error && (
                        <Helper>{fields.file.error}</Helper>
                      )}
                    </Group>
                  )}
                </Col>
              </Row>
            </Table.Cell>
            <Table.Cell>
              <Group className={sUtils.resetIndentation}>
                <Input
                  className={s.tableInput}
                  type="text"
                  placeholder="Добавить комментарий"
                  {...fields.comment}
                />
              </Group>
            </Table.Cell>
            {formKey !== `add` && (
              <Table.Cell>
                <Group className={sUtils.resetIndentation}>
                  <Button
                    className={sButton.btnTableAction}
                    size="xs"
                    onClick={handleSubmit(
                      ::this.createOrUpdate,
                      ::this.onSubmitSuccess,
                    )}
                    disabled={pristine || error || submitting}
                  >
                    <Icon className={s.btnIcon} icon="checkmark" />
                  </Button>
                  <Button
                    className={sButton.btnTableAction}
                    size="xs"
                    to={`${API}/v1/users/staff/${
                      this.props.resourceId
                    }/documents/${formKey}/download?token=${
                      this.props.state.auth.token
                    }`}
                    target="_blank"
                  >
                    <Icon className={s.btnIcon} icon="download" />
                  </Button>
                  <Button
                    className={sButton.btnTableAction}
                    size="xs"
                    onClick={handleSubmit(::this.remove)}
                  >
                    <Icon className={s.btnIcon} icon="delete" />
                  </Button>
                </Group>
              </Table.Cell>
            )}
            {formKey === `add` && (
              <Table.Cell>
                <Group className={sUtils.resetIndentation}>
                  <Button
                    className={sButton.btnTableAction}
                    size="xs"
                    onClick={handleSubmit(
                      ::this.createOrUpdate,
                      ::this.onSubmitSuccess,
                    )}
                    disabled={pristine || error || submitting}
                  >
                    <Icon className={s.btnIcon} icon="checkmark" />
                  </Button>
                </Group>
              </Table.Cell>
            )}
          </Table.Row>
        );
      }
    },
  ),
);

class Documents extends Component {
  componentWillMount() {
    this.props.actions.loadDocuments(this.props.resourceId);
  }

  render() {
    const { resourceId, state } = this.props;
    const { documentsByUserId } = state.users;
    const { isFetching, items = [] } = documentsByUserId[resourceId] || {};

    if (isFetching) {
      return <UI.Loading />;
    }

    return (
      <section>
        <Heading size="md">Документы</Heading>

        <div className={sUtils.scrollX}>
          <Table.Container width="100%" className={sUtils.width120}>
            <Table.Row>
              <Table.Heading width="25%">Тип документа</Table.Heading>
              <Table.Heading width="30%">Дата загрузки</Table.Heading>
              <Table.Heading width="35%">Комментарий</Table.Heading>
              <Table.Heading width="10%">Действия</Table.Heading>
            </Table.Row>
            <DocumentForm {...this.props} formKey="add" />

            {items.map(item => (
              <DocumentForm
                {...this.props}
                key={item.id}
                formKey={item.id.toString()}
                initialValues={item}
              />
            ))}
          </Table.Container>
        </div>
      </section>
    );
  }
}

const pickState = ({ users, auth }) => ({
  state: { users, auth },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(documents, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(Documents);
