import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ExportPackagesActions from 'cem/actions/settings/exportPackages';
import * as PropertiesActions from 'cem/actions/_properties';
import { pushPath } from 'redux-simple-router';
import { pop } from 'cem/actions/toastr';

import Tabs from 'cem/components/common/tabs';

import UI from 'cem/components/ui';
const {
  Grid: { Container },
} = UI;

import Header from 'cem/components/settings/exportPackages/id/header';
import About from 'cem/components/settings/exportPackages/id/about';
import ErrorLogs from 'cem/components/settings/exportPackages/id/errorLogs';

import { prepareInitialValues } from 'cem/helpers/exportPackages';

import tabs from 'cem/constants/settings/exportPackages/tabs';

class IdContainer extends Component {
  componentWillMount() {
    const { actions, params: { id } } = this.props;

    if (id !== 'create') {
      actions.loadPackage(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { actions, params: { id } } = this.props;

    if (id !== nextProps.params.id) {
      actions.loadPackage(nextProps.params.id);
    }
  }

  render() {
    const { state, actions, params: { id, tab }, hasRight } = this.props;
    const { data = { filter: {} }, data: { createdByUserId } = {}, errors = [], isFetching, errorLogs = {} } = state.exportPackages[id] || {};

    if (!isFetching && !!errors.length) {
      return errors[0].message;
    }

    const permissionsProps = {
      isUpdateAllowed: hasRight('export_update', createdByUserId), // createdByUser.id, createdByUser.departmentId, createdByUser.divisionId),
      isDeleteAllowed: hasRight('export_destroy', createdByUserId), // createdByUser.id, createdByUser.departmentId, createdByUser.divisionId),
    };

    const commonProps = {
      actions,
      data,
      formKey: id.toString(),
      initialValues: prepareInitialValues(data),
      ...permissionsProps,
    };

    return (
      <section>
        <Header {...commonProps} />
        <Tabs options={tabs(id)} />
        <Container fluid>
          {tab === 'about' && <About {...commonProps} isFetching={isFetching} state={state} />}
          {tab === 'logs' && <ErrorLogs id={id} category={data.filter['filter[category]']} actions={actions} data={errorLogs} state={state} />}
        </Container>
      </section>
    );
  }
}

const pickState = ({ auth, exportPackages, _properties, pagination, filters }) => ({
  state: { auth, exportPackages, _properties, pagination, filters },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...ExportPackagesActions, pop, pushPath, ...PropertiesActions }, dispatch),
});

export default connect(pickState, pickActions)(IdContainer);
