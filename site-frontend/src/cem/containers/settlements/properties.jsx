import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SettlementsActions from 'cem/actions/settlements';
import { pop } from 'cem/actions/toastr';

import UI from 'cem/components/ui';
const {
  Grid: { Row, Col },
} = UI;

import PrimaryPropertiesForm from 'cem/components/settlements/id/properties/primary/form';

import s from 'cem/styles/id/content';

class Properties extends Component {
  render() {
    const {
      actions,
      formKey,
      state,
      params: { id },
      isUpdateAllowed,
    } = this.props;

    const { items = [], isFetching } = state.primaryProperties[id] || {};
    const { data = {} } = state.settlements[id] || {};

    return (
      <Row>
        <Col className={s.section}>
          <PrimaryPropertiesForm
            isUpdateAllowed={isUpdateAllowed}
            actions={actions}
            id={id}
            formKey={formKey}
            settlementData={data}
            initialValues={data.propertyDefaults || {}}
            items={items}
            isFetching={isFetching}
          />
        </Col>
      </Row>
    );
  }
}

const pickState = ({ auth, propertiesBySettlementId, settlements }) => ({
  state: {
    auth,
    primaryProperties: propertiesBySettlementId.primary,
    settlements,
  },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...SettlementsActions, pop }, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(Properties);
