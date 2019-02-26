import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import loadContact from 'cem/_contacts/actions/id/load';

// import { pushPath } from 'redux-simple-router';
// import { uploadFile, loadDocuments, createDocument, updateDocument, deleteDocument, loadLinkedContacts, addLinkedContact, updateLinkedContact, deleteLinkedContact, loadLeadsByContactId, loadDealsByContactId } from 'cem/actions/contacts';
// import * as _ContactsActions from 'cem/actions/_contacts';
// import loadLead from 'cem/actions/leads/id/load';
// import PropertiesActions from 'cem/actions/properties';
// import LeadSourceActions from 'cem/actions/settings/leadSources';
// const { loadLeadSource } = LeadSourceActions;
// import { loadUser } from 'cem/actions/users/id';
// import { pop } from 'cem/actions/toastr';

// constants

// UI
import UI from 'cem/components/ui';

// components
import Header from 'cem/_contacts/components/id/header';
import Tabs from 'cem/_contacts/components/id/tabs';
import ListErrorMessage from 'cem/components/common/listErrorMessage';

// styles

// helpers
import { isPkInParamsUpdated as isUpdated } from 'core/helpers/shouldLoad';

// UI
const {
  Loading,
  Heading,
  Grid: { Container },
} = UI;

// component
class Show extends Component {
  static propTypes = {
    state: PropTypes.shape({
      _contacts: PropTypes.object.isRequired,
    }),
    actions: PropTypes.shape({
      loadContact: PropTypes.func.isRequired,
    }),

    hasRight: PropTypes.func.isRequired,
    hasAllRights: PropTypes.func.isRequired,
    hasAnyRight: PropTypes.func.isRequired,
  };

  componentWillMount() {
    if (this.props.params.id !== `create`) {
      this.load(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isUpdated(`id`, this.props, nextProps)) {
      this.load(nextProps.params.id);
    }
  }

  load(id) {
    this.props.actions.loadContact(id);
  }

  render() {
    const { state, params, hasRight } = this.props;
    const { id } = params;
    const { data, isFetching, errors = [] } = state._contacts[id] || {};
    const { responsibleUsers = {} } = data || {};

    const permissionsProps = {
      isUpdateAllowed: hasRight(
        `contact_update`,
        responsibleUsers.ids,
        responsibleUsers.departmentIds,
        responsibleUsers.divisionIds,
      ),
      isSensitiveDataVisible: hasRight(
        `contact_sensitive_data`,
        responsibleUsers.ids,
        responsibleUsers.departmentIds,
        responsibleUsers.divisionIds,
      ),
      isPhotoUploadAllowed: hasRight(
        `contact_photo_upload`,
        responsibleUsers.ids,
        responsibleUsers.departmentIds,
        responsibleUsers.divisionIds,
      ),
      isLinkedContactsEditingAllowed: hasRight(
        `contact_links`,
        responsibleUsers.ids,
        responsibleUsers.departmentIds,
        responsibleUsers.divisionIds,
      ),
    };

    const hasErrors = !isFetching && !!errors.length;
    const hasData = !isFetching && data;
    const isCreate = id === `create`;

    const isArchived = hasData && data.state === `archive`;
    const isStatic = !permissionsProps.isUpdateAllowed || isArchived;

    const formProps = {
      id,
      data,
      initialValues: data,
      formKey: id.toString(),
      type: `contact`,
    };

    const childrenProps = {
      // ...this.props,
      ...permissionsProps,
      ...formProps,

      isCreate,
      isArchived,
      isStatic,
    };

    if (isFetching) {
      return <Loading />;
    }

    if (hasErrors) {
      return <ListErrorMessage errors={errors} />;
    }

    if (isCreate || hasData) {
      return (
        <section>
          <Header
            isCreate={isCreate}
            isArchived={isArchived}
            isStatic={isStatic}
            {...permissionsProps}
            {...formProps}
          />
          <Tabs id={id} />

          {React.cloneElement(this.props.children, childrenProps)}
        </section>
      );
    }

    // if (id === `create` || (data && !errors)) {
    //   return (
    //     <section>
    //       <Header {...this.props} formKey={id} initialValues={data} data={data} {...permissionsProps} />
    // <Container fluid>
    //   {React.cloneElement(this.props.children, { ...this.props, id, initialValues: data, formKey: id.toString(), type: `contact`, data, ...permissionsProps })}
    // </Container>
    // </section>
    //   );
    // }

    return (
      <Container fluid>
        <Heading size="lg">It's nothing, maybe it's error?</Heading>
      </Container>
    );
  }
}

// redux connectors
const pickState = state => {
  const { _contacts } = state;

  return {
    state: {
      _contacts,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    loadContact,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Show);
