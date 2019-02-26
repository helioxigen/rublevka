import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as SelectionsActions from 'core/actions/selections';

import { loadUser } from 'cem/actions/users/id/load';
import { pushPath } from 'redux-simple-router';
import { pop } from 'cem/actions/toastr';

import UI from 'cem/components/ui';
const {
  Grid: { Container },
} = UI;

import Header from 'cem/components/selections/id/header';

class Id extends Component {
  componentWillMount() {
    const {
      actions,
      params: { id },
    } = this.props;

    if (id !== 'create') {
      actions.loadSelection(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      actions,
      params: { id },
    } = this.props;
    const nextId = nextProps.params.id;

    if (!!nextId && id !== nextId && nextId !== 'create') {
      actions.loadSelection(nextId);
    }
  }

  render() {
    const {
      actions,
      state,
      children,
      params: { id },
      hasRight,
    } = this.props;
    const { data = {}, isPhotoUploading } = state.selections[id] || {};

    const permissionsProps = {
      isUpdateAllowed: hasRight('selection_update', data.responsibleUserId),
    };

    const initialValues = {
      ...data,
      propertyCategory: data.propertyCategory || 'city',
    };

    return (
      <section>
        <Header
          {...this.props}
          formKey={id.toString()}
          initialValues={initialValues}
          isPhotoUploading={isPhotoUploading}
          data={data}
          {...permissionsProps}
        />
        <Container fluid>
          {React.cloneElement(children, {
            ...this.props,
            formKey: id.toString(),
            initialValues,
            data,
            state,
            actions,
            ...permissionsProps,
          })}
        </Container>
      </section>
    );
  }
}

const pickState = ({ auth, selections, users }) => ({
  state: { auth, selections, users },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(
    { ...SelectionsActions, loadUser, pushPath, pop },
    dispatch,
  ),
});

export default connect(
  pickState,
  pickActions,
)(Id);
