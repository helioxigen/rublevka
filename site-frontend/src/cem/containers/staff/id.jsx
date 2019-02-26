import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserActions from 'cem/actions/users/id';
import { loadSubordinateUsers } from 'cem/actions/users/subordinateUsers';
import { loginAsUser } from 'cem/actions/auth';
import { pop } from 'cem/actions/toastr';
import { pushPath } from 'redux-simple-router';

import UI from 'cem/components/ui';
const { Loading, Grid } = UI;

import Header from 'cem/components/staff/id/header';
import Tabs from 'cem/components/staff/id/tabs';

class StaffIdContainer extends Component {
  componentWillMount() {
    if (this.props.params.id !== 'create') {
      this.props.actions.loadUser(this.props.params.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.id !== this.props.params.id) {
      this.props.actions.loadUser(newProps.params.id);
    }
  }

  render() {
    const {
      params: { id },
      state,
      hasRight,
    } = this.props;
    const { isFetching, isPhotoUploading, data, errors } =
      state.users[id] || {};

    const permissionsProps = {
      isUpdateAllowed: hasRight('staff_user_update'),
      isDocumentsUploadAllowed: hasRight('staff_user_documents'),
      isPhotoUploadAllowed: hasRight('staff_user_photo_upload'),
      isLoginAsUserAllowed: hasRight('sign_as_user'),
    };

    if (isFetching) {
      return <Loading />;
    }

    if (id === 'create' || (data && !errors)) {
      return (
        <section>
          <Header
            id={id}
            formKey={id}
            initialValues={data}
            data={data}
            isPhotoUploading={isPhotoUploading}
            {...this.props}
            {...permissionsProps}
          />
          <Tabs id={id} currentUserId={state.auth.id} />
          <Grid.Container fluid>
            {React.cloneElement(this.props.children, {
              ...this.props,
              id,
              initialValues: data,
              formKey: id,
              ...permissionsProps,
            })}
          </Grid.Container>
        </section>
      );
    }

    return null;
  }
}

const pickState = ({ auth, users }) => ({
  state: { auth, users },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(
    { ...UserActions, loadSubordinateUsers, loginAsUser, pop, pushPath },
    dispatch,
  ),
});

export default connect(
  pickState,
  mapDispatch,
)(StaffIdContainer);
