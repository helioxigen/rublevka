import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSIActions from 'cem/actions/csi';

import List from 'cem/components/requests/images/id/questions';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Row, Col },
  Form: { Container },
 } = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';

class Questions extends Component {
  componentDidMount() {
    this.props.actions.loadQuestions('image');
  }

  render() {
    const { state } = this.props;
    const { items = [] } = state.csi.image.list;

    const initialValues = {
      questions: items.map(item => ({ questionId: item.id, ...item })),
    };

    return items.length ? (
      <Container className={s.container} fluid>
        <Row className={sUtils.pushedBottom3}>
          <Col xs="20">
            <Heading size="md">Оцените качество</Heading>
          </Col>
        </Row>
        <List initialValues={initialValues} submit={this.props.submit} />
      </Container>
    ) : <div />;
  }
}

const pickState = ({ csi }) => ({
  state: { csi },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ ...CSIActions }, dispatch),
});

export default connect(pickState, mapDispatch)(Questions);
