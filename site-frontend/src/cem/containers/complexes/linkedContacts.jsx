import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LinkedContactsActions from 'cem/actions/complexes/id/linkedContacts';
import updateComplex from 'cem/actions/complexes/id/update';
import { pop } from 'cem/actions/toastr';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Row, Col },
} = UI;

import LinkedContactsTable from 'cem/components/complexes/id/about/linkedContacts/table';
import ContactCreationModal from 'cem/components/complexes/id/about/linkedContacts/modal';

import sUtils from 'cem/styles/utils';

import isEqual from 'lodash/isEqual';

class LinkedContactsContainer extends Component {
  componentWillMount() {
    const { complexData, actions } = this.props;

    if (
      complexData.id &&
      complexData.linkedContactIds &&
      !!complexData.linkedContactIds.length
    ) {
      actions.loadLinkedContacts(complexData.id, complexData.linkedContactIds);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { complexData, actions } = this.props;

    if (
      !isEqual(
        complexData.linkedContactIds,
        nextProps.complexData.linkedContactIds,
      )
    ) {
      if (!nextProps.complexData.linkedContactIds.length) {
        actions.resetLinkedContacts(nextProps.complexData.id);
      } else {
        actions.loadLinkedContacts(
          nextProps.complexData.id,
          nextProps.complexData.linkedContactIds,
        );
      }
    }
  }

  render() {
    const { complexData, state, actions, isUpdateAllowed } = this.props;
    const { items = {} } = state.contactsByComplexId[complexData.id] || {};
    const itemsArray = Object.keys(items).map(key => items[key]);

    return (
      <section className={sUtils.pushedBottom6}>
        <Row>
          <Col xs="20">
            <Heading size="md">
              Контакты
              {isUpdateAllowed && (
                <ContactCreationModal {...{ complexData, actions }} />
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

const pickState = ({ auth, contactsByComplexId }) => ({
  state: { auth, contactsByComplexId },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(
    { ...LinkedContactsActions, pop, updateComplex },
    dispatch,
  ),
});

export default connect(
  pickState,
  pickActions,
)(LinkedContactsContainer);
