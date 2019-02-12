import React, { Component } from 'react';

import { captions } from 'cem/constants/requests/images/dictionaries';

import UI from 'cem/components/ui';
const {
  Rating,
  Heading,
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

const Answer = ({ text, rate }) => (
  <Row className={sUtils.pushedBottom3}>
    <Col xs="20">
      <h2 className={s.text}>{text}</h2>

      <Row>
        <Col sm="12" md="8">
          <div className={sUtils.scrollX}>
            <div className={sUtils.width40}>
              <Rating captions={captions} value={rate} disabled />
            </div>
          </div>
        </Col>
      </Row>
    </Col>
  </Row>
);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loadAnswers from 'cem/actions/csi/answers/load';

class Answers extends Component {
  componentWillMount() {
    const { requestId, actions, kind = 'image' } = this.props;

    actions.loadAnswers(kind, requestId);
  }
  render() {
    const { requestId, state, kind = 'image' } = this.props;
    const { items = [], isFetching } = state.answers[kind][requestId] || {};

    return !isFetching && !!items.length ? (
      <Row className={sUtils.pushedBottom3}>
        <Col xs="20">
          <Heading size="md">Ответы на вопросы</Heading>
        </Col>
        <Col xs="20">
          {items.map(item => (
            <Answer {...item} />
          ))}
        </Col>
      </Row>
    ) : null;
  }
}

const pickState = ({ answers }) => ({
  state: { answers },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ loadAnswers }, dispatch),
});

export default connect(
  pickState,
  mapDispatch,
)(Answers);
