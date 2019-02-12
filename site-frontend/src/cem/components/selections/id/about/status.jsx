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
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    const nextData = nextProps.data;

    if (
      data.id !== nextData.id ||
      data.updatedByUserId !== nextData.updatedByUserId ||
      data.createdByUserId !== nextData.createdByUserId
    ) {
      this.load(nextProps);
    }
  }

  load(props) {
    const {
      actions,
      data: { updatedByUserId, createdByUserId },
    } = props;

    if (createdByUserId) actions.loadUser(createdByUserId);
    if (updatedByUserId) actions.loadUser(updatedByUserId);
  }

  render() {
    const {
      usersState,
      className,
      data,
      data: { responsibleUserId, updatedByUserId, createdByUserId },
    } = this.props;

    const { data: createdByUserData = {} } = usersState[createdByUserId] || {};
    const { data: updatedByUserData = {} } = usersState[updatedByUserId] || {};

    return (
      <section className={className}>
        <Row className={sUtils.pushedBottom6}>
          {responsibleUserId && (
            <Col xs="20" md="10">
              <User id={responsibleUserId} title="Ответственный" />
            </Col>
          )}
        </Row>
        <Row>
          {createdByUserData.id && (
            <Col sm="10">
              <Heading size="md">Создан</Heading>
              <Group>
                <Label block>Дата создания</Label>
                <Static>
                  <FormattedDate
                    value={data.createdAt}
                    mask="dd.mm.yyyy HH:MM"
                  />
                </Static>
              </Group>
              <Group className={sUtils.resetIndentation}>
                <Label block>Создал</Label>
                <Static>
                  {createdByUserData.firstName} {createdByUserData.lastName}
                </Static>
              </Group>
            </Col>
          )}
          {updatedByUserData.id && (
            <Col className={sUtils.pushedTopXs4} sm="10">
              <Heading size="md">Изменен</Heading>
              <Group>
                <Label block>Дата изменения</Label>
                <Static>
                  <FormattedDate
                    value={data.updatedAt}
                    mask="dd.mm.yyyy HH:MM"
                  />
                </Static>
              </Group>
              <Group className={sUtils.resetIndentation}>
                <Label block>Изменил</Label>
                <Static>
                  {updatedByUserData.firstName} {updatedByUserData.lastName}
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
