import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSIActions from 'cem/actions/csi';
import { pop } from 'cem/actions/toastr';

import Modal from 'cem/components/common/questions/modal';

class Questions extends Component {
  componentWillMount() {
    const { actions, kind } = this.props;

    actions.loadQuestions(kind);
  }

  render() {
    const { state, kind } = this.props;
    const { items = [] } = state.csi[kind].list;
    const initialValues = { questions: items.map(({ id, text }) => ({ questionId: id, text })) };
    const props = { ...this.props, initialValues };

    return <Modal {...props} />;
  }
}

const pickState = ({ csi }) => ({
  state: { csi },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ ...CSIActions, pop }, dispatch),
});

export default connect(pickState, mapDispatch)(Questions);
