import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PROPERTY_OPENED } from 'cem/constants/analytics';

import sendAnalytics from 'core/actions/analytics';
import PropertyActions from 'cem/actions/properties';
import TaskActions from 'cem/actions/tasks';
import loadLead from 'cem/actions/leads/id/load';
import loadSettlement from 'cem/actions/settlements/id/load';
import { loadUser } from 'cem/actions/users/id';
import { pop } from 'cem/actions/toastr';
import { pushPath } from 'redux-simple-router';
import LeadSourceActions from 'cem/actions/settings/leadSources';

import Header from 'cem/components/properties/id/header';
import Tabs from 'cem/components/properties/id/tabs';

import { fields } from 'cem/constants/properties/form';

import UI from 'cem/components/ui';
const { Grid: { Container } } = UI;

class Id extends Component {
  componentWillMount() {
    const { params: { id }, actions } = this.props;

    if (id !== 'create') {
      actions.loadProperty(id).then(({ category, data }) => {
        actions.sendAnalytics(PROPERTY_OPENED, {
          id,
          category,
          isResale: data.saleOffer.isResale,
        });
      });
    }
  }

  render() {
    const { params: { id, category }, state, hasRight } = this.props;

    const { data = { images: [], layoutImages: [], location: {} } } = state.properties[id] || {};

    const responsibleUser = (state.properties[id] &&
      state.properties[id].data &&
      state.properties[id].data.responsibleUser) || {};

    const taskProps = {
      pk: 'propertyId',
      id,
      group: 'byPropertyId',
      taskCreationParams: {
        propertyId: data.id,
        propertyCategory: category,
      },
      isTaskCreationAllowed: hasRight('task_create') && data.state !== 'deleted',
    };

    const permissionsProps = {
      isUpdateAllowed: (!data.saleOffer || data.saleOffer.isResale === 'true'
        ? hasRight(
            `${category}_property_update`,
            responsibleUser.id,
            responsibleUser.departmentId,
            responsibleUser.divisionId,
          )
        : hasRight(
            `${category}_property_initial_update`,
            responsibleUser.id,
            responsibleUser.departmentId,
            responsibleUser.divisionId,
          )) && data.state !== 'deleted',
      isImageUploadAllowed: hasRight(
        `${category}_property_image_upload`,
        responsibleUser.id,
        responsibleUser.departmentId,
        responsibleUser.divisionId,
      ) && data.state !== 'deleted',
      isContactLinkingAllowed: hasRight(
        `${category}_property_contact_links`,
        responsibleUser.id,
        responsibleUser.departmentId,
        responsibleUser.divisionId,
      ) && data.state !== 'deleted',
      isDocumentsUploadAllowed: hasRight(
        `${category}_property_documents`,
        responsibleUser.id,
        responsibleUser.departmentId,
        responsibleUser.divisionId,
      ) && data.state !== 'deleted',
      isSensitiveDataVisible: hasRight(
        `${category}_property_sensitive_data`,
        responsibleUser.id,
        responsibleUser.departmentId,
        responsibleUser.divisionId,
      ),
      isHistoryVisible: hasRight('event_show'),
      isPhotoSessionAllowed: data.state !== 'deleted' &&
        (state.auth.details.isManager || state.auth.id === responsibleUser.id),
      isImagesOrderingAllowed: hasRight(`images_order_${category}_create`) &&
        data.state !== 'deleted',
      isPropertyRemovalOrderingAllowed: hasRight('property_removal_order_create') &&
        data.state !== 'deleted',
      isPropertyExportWithoutLogoAllowed: hasRight('property_export_without_logo') &&
        data.state !== 'deleted',
    };

    const HeaderComponent = Header[category];

    return (
      <section>
        <HeaderComponent
          {...this.props}
          data={data}
          formKey={id}
          initialValues={data}
          fields={fields[category]}
          responsibleUserId={responsibleUser.id}
          {...permissionsProps}
        />
        <Tabs
          id={id}
          category={category}
          responsibleUserId={responsibleUser.id}
          {...permissionsProps}
        />
        <Container fluid>
          {data &&
            React.cloneElement(this.props.children, {
              ...this.props,
              currentUserId: state.auth.id,
              responsibleUserId: responsibleUser.id,
              formKey: id.toString(),
              initialValues: data,
              fields: fields[category],
              data,
              category,
              ...taskProps,
              ...permissionsProps,
              group: `byPropertyId.${id}`,
              propertyCardHidden: true,
            })}
        </Container>
      </section>
    );
  }
}

const pickState = ({
  auth,
  properties,
  users,
  leads,
  residentialComplexes,
  tasksByPropertyId,
  bannersByPropertyId,
  settlements,
  leadsByPropertyId,
  leadSources,
  propertiesEvents,
  pagination,
}) => ({
  state: {
    auth,
    properties,
    users,
    leads,
    residentialComplexes,
    tasksByPropertyId,
    settlements,
    leadsByPropertyId,
    bannersByPropertyId,
    leadSources,
    propertiesEvents,
    pagination,
  },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(
    {
      ...PropertyActions,
      sendAnalytics,
      loadUser,
      loadLead,
      pop,
      pushPath,
      changeStatus: TaskActions.changeStatus,
      loadSettlement,
      loadLeadSource: LeadSourceActions.loadLeadSource,
    },
    dispatch,
  ),
});

export default connect(pickState, pickActions)(Id);
