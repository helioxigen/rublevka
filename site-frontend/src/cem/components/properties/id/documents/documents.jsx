import React, { Component } from 'react';
import { API } from 'core/config/resources';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DocumentActions from 'cem/actions/properties/documents';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import { validateDocument } from 'cem/validators/properties';

import { fetchDictionary } from 'cem/helpers/autocomplete';
import { FormattedDate } from 'react-formatted';

import UI from 'cem/components/ui';
const {
  Grid, Table, Heading,
  Button, Icon, AsyncSelect,
  Form: { Group, Input, Helper },
  Grid: { Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const formSettings = {
  form: `documentsOfProperties`,
  fields: [`kindId`, `file`, `createdAt`, `uploaderTitle`],
  validate: validateDocument,
};

const DocumentForm = reduxForm(formSettings)(submitValidator()(
  class extends Component {
    onSubmitSuccess() {
      if (this.props.formKey === `add`) this.props.resetForm();
    }

    createOrUpdate() {
      const { formKey, values, actions, propertyId, category } = this.props;
      if (formKey === `add`) return actions.linkDocument(propertyId, values, category);
      if (formKey !== `add`) return actions.updateDocument(propertyId, formKey, values, category);
    }

    unlink() {
      const { formKey, actions, propertyId, category } = this.props;
      return actions.unlinkDocument(propertyId, formKey, category);
    }

    render() {
      const {
        formKey, fields, values, handleSubmit, pristine, error, submitting,
        propertyId, category,
        state,
      } = this.props;

      return (
        <Table.Row>
          <Table.Cell>
            <Group className={sUtils.resetIndentation} kind={fields.kindId.touched && !!fields.kindId.error && `error`}>
              <AsyncSelect className={sUtils.resetBorder} {...fields.kindId} asyncOptions={fetchDictionary(`property_document_type`)} labelKey="title" valueKey="id" onBlur={() => {}} />
              {fields.kindId.touched && fields.kindId.error && <Helper>{fields.kindId.error}</Helper>}
            </Group>
          </Table.Cell>
          <Table.Cell>
            {formKey !== `add` && (
              <Grid.Row>{values.uploaderTitle}</Grid.Row>
            )}
          </Table.Cell>
          <Table.Cell>
            <Grid.Row>
              <Col xs="16">
                {formKey !== `add` && <FormattedDate mask="dd.mm.yy @ HH:MM" value={values.createdAt} />}
                {formKey === `add` &&
                  <Group className={sUtils.resetIndentation} kind={fields.file.touched && !!fields.file.error && `error`}>
                    <Input type="file" {...fields.file} value={null} />
                    {fields.file.touched && fields.file.error && <Helper>{fields.file.error}</Helper>}
                  </Group>
                }
              </Col>
            </Grid.Row>
          </Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
          {formKey !== `add` && (
            <Table.Cell>
              <Group className={sUtils.resetIndentation}>
                <Button className={sButton.btnTableAction} size="xs" onClick={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)} disabled={pristine || error || submitting}>
                  <Icon className={s.btnIcon} icon="checkmark" />
                </Button>
                <Button className={sButton.btnTableAction} size="xs" to={`${API}/v1/properties/${category}/${propertyId}/documents/${formKey}/download?token=${state.auth.token}`} target="_blank">
                  <Icon className={s.btnIcon} icon="download" />
                </Button>
                <Button className={sButton.btnTableAction} size="xs" onClick={handleSubmit(::this.unlink)}>
                  <Icon className={s.btnIcon} icon="delete" />
                </Button>
              </Group>
            </Table.Cell>
          )}
          {formKey === `add` && (
            <Table.Cell>
              <Group className={sUtils.resetIndentation}>
                <Button className={sButton.btnTableAction} size="xs" onClick={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)} disabled={pristine || error || submitting}>
                  <Icon className={s.btnIcon} icon="checkmark" />
                </Button>
              </Group>
            </Table.Cell>
          )}
        </Table.Row>
      );
    }
  })
);

class Documents extends Component {
  componentWillMount() {
    const { propertyId } = this.props;
    if (propertyId !== `create`) this.props.actions.loadDocuments(propertyId);
  }

  render() {
    const { propertyId, state, isDocumentsUploadAllowed } = this.props;
    const items = state.documentsByPropertyId[propertyId] || [];
    return (
      <section>
        <Grid.Row>
          <Col xs="20">
            <Heading size="md">Другие документы</Heading>
          </Col>
        </Grid.Row>
        {/* <Grid.Row className={sUtils.pushedBottom1_5}>
          <Col xs="20">
            <Button>Загрузить документ</Button>
          </Col>
        </Grid.Row> */}
        <Grid.Row>
          <Col xs="20">
            <div className={sUtils.scrollX}>
              <Table.Container width="100%" className={sUtils.width120}>
                <Table.Row>
                  <Table.Heading width="20%">Тип документа</Table.Heading>
                  <Table.Heading width="18%">Загрузил</Table.Heading>
                  <Table.Heading width="22%">Дата загрузки</Table.Heading>
                  <Table.Heading width="15%">&nbsp;</Table.Heading>
                  <Table.Heading width="15%">&nbsp;</Table.Heading>
                  <Table.Heading width="10%">Действия</Table.Heading>
                </Table.Row>
                {isDocumentsUploadAllowed && <DocumentForm {...this.props} formKey="add" />}
                {items.map(item => (
                  <DocumentForm {...this.props} key={item.id} formKey={item.id} initialValues={item} />
                ))}
              </Table.Container>
            </div>
          </Col>
        </Grid.Row>
      </section>
    );
  }
}

const pickState = ({ documentsByPropertyId, auth }) => ({
  state: { documentsByPropertyId, auth },
});

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(DocumentActions, dispatch),
});

export default connect(pickState, mapDispatch)(Documents);
