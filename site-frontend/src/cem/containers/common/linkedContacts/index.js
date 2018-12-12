import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import linkedContactActions from 'cem/actions/linked_contacts';
import { pop } from 'cem/actions/toastr';
import Table from 'cem/components/common/linkedContacts';

class LinkedContacts extends Component {
  componentWillMount() {
    this.load();
  }

  load(resetState = true) {
    const { resource, resourceId } = this.props;

    this.props.actions.loadLinkedContacts(resource, resourceId, resetState);
  }

  create(contact) {
    const { resource, resourceId } = this.props;

    return this.props.actions.createLinkedContact(resource, resourceId, contact)
      .then(() => {
        this.props.actions.pop(`success`, null, `Контакт успешно привязан`);
        return this.load(false);
      });
  }

  update(contactId, contact) {
    const { resource, resourceId } = this.props;

    return this.props.actions.updateLinkedContact(resource, resourceId, contactId, contact)
    .then(({ id }) => {
      this.props.actions.pop(`success`, `Контакт: (ID: ${id})`, `Успешно обновлён`);
      return this.load(false);
    });
  }

  delete(contactId) {
    const { resource, resourceId } = this.props;

    return this.props.actions.deleteLinkedContact(resource, resourceId, contactId)
    .then(({ id }) => {
      this.props.actions.pop(`success`, `Контакт: (ID: ${id})`, `Успешно отвязан`);
      return this.load(false);
    });
  }

  getItemsFromState() {
    const { resource, resourceId } = this.props;
    const resourceCollection = this.props.state[resource] || {};
    const item = resourceCollection[resourceId] || {};
    const linkedContacts = item.linkedContacts || { ids: [] };

    return linkedContacts.ids && linkedContacts.ids.map(id => linkedContacts[id]) || [];
  }

  render() {
    const { resource, resourceId } = this.props;
    const items = this.getItemsFromState();
    const actions = { create: ::this.create, update: ::this.update, delete: ::this.delete };

    return <Table items={items} actions={actions} resource={resource} resourceId={resourceId} />;
  }
}

const pickState = (state) => state;
const mapDispatch = (dispatch) => ({
  actions: bindActionCreators({ ...linkedContactActions, pop }, dispatch),
});

export default connect(pickState, mapDispatch)(LinkedContacts);
