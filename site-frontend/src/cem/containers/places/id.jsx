import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlacesActions from 'cem/actions/places';

import { pop } from 'cem/actions/toastr';
import { pushPath } from 'redux-simple-router';

import { kinds } from 'cem/constants/places/dictionaries';

import Header from 'cem/components/places/id/header';
import About from 'cem/components/places/id/about';

import UI from 'cem/components/ui';
const {
  Grid: { Container },
} = UI;

class IdContainer extends Component {
  componentWillMount() {
    const {
      params: { id, kind },
    } = this.props;

    if (id !== 'create') this.load(kind, id);
  }

  load(kind, id) {
    const { actions } = this.props;

    actions.loadPlace(kind, id);
  }

  render() {
    const {
      state,
      params: { id, kind },
      hasRight,
    } = this.props;
    const { data } = state.places[id] || {};
    const { permissionName } = kinds[kind];

    const permissionsProps = {
      isUpdateAllowed: hasRight(`${permissionName}_update`),
    };

    return (
      <section>
        <Header
          {...this.props}
          formKey={id}
          initialValues={{ ...data, kind }}
          data={data}
          kind={kind}
          {...permissionsProps}
        />
        <Container fluid>
          <About
            {...this.props}
            formKey={id}
            initialValues={{ ...data, kind }}
            data={data}
            kind={kind}
            {...permissionsProps}
          />
        </Container>
      </section>
    );
  }
}

const pickState = ({ places }) => ({
  state: { places },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ ...PlacesActions, pop, pushPath }, dispatch),
});

export default connect(
  pickState,
  mapDispatch,
)(IdContainer);
