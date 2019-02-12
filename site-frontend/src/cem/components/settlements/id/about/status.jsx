import React, { Component } from 'react';
import { FormattedDate } from 'react-formatted';

import User from 'cem/containers/common/user';

import UI from 'cem/components/ui';
const {
  Heading,
  Form: { Group, Label, Static },
  Grid: { Row, Col },
} = UI;

import sUtils from 'cem/styles/utils';

export default class extends Component {
  componentWillMount() {
    const { createdByUserId, updatedByUserId } = this.props.data || {};

    if (createdByUserId) this.props.actions.loadUser(createdByUserId);
    if (updatedByUserId) this.props.actions.loadUser(updatedByUserId);
  }

  componentWillReceiveProps(nextProps) {
    const data = this.props.data || {};
    const nextData = nextProps.data || {};

    if (data.createdByUserId !== nextData.createdByUserId) {
      const { createdByUserId, updatedByUserId } = nextData;

      if (createdByUserId) this.props.actions.loadUser(createdByUserId);
      if (updatedByUserId) this.props.actions.loadUser(updatedByUserId);
    }
  }

  render() {
    const { data, state } = this.props;
    const {
      createdByUserId,
      updatedByUserId,
      createdAt,
      updatedAt,
      responsibleUser = {},
    } = data;
    const createdUser = state.users[createdByUserId];
    const updatedUser = state.users[updatedByUserId];

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
          {createdUser && (
            <Col sm="10">
              <Heading size="md">Создан</Heading>
              <Group>
                <Label block>Дата создания</Label>
                <Static>
                  <FormattedDate mask="dd.mm.yy HH:MM" value={createdAt} />
                </Static>
              </Group>
              <Group className={sUtils.resetIndentation}>
                <Label block>Создал</Label>
                <Static>
                  {createdUser.data.firstName} {createdUser.data.lastName}
                </Static>
              </Group>
            </Col>
          )}

          {updatedUser && (
            <Col sm="10">
              <Heading size="md">Изменен</Heading>
              <Group>
                <Label block>Дата изменения</Label>
                <Static>
                  <FormattedDate mask="dd.mm.yy HH:MM" value={updatedAt} />
                </Static>
              </Group>
              <Group className={sUtils.resetIndentation}>
                <Label block>Изменил</Label>
                <Static>
                  {updatedUser.data.firstName} {updatedUser.data.lastName}
                </Static>
              </Group>
            </Col>
          )}
        </Row>
      </section>
    );
  }
}
