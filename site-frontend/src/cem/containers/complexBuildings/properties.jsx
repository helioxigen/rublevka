import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ComplexBuildingsActions from 'cem/actions/complexBuildings';
import { pop } from 'cem/actions/toastr';

import UI from 'cem/components/ui';
const {
  Grid: { Row, Col },
} = UI;

import PrimaryPropertiesForm from 'cem/components/complexBuildings/id/properties/primary/form';

import s from 'cem/styles/id/content';

class Properties extends Component {
  render() {
    const { actions, formKey, state, params: { buildingId: id }, isUpdateAllowed } = this.props;

    const { items = [], isFetching } = state.primaryProperties[id] || {};
    const { data = {} } = state.complexBuildings[id] || {};

    return (
      <Row>
        <Col className={s.section}>
          <PrimaryPropertiesForm isUpdateAllowed={isUpdateAllowed} actions={actions} id={id} formKey={formKey} complexBuildingData={data} initialValues={data.propertyDefaults || {}} items={items} isFetching={isFetching} />
        </Col>
      </Row>
    );
  }
}

const pickState = ({ auth, propertiesByComplexBuildingId, complexBuildings }) => ({
  state: { auth, primaryProperties: propertiesByComplexBuildingId.primary, complexBuildings },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...ComplexBuildingsActions, pop }, dispatch),
});

export default connect(pickState, pickActions)(Properties);
