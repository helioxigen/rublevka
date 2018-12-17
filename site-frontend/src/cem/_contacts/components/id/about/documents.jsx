import React, { Component } from 'react';
import { API } from 'core/config/resources';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import { formFields } from 'cem/constants/documents';
import validate from 'cem/validators/document';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ContactActions from 'cem/_contacts/old_actions';

import { fetchDictionary } from 'cem/helpers/autocomplete';
import { FormattedDate } from 'react-formatted';

import UI from 'cem/components/ui';
const {
  Grid,
  Table,
  Button,
  Icon,
  AsyncSelect,
  Form: { Group, Input, Helper },
  Table: { Cell, Heading, Row },
  Grid: { Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const formSettings = {
  form: 'documentsOfContacts',
  fields: formFields,
  validate,
};

const DocumentForm = reduxForm(formSettings, () => {})(
  submitValidator()(
    class extends Component {
      onSubmitSuccess() {
        if (this.props.formKey === 'add') this.props.resetForm();
      }

      createOrUpdate(values) {
        const { formKey, actions, contactId } = this.props;

        if (formKey === 'add') {
          return actions.createDocument(contactId, values);
        }
        return actions.updateDocument(contactId, formKey, values);
      }

      remove() {
        const { formKey, actions, contactId } = this.props;

        actions.deleteDocument(contactId, formKey);
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
          state,
        } = this.props;

        return (
          <div>
            <Row className={sUtils.pushedBottom6}>
              <Col xs="20">
                <Heading size="md">Документы</Heading>
                <Row>
                  <Cell>
                    <Group
                      className={sUtils.resetIndentation}
                      kind={fields.kindId.touched && !!fields.kindId.error && 'error'}
                    >
                      <AsyncSelect
                        className={sUtils.resetBorder}
                        asyncOptions={fetchDictionary('contact_document_type')}
                        {...fields.kindId}
                        labelKey="title"
                        valueKey="id"
                        onBlur={() => {}}
                      />
                      {fields.kindId.touched && fields.kindId.error && (
                        <Helper>{fields.kindId.error}</Helper>
                      )}
                    </Group>
                  </Cell>
                  <Cell>
                    <Grid.Row>
                      <Col xs="16">
                        {formKey !== 'add' && (
                          <FormattedDate mask="dd.mm.yy @ HH:MM" value={values.createdAt} />
                        )}
                        {formKey === 'add' && (
                          <Group
                            className={sUtils.resetIndentation}
                            kind={fields.file.touched && !!fields.file.error && 'error'}
                          >
                            <Input type="file" {...fields.file} value={null} />
                            {fields.file.touched && fields.file.error && (
                              <Helper>{fields.file.error}</Helper>
                            )}
                          </Group>
                        )}
                      </Col>
                    </Grid.Row>
                  </Cell>
                  <Cell>
                    <Group className={sUtils.resetIndentation}>
                      <Input
                        className={s.tableInput}
                        type="text"
                        placeholder="Добавить комментарий"
                        {...fields.comment}
                      />
                    </Group>
                  </Cell>
                  {formKey !== 'add' && (
                    <Cell>
                      <Group className={sUtils.resetIndentation}>
                        <Button
                          className={sButton.btnTableAction}
                          size="xs"
                          onClick={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)}
                          disabled={pristine || error || submitting}
                        >
                          <Icon className={s.btnIcon} icon="checkmark" />
                        </Button>
                        <Button
                          className={sButton.btnTableAction}
                          size="xs"
                          to={`${API}/v1/contacts/${
                            this.props.contactId
                          }/documents/${formKey}/download?token=${state.auth.token}`}
                          target="_blank"
                        >
                          <Icon className={s.btnIcon} icon="download" />
                        </Button>
                        {/* <Button className={sButton.btnTableAction} size="xs">
                        <Icon className={s.btnIcon} icon="delete" />
                      </Button> */}
                      </Group>
                    </Cell>
                  )}
                  {formKey === 'add' && (
                    <Cell>
                      <Group className={sUtils.resetIndentation}>
                        <Button
                          className={sButton.btnTableAction}
                          size="xs"
                          onClick={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)}
                          disabled={pristine || error || submitting}
                        >
                          <Icon className={s.btnIcon} icon="checkmark" />
                        </Button>
                      </Group>
                    </Cell>
                  )}
                </Row>
              </Col>
            </Row>
          </div>
        );
      }
    },
  ),
);

class Documents extends Component {
  componentWillMount() {
    this.props.actions.loadDocuments(this.props.contactId);
  }

  render() {
    const {
      actions,
      state,
      state: {
        documents: { items = [] },
      },
    } = this.props;

    return (
      <div className={sUtils.scrollX}>
        <Table.Container width="100%" className={sUtils.width120}>
          <Row>
            <Heading width="25%">Тип документа</Heading>
            <Heading width="30%">Дата загрузки</Heading>
            <Heading width="35%">Комментарий</Heading>
            <Heading width="10%">Действия</Heading>
          </Row>
          <DocumentForm contactId={this.props.contactId} formKey="add" actions={actions} />

          {items.map((item, index) => (
            <DocumentForm
              key={index}
              contactId={this.props.contactId}
              formKey={item.id.toString()}
              actions={actions}
              initialValues={item}
              state={state}
            />
          ))}
        </Table.Container>
      </div>
    );
  }
}

const pickState = ({ contacts: { documents = {} }, auth }) => ({
  state: { documents, auth },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...ContactActions }, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(Documents);
