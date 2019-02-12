import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LinkedContactsActions from 'cem/actions/companies/linkedContacts';
import { pop } from 'cem/actions/toastr';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Row, Col },
} = UI;

import LinkedContactsTable from 'cem/components/companies/id/linkedContacts/table';
import ContactCreationModal from 'cem/components/companies/id/linkedContacts/modal';

import sUtils from 'cem/styles/utils';

class LinkedContactsContainer extends Component {
  componentWillMount() {
    const { companyId, actions } = this.props;

    if (companyId) {
      actions.loadLinkedContacts(companyId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { companyId, actions } = this.props;

    if (nextProps.companyId !== companyId) {
      actions.loadLinkedContacts(nextProps.companyId);
    }
  }

  render() {
    const { companyId, state, actions, isUpdateAllowed } = this.props;
    const { items = {} } = state.contactsByCompanyId[companyId] || {};
    const itemsArray = Object.keys(items).map(key => items[key]);

    return (
      <section className={sUtils.pushedBottom6}>
        <Row>
          <Col xs="20">
            <Heading size="md">
              Контакты
              {isUpdateAllowed && (
                <ContactCreationModal companyId={companyId} actions={actions} />
              )}
            </Heading>

            {!!itemsArray.length && (
              <div className={sUtils.scrollX}>
                <LinkedContactsTable {...this.props} items={itemsArray} />
              </div>
            )}

            {!itemsArray.length && (
              <Heading notFound>Нет связанных контактов</Heading>
            )}
          </Col>
        </Row>
      </section>
    );
  }
}

const pickState = ({ auth, contactsByCompanyId }) => ({
  state: { auth, contactsByCompanyId },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...LinkedContactsActions, pop }, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(LinkedContactsContainer);
