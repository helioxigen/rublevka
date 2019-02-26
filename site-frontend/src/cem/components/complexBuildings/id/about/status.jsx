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

export default class extends Component {
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
      actions.loadUser(nextData.updatedByUserId);
    }
  }

  render() {
    const {
      data,
      data: { responsibleUser = {} },
      state,
    } = this.props;
    const createdBy = state.users[data.createdByUserId];
    const updatedBy = state.users[data.updatedByUserId];

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
          {createdBy && (
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
                  {createdBy.data.firstName} {createdBy.data.lastName}
                </Static>
              </Group>
            </Col>
          )}

          {updatedBy && (
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
                  {updatedBy.data.firstName} {updatedBy.data.lastName}
                </Static>
              </Group>
            </Col>
          )}
        </Row>
      </section>
    );
  }
}
