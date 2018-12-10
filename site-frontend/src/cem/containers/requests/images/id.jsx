import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sendAnalytics from 'core/actions/analytics';
import ImageRequestActions from 'cem/actions/requests/images';
import { pushPath } from 'redux-simple-router';
import { pop } from 'cem/actions/toastr';
import { REQUESTS_IMAGES_BY_KIND_OPENED } from 'cem/constants/analytics';

import UI from 'cem/components/ui';
const { Grid: { Container } } = UI;

import Header from 'cem/components/requests/images/id/header';
import About from 'cem/components/requests/images/id/about';

class IdContainer extends Component {
  componentWillMount() {
    const { actions, params: { id } } = this.props;
    const { kind, propertyId, propertyCategory } = this.props.location.query;

    if (id !== 'create') actions.loadImageRequest(id);
    if (id === 'create') {
      const eventName = REQUESTS_IMAGES_BY_KIND_OPENED(kind);

      actions.sendAnalytics(eventName, {
        propertyId,
        propertyCategory,
      });
    }
  }

  render() {
    const { params: { id }, state, hasRight } = this.props;
    const { data = {}, isUploading } = state.imagesRequests[id] || {};

    const category = data.propertyCategory || {};

    const permissionsProps = {
      isUpdateAllowed: hasRight('images_order_city_update', data.responsibleUserId || data.createdByUserId) || hasRight('images_order_country_update', data.responsibleUserId || data.createdByUserId),
      isAnswersPreviewAllowed: hasRight('images_order_city_answers', data.responsibleUserId || data.createdByUserId) || hasRight('images_order_country_answers', data.responsibleUserId || data.createdByUserId),
      isCommentingAllowed: hasRight('images_order_city_comments', data.responsibleUserId || data.createdByUserId) || hasRight('images_order_country_comments', data.responsibleUserId || data.createdByUserId),
      isImageUploadAllowed: hasRight('images_order_city_image_upload', data.responsibleUserId || data.createdByUserId) || hasRight('images_order_country_image_upload', data.responsibleUserId || data.createdByUserId),
      isCurrentUserSupervisor: hasRight('hub_supervisor_city') || hasRight('hub_supervisor_country'),
      isCurrentUserCreator: state.auth.id === data.createdByUserId,
      isCurrentUserResponsible: state.auth.id === data.responsibleUserId,
    };

    return data || id === 'create' ? (
      <section>
        <Header {...this.props} formKey={id} initialValues={data} data={data} {...permissionsProps} />
        <Container fluid>
          <About {...this.props} formKey={id} data={data} isUploading={isUploading} {...permissionsProps} />
        </Container>
      </section>
    ) : <div />;
  }
}

const pickState = ({ auth, comments, imagesRequests, users }) => ({
  state: { auth, comments, imagesRequests, users },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...ImageRequestActions, sendAnalytics, pushPath, pop }, dispatch),
});

export default connect(pickState, pickActions)(IdContainer);
