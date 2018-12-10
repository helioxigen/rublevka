import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SettlementActions from 'cem/actions/settlements';
import DictionaryActions from 'cem/actions/settings/dictionaries/id';
import { pop } from 'cem/actions/toastr';
import { loadUser } from 'cem/actions/users/id/load';

import Header from 'cem/components/settlements/id/header';
import Tabs from 'cem/components/settlements/id/tabs';

import UI from 'cem/components/ui';
const { Grid } = UI;

class IdContainer extends Component {
  componentWillMount() {
    const { id } = this.props.params;
    if (id !== 'create') this.props.actions.loadSettlement(id);
  }

  render() {
    const { state, params: { id }, hasRight } = this.props;
    const { data = {} } = state.settlements[id] || {};

    const permissionsProps = {
      isUpdateAllowed: hasRight('settlement_update', data.responsibleUser && data.responsibleUser.id),
    };

    return (
      <section>
        <Header {...this.props} formKey={id} initialValues={data} />
        <Tabs {...this.props} id={id} />
        <Grid.Container fluid>
          {React.cloneElement(this.props.children, { ...this.props, formKey: id, initialValues: data, data, ...permissionsProps })}
        </Grid.Container>
      </section>
    );
  }
}

const pickState = ({ auth, settlements, documentsBySettlementId, users, dictionaries }) => ({
  state: { auth, settlements, documentsBySettlementId, users, dictionaries },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...SettlementActions, ...DictionaryActions, loadUser, pop }, dispatch),
});

export default connect(pickState, pickActions)(IdContainer);
