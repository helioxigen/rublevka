import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ContactActions from 'cem/actions/properties/contacts';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';

import { contactFields } from 'cem/constants/properties/form';

import { validateContact } from 'cem/validators/properties';

import { fetchResource, fetchDictionary } from 'cem/helpers/autocomplete';

import ContactCreationModal from 'cem/containers/common/contactCreationModal';

import FormField from 'cem/helpers/formField';
import UI from 'cem/components/ui';
const {
  Table, Button, Icon, Heading,
  Form, AsyncSelect,
  Form: { Group },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const formSettings = {
  form: `propertyContact`,
  fields: contactFields,
  validate: validateContact,
};

const ContactForm = reduxForm(formSettings)(submitValidator()(
  class extends Component {
    update() {
      const { propertyId, propertyCategory, formKey, values, actions } = this.props;

      if (formKey !== `add`) return actions.updateLinkedContact(propertyId, formKey, values, propertyCategory);
    }

    unlink() {
      const { propertyId, propertyCategory, formKey, actions } = this.props;

      return actions.unlinkContact(propertyId, formKey, propertyCategory);
    }

    render() {
      const {
        formKey, fields, values, handleSubmit, pristine, error, submitting,
        isContactLinkingAllowed,
      } = this.props;

      return (
        <Table.Row>
          <Table.Cell>
            <FormField className={sUtils.resetIndentation} field={fields.linkedContactId}>
              <AsyncSelect className={sUtils.resetBorder} asyncOptions={fetchResource(`/v1/contacts`, `details.firstName`, [`details.lastName`, `details.firstName`])} {...fields.linkedContactId} disabled />
            </FormField>
          </Table.Cell>

          <Table.Cell>{values.phoneNumber}</Table.Cell>

          <Table.Cell>
            <Group className={sUtils.resetIndentation} kind={fields.kindId.touched && !!fields.kindId.error && `error`}>
              <AsyncSelect className={sUtils.resetBorder} asyncOptions={fetchDictionary(`property_contact_link_type`)} {...fields.kindId} valueKey="id" labelKey="title" disabled={!isContactLinkingAllowed} />
              {fields.kindId.touched && fields.kindId.error && <Form.Helper>{fields.kindId.error}</Form.Helper>}
            </Group>
          </Table.Cell>

          <Table.Cell>
            <Button className={sButton.btnTableAction} size="xs" onClick={handleSubmit(::this.update)} disabled={!isContactLinkingAllowed || pristine || error || submitting}>
              <Icon className={s.btnIcon} icon="checkmark" />
            </Button>
            {formKey !== `add` && (
              <Button className={sButton.btnTableAction} size="xs" onClick={handleSubmit(::this.unlink)} disabled={!isContactLinkingAllowed}>
                <Icon className={s.btnIcon} icon="delete" />
              </Button>
            )}
            {formKey !== `add` && (
              <Button to={`/contacts/${values.linkedContactId}`} className={sButton.btnTableAction} size="xs">
                <Icon className={s.btnIcon} icon="arrow-left" />
              </Button>
            )}
          </Table.Cell>
        </Table.Row>
      );
    }
  })
);

class Contacts extends Component {
  componentWillMount() {
    this.props.actions.loadLinkedContacts(this.props.params.id);
  }

  render() {
    const { params: { id, category }, state, isContactLinkingAllowed, actions } = this.props;
    const items = state[id] || [];

    return (
      <section className={sUtils.pushedBottom6}>
        <Row>
          <Col xs="20">
            <Heading size="md">
              Контакты
              {isContactLinkingAllowed && <ContactCreationModal propertyId={id} propertyCategory={category} />}
            </Heading>

            {!!items.length &&
              <div className={sUtils.scrollX}>
                <Table.Container width="100%" className={sUtils.width120}>
                  <Table.Row>
                    <Table.Heading width="30%">Контакт</Table.Heading>
                    <Table.Heading width="30%">Телефон</Table.Heading>
                    <Table.Heading width="30%">Роль</Table.Heading>
                    <Table.Heading width="10%">Действия</Table.Heading>
                  </Table.Row>

                  {items.map((item, index) => (
                    <ContactForm key={index} actions={actions} formKey={item.linkedContactId} initialValues={item} propertyId={id} propertyCategory={category} isContactLinkingAllowed={isContactLinkingAllowed} />
                  ))}
                </Table.Container>
              </div>
            }
          </Col>
        </Row>
      </section>
    );
  }
}

const pickState = ({ contactsByPropertyId, auth }) => ({
  state: { ...contactsByPropertyId, auth: { permissions: {}, ...auth } },
});

const pickActions = (dispatch) => ({
  actions: bindActionCreators(ContactActions, dispatch),
});

export default connect(pickState, pickActions)(Contacts);
