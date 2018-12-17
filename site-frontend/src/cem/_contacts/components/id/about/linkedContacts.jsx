import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';

import * as ContactActions from 'cem/_contacts/old_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDictionary, fetchResource } from 'cem/helpers/autocomplete';

import UI from 'cem/components/ui';
const {
  Grid,
  Table,
  Button,
  Icon,
  AsyncSelect,
  Form: { Group, Helper },
  Table: { Cell, Row, Heading },
  Grid: { Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const validate = (values) => {
  const errors = {};

  if (!values.linkedContactId) errors.linkedContactId = 'Укажите контакт';
  if (!values.kindId) errors.kindId = 'Укажите тип';

  return errors;
};

class LinkedContactFormRaw extends Component {
  onSubmitSuccess() {
    if (this.props.formKey === 'add') this.props.resetForm();
  }

  createOrUpdate(values) {
    const { formKey, contactId, actions } = this.props;

    if (formKey === 'add') {
      return actions.addLinkedContact(contactId, values);
    }
    return actions.updateLinkedContact(contactId, values);
  }

  remove() {
    const { formKey, contactId, actions } = this.props;

    return actions.deleteLinkedContact(contactId, formKey);
  }

  render() {
    const { fields, formKey, handleSubmit, values, pristine } = this.props;

    return (
      <div>
        <Row className={sUtils.pushedBottom6}>
          <Col xs="20">
            <Heading size="md">Связанные контакты</Heading>

            <Row>
              <Cell>
                {formKey === 'add' && (
                  <Group
                    className={sUtils.resetIndentation}
                    kind={
                      fields.linkedContactId.touched && !!fields.linkedContactId.error && 'error'
                    }
                  >
                    <AsyncSelect
                      className={sUtils.resetBorder}
                      {...fields.linkedContactId}
                      asyncOptions={fetchResource('/v1/contacts', 'lastName', [
                        'details.firstName',
                        'details.lastName',
                      ])}
                    />
                    {fields.linkedContactId.touched && fields.linkedContactId.error && (
                      <Helper>{fields.linkedContactId.error}</Helper>
                    )}
                  </Group>
                )}
                {formKey !== 'add' && <span>{values.contactTitle}</span>}
              </Cell>
              <Cell>
                <Grid.Row>
                  <Col xs="16">
                    <Group
                      className={sUtils.resetIndentation}
                      kind={fields.kindId.touched && !!fields.kindId.error && 'error'}
                    >
                      <AsyncSelect
                        className={sUtils.resetBorder}
                        {...fields.kindId}
                        asyncOptions={fetchDictionary('contact_link_type')}
                        labelKey="title"
                        valueKey="id"
                        onBlur={() => {}}
                      />
                      {fields.kindId.touched && fields.kindId.error && (
                        <Helper>{fields.kindId.error}</Helper>
                      )}
                    </Group>
                  </Col>
                </Grid.Row>
              </Cell>
              <Cell>
                <Grid.Row>
                  <Col xs="16">
                    <Group
                      className={sUtils.resetIndentation}
                      kind={
                        fields.relationshipToKindId.touched &&
                        !!fields.relationshipToKindId.error &&
                        'error'
                      }
                    >
                      <AsyncSelect
                        className={sUtils.resetBorder}
                        {...fields.relationshipToKindId}
                        asyncOptions={fetchDictionary('contact_link_type')}
                        labelKey="title"
                        valueKey="id"
                        onBlur={() => {}}
                      />
                      {fields.relationshipToKindId.touched && fields.relationshipToKindId.error && (
                        <Helper>{fields.relationshipToKindId.error}</Helper>
                      )}
                    </Group>
                  </Col>
                </Grid.Row>
              </Cell>
              {formKey !== 'add' && (
                <Cell>
                  <Group className={sUtils.resetIndentation}>
                    <Button
                      className={sButton.btnTableAction}
                      size="xs"
                      onClick={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)}
                      disabled={pristine}
                    >
                      <Icon className={s.btnIcon} icon="checkmark" />
                    </Button>
                    <Button
                      className={sButton.btnTableAction}
                      kind="danger"
                      size="xs"
                      onClick={handleSubmit(::this.remove)}
                    >
                      <Icon className={s.btnIcon} icon="delete" />
                    </Button>
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
                      disabled={pristine}
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
}

const formFields = [
  'linkedContactId',
  'kindId',
  'relationshipToKindId',
  'contactTitle',
  'kindTitle',
];

const formSettings = {
  form: 'linkedContact',
  fields: formFields,
  validate,
};

const LinkedContactForm = reduxForm(formSettings)(submitValidator()(LinkedContactFormRaw));

class LinkedContacts extends Component {
  componentWillMount() {
    this.props.actions.loadLinkedContacts(this.props.contactId);
  }

  render() {
    const { items = [] } = this.props.state.linkedContacts;

    return (
      <div className={sUtils.scrollX}>
        <Table.Container width="100%" className={sUtils.width120}>
          <Row>
            <Heading width="25%">Контакт</Heading>
            <Heading width="30%">Кем приходится (этому контакту)</Heading>
            <Heading width="35%">Кем приходится (этот контакт)</Heading>
            <Heading width="10%">Действия</Heading>
          </Row>
          <LinkedContactForm
            contactId={this.props.contactId}
            formKey="add"
            actions={this.props.actions}
          />

          {items.map(item => (
            <LinkedContactForm
              key={item.linkedContactId}
              contactId={this.props.contactId}
              formKey={item.linkedContactId.toString()}
              initialValues={item}
              actions={this.props.actions}
            />
          ))}
        </Table.Container>
      </div>
    );
  }
}

const pickState = ({ contacts: { linkedContacts = {} } }) => ({
  state: { linkedContacts },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(ContactActions, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(LinkedContacts);
