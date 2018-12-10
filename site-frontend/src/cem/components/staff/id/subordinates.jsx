import React, { Component } from 'react';

import { states } from 'cem/constants/users/dictionaries';

import UI from 'cem/components/ui';
const {
  Grid, Table, Loading, Heading,
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

export default class extends Component {
  componentWillMount() {
    const { id, state, actions } = this.props;
    if (state.users[id].data.details.isManager) {
      actions.loadSubordinateUsers(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id, state, actions } = this.props;
    if (id !== nextProps.id && state.users[nextProps.id].data.details.isManager) {
      actions.loadSubordinateUsers(nextProps.id);
    }
  }

  render() {
    const { id: userId, state } = this.props;
    const { ids = [], isFetching } = state.users.subordinateUsersByUserId[userId] || {};

    if (isFetching) return <Loading />;

    return (
      <Grid.Row>
        <section className={s.section}>
          {state.users[userId].data.details.isManager && !isFetching && ids && !!ids.length &&
            <div className={sUtils.scrollX}>
              <Table.Container width="100%" className={sUtils.width110}>
                <Table.Row>
                  <Table.Heading>Сотрудник</Table.Heading>
                  <Table.Heading>Должность</Table.Heading>
                  <Table.Heading>Отдел</Table.Heading>
                  <Table.Heading>Статус</Table.Heading>
                </Table.Row>
                {ids.map((subordinateUserId) => {
                  const subordinateUser = state.users[subordinateUserId].data;
                  return (
                    <Table.Row>
                      <Table.Cell>{`${subordinateUser.firstName} ${subordinateUser.lastName}`}</Table.Cell>
                      <Table.Cell>{subordinateUser.details.roleName ? subordinateUser.details.roleName : <i>Не определена</i>}</Table.Cell>
                      <Table.Cell>{subordinateUser.details.divisionName ? subordinateUser.details.divisionName : <i>Не определён</i>}</Table.Cell>
                      <Table.Cell className={s[states[subordinateUser.state].style]}>{states[subordinateUser.state].title}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Container>
            </div>
          }
          {(!state.users[userId].data.details.isManager || (!isFetching && ids && !ids.length)) && <Heading notFound>Подчиненных сотрудников нет</Heading>}
        </section>
      </Grid.Row>
    );
  }
}
