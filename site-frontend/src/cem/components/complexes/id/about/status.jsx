import React, { Component } from 'react';

import { FormattedDate } from 'react-formatted';

import User from 'cem/containers/common/user';

import UI from 'cem/components/ui';
const {
  Heading,
  Grid: { Row, Col },
  Form: { Group, Label, Static },
} = UI;

import sUtils from 'cem/styles/utils';

class Status extends Component {
  componentWillMount() {
    const { data = {}, actions } = this.props;

    if (data.createdByUserId) actions.loadUser(data.createdByUserId);
    if (data.updatedByUserId) actions.loadUser(data.updatedByUserId);
  }

  componentWillReceiveProps(nextProps) {
    const { data = {}, actions } = this.props;
    const nextData = nextProps.data || {};

    if (data.createdByUserId !== nextData.createdByUserId) {
      actions.loadUser(nextData.createdByUserId);
    }

    if (data.updatedByUserId !== nextData.updatedByUserId) {
      actions.loadUser(nextData.updatedByUserId);
    }
  }

  render() {
    const {
      data,
      data: { responsibleUser = {} },
      state,
    } = this.props;
    const createdByUser = state.users[data.createdByUserId];
    const updatedByUser = state.users[data.updatedByUserId];

    return (
      <section className={this.props.className}>
        {responsibleUser.id && (
          <Row className={sUtils.pushedBottom6}>
            <Col xs="20">
              <User id={responsibleUser.id} title="Ответственный" />
            </Col>
          </Row>
        )}
        <Row>
          {createdByUser && (
            <Col sm="10">
              <Heading size="md">Создан</Heading>
              <Group>
                <Label block>Дата создания</Label>
                <Static>
                  <FormattedDate mask="dd.mm.yy HH:MM" value={data.createdAt} />
                </Static>
              </Group>
              <Group className={sUtils.resetIndentation}>
                <Label block>Создал</Label>
                <Static>
                  {createdByUser.data.firstName} {createdByUser.data.lastName}
                </Static>
              </Group>
            </Col>
          )}
          {updatedByUser && (
            <Col className={sUtils.pushedTopXs4} sm="10">
              <Heading size="md">Изменен</Heading>
              <Group>
                <Label block>Дата изменения</Label>
                <Static>
                  <FormattedDate mask="dd.mm.yy HH:MM" value={data.updatedAt} />
                </Static>
              </Group>
              <Group className={sUtils.resetIndentation}>
                <Label block>Изменил</Label>
                <Static>
                  {updatedByUser.data.firstName} {updatedByUser.data.lastName}
                </Static>
              </Group>
            </Col>
          )}
        </Row>
      </section>
    );
  }
}

export default Status;
