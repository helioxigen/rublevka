import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ComplexesActions from 'cem/actions/complexes';
import { loadUser } from 'cem/actions/users/id/load';
import { pop } from 'cem/actions/toastr';

import UI from 'cem/components/ui';
const {
  Grid: { Container },
} = UI;

import Header from 'cem/components/complexes/id/header';
import Tabs from 'cem/components/complexes/id/tabs';

class Id extends Component {
  componentWillMount() {
    const { params: { id } } = this.props;

    if (id !== `create`) ::this.load(id);
  }

  componentWillReceiveProps(nextProps) {
    const id = this.props.params.id;
    const nextId = nextProps.params.id;

    if (!!nextId && (id !== nextId) && (nextId !== `create`)) ::this.load(nextId);
  }

  load(id) {
    this.props.actions.loadComplex(id);
  }

  render() {
    const { state, params: { id }, hasRight } = this.props;
    const { data = {} } = state.complexes[id] || {};

    const permissionsProps = {
      isUpdateAllowed: hasRight(`complex_update`, data.responsibleUser && data.responsibleUser.id, data.responsibleUser && data.responsibleUser.departmentId, data.responsibleUser && data.responsibleUser.divisionId),
      isBuildingCreationAllowed: hasRight(`complex_building_create`, data.responsibleUser && data.responsibleUser.id, data.responsibleUser && data.responsibleUser.departmentId, data.responsibleUser && data.responsibleUser.divisionId),
      isImageUploadAllowed: hasRight(`complex_image_upload`, data.responsibleUser && data.responsibleUser.id, data.responsibleUser && data.responsibleUser.departmentId, data.responsibleUser && data.responsibleUser.divisionId),
    };

    return (
      <section>
        <Header {...this.props} formKey={id} initialValues={data} data={data} {...permissionsProps} />
        <Tabs id={id} />
        <Container fluid>
          {React.cloneElement(this.props.children, { ...this.props, formKey: id.toString(), initialValues: data, data, ...permissionsProps })}
        </Container>
      </section>
    );
  }
}

const pickState = ({ auth, complexes, users }) => ({
  state: { auth, complexes, users },
});

const pickActions = (dispatch) => ({
  actions: bindActionCreators({ ...ComplexesActions, loadUser, pop }, dispatch),
});

export default connect(pickState, pickActions)(Id);
