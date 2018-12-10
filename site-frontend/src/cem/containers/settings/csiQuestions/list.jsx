import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSIActions from 'cem/actions/csi';

import List from 'cem/components/settings/csiQuestions/list.jsx';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

class Questions extends Component {
  componentWillMount() {
    this.props.actions.loadQuestions('all');
  }

  render() {
    const { state, hasRight } = this.props;
    const { items = [] } = state.csi.all.list || {};

    const permissionsProps = {
      isCreateAllowed: hasRight('csi_question_create'),
      isUpdateAllowed: hasRight('csi_question_update'),
    };

    return (
      <section className={s.section} >
        <Container fluid>
          <Row>
            <Col xs="20">
              <Heading size="md">CSI-вопросы</Heading>
            </Col>
          </Row>
          <Row>
            <Col xs="20" className={sUtils.pushedBottom3}>
              <List {...this.props} items={items} {...permissionsProps} />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const pickState = ({ csi }) => ({
  state: { csi },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ ...CSIActions }, dispatch),
});

export default connect(pickState, mapDispatch)(Questions);
