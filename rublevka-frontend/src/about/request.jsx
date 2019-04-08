import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import loadCurrentBroker from 'actions/currentBroker';
import requestLead from 'actions/requestLead';
import { setSharedRetargetingKey } from 'actions/retargeting';

import RequestForm from './requestForm';

class RequestFormContainer extends Component {
  componentWillMount() {
    this.props.actions.loadCurrentBroker('country');
  }

  render() {
    const { state } = this.props;

    return <RequestForm {...this.props} currentBroker={state.currentBroker} />;
  }
}

const pickState = ({ currentBroker }) => ({
  state: { currentBroker },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(
    { loadCurrentBroker, requestLead, setSharedRetargetingKey },
    dispatch,
  ),
});

export default connect(
  pickState,
  pickActions,
)(RequestFormContainer);
