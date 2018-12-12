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
  Grid, Table, Button, Heading,
  Form, Icon, AsyncSelect,
  Grid: { Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const formSettings = {
  form: `settlementDocuments`,
  fields: formFields,
  validate,
};

const DocumentForm = reduxForm(formSettings)(submitValidator()(
  class extends Component {

    createOrUpdate() {
      const { formKey, values, actions, settlementId } = this.props;

      if (formKey === `add`) return actions.uploadDocument(settlementId, values);
      if (formKey !== `add`) return actions.updateDocument(settlementId, formKey, values);
    }

    delete() {
      const { formKey, actions, settlementId } = this.props;
      return actions.deleteDocument(settlementId, formKey);
    }

    render() {
      const {
        formKey, fields, handleSubmit, values, pristine, error, submitting,
        settlementId, state,
      } = this.props;

      return (
        <Table.Row>
          <Table.Cell>
            <Grid.Row>
              <Col xs="16">
                <Form.Group className={sUtils.resetIndentation} kind={fields.kindId.touched && !!fields.kindId.error && `error`}>
                  <AsyncSelect className={sUtils.resetBorder} {...fields.kindId} asyncOptions={fetchDictionary(`settlement_document_type`)} labelKey="title" valueKey="id" onBlur={() => {}} />
                  {fields.kindId.touched && fields.kindId.error && <Form.Helper>{fields.kindId.error}</Form.Helper>}
                </Form.Group>
              </Col>
            </Grid.Row>
          </Table.Cell>
            <Table.Cell>
              {formKey !== `add` && (
                <Form.Group className={sUtils.resetIndentation}>
                  <Form.Static>{values.uploaderTitle}</Form.Static>
                </Form.Group>
              )}
              {formKey === `add` && (
                <Form.Group className={sUtils.resetIndentation} kind={fields.file.touched && !!fields.file.error && `error`}>
                  <Form.Input type="file" {...fields.file} value={null} />
                  {fields.file.touched && fields.file.error && <Form.Helper>{fields.file.error}</Form.Helper>}
                </Form.Group>
              )}
            </Table.Cell>
          {formKey !== `add` && (
            <Table.Cell>
              <Form.Group className={sUtils.resetIndentation}>
                <Form.Static><FormattedDate mask="dd.mm.yy @ HH:MM" value={values.createdAt} /></Form.Static>
              </Form.Group>
            </Table.Cell>
          )}
          {formKey === `add` && <Table.Cell>&nbsp;</Table.Cell>}
          {formKey !== `add` && (
            <Table.Cell>
              <Form.Group className={sUtils.resetIndentation}>
                <Button className={sButton.btnTableAction} size="xs" onClick={handleSubmit(::this.createOrUpdate)} disabled={pristine || error || submitting}>
                  <Icon className={s.btnIcon} icon="checkmark" />
                </Button>
                <Button className={sButton.btnTableAction} size="xs" to={`${API}/v1/places/settlements/${settlementId}/documents/${formKey}/download?token=${state.auth.token}`} target="_blank">
                  <Icon className={s.btnIcon} icon="download" />
                </Button>
                <Button className={sButton.btnTableAction} size="xs" type="button" onClick={::this.delete}>
                  <Icon className={s.btnIcon} icon="delete" />
                </Button>
              </Form.Group>
            </Table.Cell>
          )}
          {formKey === `add` && (
            <Table.Cell>
              <Form.Group className={sUtils.resetIndentation}>
                <Button className={sButton.btnTableAction} size="xs" onClick={handleSubmit(::this.createOrUpdate)} disabled={pristine || error || submitting}>
                  <Icon className={s.btnIcon} icon="checkmark" />
                </Button>
              </Form.Group>
            </Table.Cell>
          )}
        </Table.Row>
      );
    }
  })
);

export default class extends Component {
  componentWillMount() {
    const data = this.props.data || {};
    if (data.id) this.props.actions.loadDocuments(data.id);
  }

  componentWillReceiveProps(nextProps) {
    const data = this.props.data || {};
    const nextData = nextProps.data || {};

    if (data.id !== nextData.id) this.props.actions.loadDocuments(nextData.id);
  }

  render() {
    const { actions, data = {}, state } = this.props;
    const documents = state.documentsBySettlementId[data.id] || [];

    return (
      <Grid.Row>
        <section className={s.section}>
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

                <DocumentForm formKey="add" settlementId={data.id} actions={actions} state={state} />

                {documents.map((doc, index) =>
                  <DocumentForm key={index} settlementId={data.id} initialValues={doc} formKey={doc.id} actions={actions} state={state} />
                )}
              </Table.Container>
            </Col>
          </Grid.Row>
        </section>
      </Grid.Row>
    );
  }
}
