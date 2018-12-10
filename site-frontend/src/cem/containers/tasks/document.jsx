import React, { Component } from 'react';

import documentActions from 'cem/actions/tasks/id/document';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Form from 'cem/components/tasks/id/about/document';
import UI from 'cem/components/ui';
const {
  Table, Heading,
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

class Document extends Component {
  componentWillMount() {
    const { taskId, actions } = this.props;

    actions.loadDocument(taskId);
  }

  render() {
    const { data } = this.props.state.documentByTaskId[this.props.taskId] || {};
    const initialData = data || {};

    return (
      <Row className={sUtils.pushedBottom6}>
        <Col xs="20">
          <Heading size="md">Просмотровый акт</Heading>
          <Table.Container width="100%" responsive>
            <Table.Row>
              {/* <Table.Heading>ID</Table.Heading> */}
              <Table.Heading>Дата загрузки</Table.Heading>
              <Table.Heading>Загрузил</Table.Heading>
              <Table.Heading>Архивировал</Table.Heading>
              <Table.Heading>Дата архивации</Table.Heading>
              <Table.Heading>Действия</Table.Heading>
            </Table.Row>
            <Form data={data} initialData={initialData} auth={this.props.state.auth} taskId={this.props.taskId} actions={this.props.actions} />
          </Table.Container>
        </Col>
      </Row>
    );
  }
}

const pickState = ({ documentByTaskId, auth }) => ({
  state: { documentByTaskId, auth },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch),
});

export default connect(pickState, mapDispatch)(Document);
