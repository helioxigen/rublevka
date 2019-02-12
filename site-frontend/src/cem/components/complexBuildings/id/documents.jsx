import React, { Component } from 'react';

import { API } from 'core/config/resources';

import { fetchDictionary } from 'cem/helpers/autocomplete';
import { FormattedDate } from 'react-formatted';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import { formFields } from 'cem/constants/documents';
import validate from 'cem/validators/document';

import UI from 'cem/components/ui';
const {
  Grid,
  Table,
  Button,
  Icon,
  AsyncSelect,
  Heading,
  Form: { Group, Static, Helper, Input },
  Grid: { Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const formSettings = {
  form: `complexBuildingDocuments`,
  fields: formFields,
  validate,
};

const DocumentForm = reduxForm(formSettings)(
  submitValidator()(
    class extends Component {
      onSubmitSuccess() {
        const { formKey, actions } = this.props;

        if (formKey === `create`) actions.pop(`success`, `Документ загружен!`);
        if (formKey !== `create`) actions.pop(`success`, `Документ обновлён!`);
      }

      createOrUpdate() {
        const { formKey, values, actions, complexBuildingId } = this.props;

        if (formKey === `create`) {
          actions.pop(`warning`, `Загрузка документа начата`);
          return actions.uploadDocument(complexBuildingId, values);
        }
        if (formKey !== `create`)
          return actions.updateDocument(complexBuildingId, formKey, values);
      }

      delete() {
        const { formKey, actions, complexBuildingId } = this.props;
        return actions.deleteDocument(complexBuildingId, formKey);
      }

      render() {
        const {
          formKey,
          fields,
          handleSubmit,
          values,
          pristine,
          error,
          submitting,
          complexBuildingId,
          state,
        } = this.props;

        return (
          <Table.Row>
            <Table.Cell>
              <Grid.Row>
                <Col xs="16">
                  <Group
                    className={sUtils.resetIndentation}
                    kind={
                      fields.kindId.touched && !!fields.kindId.error && `error`
                    }
                  >
                    <AsyncSelect
                      className={sUtils.resetBorder}
                      asyncOptions={fetchDictionary(
                        `complex_building_document_type`,
                      )}
                      labelKey="title"
                      valueKey="id"
                      {...fields.kindId}
                    />
                    {fields.kindId.touched && fields.kindId.error && (
                      <Helper>{fields.kindId.error}</Helper>
                    )}
                  </Group>
                </Col>
              </Grid.Row>
            </Table.Cell>
            <Table.Cell>
              {formKey !== `create` && (
                <Group className={sUtils.resetIndentation}>
                  <Static>{values.uploaderTitle}</Static>
                </Group>
              )}
              {formKey === `create` && (
                <Group
                  className={sUtils.resetIndentation}
                  kind={fields.file.touched && !!fields.file.error && `error`}
                >
                  <Input type="file" {...fields.file} value={null} />
                  {fields.file.touched && fields.file.error && (
                    <Helper>{fields.file.error}</Helper>
                  )}
                </Group>
              )}
            </Table.Cell>
            <Table.Cell>
              {formKey !== `create` && (
                <Group className={sUtils.resetIndentation}>
                  <Static>
                    <FormattedDate
                      mask="dd.mm.yy @ HH:MM"
                      value={values.createdAt}
                    />
                  </Static>
                </Group>
              )}
            </Table.Cell>
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
                {formKey !== `create` && (
                  <Button
                    className={sButton.btnTableAction}
                    size="xs"
                    to={`${API}/v1/complex_buildings/${complexBuildingId}/documents/${formKey}/download?token=${
                      state.auth.token
                    }`}
                    target="_blank"
                  >
                    <Icon className={s.btnIcon} icon="download" />
                  </Button>
                )}
                {formKey !== `create` && (
                  <Button
                    className={sButton.btnTableAction}
                    size="xs"
                    type="button"
                    onClick={::this.delete}
                  >
                    <Icon className={s.btnIcon} icon="delete" />
                  </Button>
                )}
              </Group>
            </Table.Cell>
          </Table.Row>
        );
      }
    },
  ),
);

class Documents extends Component {
  componentWillMount() {
    const { actions, data = {} } = this.props;

    if (data.id) actions.loadDocuments(data.id);
  }

  componentWillReceiveProps(nextProps) {
    const data = this.props.data || {};
    const nextData = nextProps.data || {};

    if (data.id !== nextData.id) this.props.actions.loadDocuments(nextData.id);
  }

  render() {
    const { actions, data = {}, state } = this.props;
    const documents = state.documentsByComplexBuildingId[data.id] || [];

    return (
      <Grid.Row>
        <Col className={s.section}>
          <Grid.Row>
            <Col xs="20">
              <Heading size="md">Документы</Heading>
            </Col>
          </Grid.Row>
          <Grid.Row>
            <Col xs="20">
              <Table.Container width="100%">
                <Table.Row>
                  <Table.Heading width="35%">Тип документа</Table.Heading>
                  <Table.Heading width="30%">Загрузил</Table.Heading>
                  <Table.Heading width="25%">Дата загрузки</Table.Heading>
                  <Table.Heading width="10%">Действия</Table.Heading>
                </Table.Row>
                <DocumentForm
                  formKey="create"
                  complexBuildingId={data.id}
                  actions={actions}
                  state={state}
                />
                {documents.map((doc, index) => (
                  <DocumentForm
                    key={index}
                    complexBuildingId={data.id}
                    initialValues={doc}
                    formKey={doc.id}
                    actions={actions}
                    state={state}
                  />
                ))}
              </Table.Container>
            </Col>
          </Grid.Row>
        </Col>
      </Grid.Row>
    );
  }
}

export default Documents;
