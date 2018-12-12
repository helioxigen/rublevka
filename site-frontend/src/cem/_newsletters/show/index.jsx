import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import load from 'cem/_newsletters/actions/load';

import { loadUser } from 'cem/actions/users/id/load';

import UI from 'cem/components/ui';
const { Grid: { Container } } = UI;

import Header from './header';
import About from './about';

class Id extends Component {
  componentWillMount() {
    const { params: { id } } = this.props;

    if (id !== 'create') {
      this.props.dispatch(load(id));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params: { id } } = this.props;
    const nextId = nextProps.params.id;

    if (!!nextId && id !== nextId && nextId !== 'create') {
      this.props.dispatch(load(nextId));
    }
  }

  render() {
    const { actions, state, params: { id }, hasRight } = this.props;
    const { data = {}, isPhotoUploading } = state.newsletters[id] || {};

    const permissionsProps = {
      isUpdateAllowed: hasRight('newsletter_update', data.responsibleUserId),
    };

    const isStatic = data.state === 'sent' || !permissionsProps.isUpdateAllowed;

    return (
      <section>
        <Header
          {...this.props}
          formKey={id.toString()}
          initialValues={data}
          isPhotoUploading={isPhotoUploading}
          data={data}
          isStatic={isStatic}
          {...permissionsProps}
        />
        <Container fluid>
          <About
            formKey={id.toString()}
            initialValues={data}
            data={data}
            state={state}
            actions={actions}
            {...permissionsProps}
          />
        </Container>
      </section>
    );
  }
}

const pickState = ({ auth, newsletters, users }) => ({
  state: { auth, newsletters, users },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ loadUser }, dispatch),
  dispatch,
});

export default connect(pickState, pickActions)(Id);
