import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ComplexBuildingsActions from 'cem/actions/complexBuildings';
import loadComplex from 'cem/actions/complexes/id/load';
import { loadUser } from 'cem/actions/users/id/load';
import { pop } from 'cem/actions/toastr';
import { pushPath } from 'redux-simple-router';

import UI from 'cem/components/ui';
const {
  Grid: { Container },
} = UI;

import Header from 'cem/components/complexBuildings/id/header';
import Tabs from 'cem/components/complexBuildings/id/tabs';

class Id extends Component {
  componentWillMount() {
    const { actions, params: { buildingId: id }, location: { query: { complexId } } } = this.props;

    if (id === 'create') actions.loadComplex(complexId);
    if (id !== 'create') actions.loadComplexBuilding(id);
  }

  render() {
    const { state, actions, params: { buildingId: id }, hasRight, location: { query }, children } = this.props;
    const { data = {} } = state.complexBuildings[id] || {};

    const complexId = id === 'create' ? query.complexId : data.complexId;

    const { data: complexData = {} } = state.complexes[complexId] || {};

    const initialValues = { ...data, location: id === 'create' ? complexData.location : data.location };

    const permissionsProps = {
      isUpdateAllowed: hasRight('complex_building_update', data.responsibleUser && data.responsibleUser.id, data.responsibleUser && data.responsibleUser.departmentId, data.responsibleUser && data.responsibleUser.divisionId),
      isImageUploadAllowed: hasRight('complex_building_image_upload', data.responsibleUser && data.responsibleUser.id, data.responsibleUser && data.responsibleUser.departmentId, data.responsibleUser && data.responsibleUser.divisionId),
      isDocumentsPreviewAndUpdateAllowed: hasRight('complex_building_documents', data.responsibleUser && data.responsibleUser.id, data.responsibleUser && data.responsibleUser.departmentId, data.responsibleUser && data.responsibleUser.divisionId),
    };

    return (
      <section>
        <Header {...{ complexId, actions, formKey: id, initialValues, data }} {...permissionsProps} />
        <Tabs id={id} {...permissionsProps} />
        <Container fluid>
          {React.cloneElement(children, { ...this.props, complexId, formKey: id, initialValues, data, ...permissionsProps })}
        </Container>
      </section>
    );
  }
}

const pickState = ({ auth, complexBuildings, documentsByComplexBuildingId, users, complexes }) => ({
  state: { auth, complexBuildings, documentsByComplexBuildingId, users, complexes },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...ComplexBuildingsActions, loadUser, pop, pushPath, loadComplex }, dispatch),
});

export default connect(pickState, pickActions)(Id);
