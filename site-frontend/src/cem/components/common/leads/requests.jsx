import React, { Component } from 'react';

import { FormattedDate } from 'react-formatted';

import * as dict from 'cem/constants/leads/dictionaries';

import UI from 'cem/components/ui';
const { Grid, Loading, Button, Icon, Table, Heading } = UI;

import s from 'cem/styles/id/content';
import sButton from 'cem/styles/buttons';

class LeadSource extends Component {
  componentWillMount() {
    this.props.actions.loadLeadSource(this.props.id);
  }

  render() {
    const { state, id } = this.props;
    const lead = state.leadSources[id] || {};
    const leadData = lead.data || {};

    return <span>{leadData.title || '—'}</span>;
  }
}

class User extends Component {
  componentWillMount() {
    this.props.actions.loadUser(this.props.id);
  }

  render() {
    const { state, id } = this.props;
    const user = state.users[id] || {};
    const userData = user.data || {};

    return (
      <span>
        {userData.firstName || ''} {userData.lastName || ''}
      </span>
    );
  }
}

class Requests extends Component {
  componentWillMount() {
    const { type = 'property', params, data } = this.props;
    const requests = {
      property: this.props.actions.loadLeadsByPropertyId,
      contact: this.props.actions.loadLeadsByContactId,
    };

    if (type === 'contact') {
      const args = data.details.phoneNumber
        ? [data.details.phoneNumber, 'contactDetails.phoneNumber']
        : [data.id, 'id'];
      requests[type](...args);
    } else {
      requests[type](params.id);
    }
  }

  render() {
    const { state, type = 'property', params, data } = this.props;
    const stateKeys = {
      property: 'leadsByPropertyId',
      contact: 'leadsByContactId',
    };
    const id = type === 'contact' ? data.details.phoneNumber || data.id : params.id;
    const { isFetching, items = [] } = state[stateKeys[type]][id] || {};

    if (isFetching) return <Loading />;

    return (
      <Grid.Row>
        <section className={s.section}>
          {!items.length && <Heading notFound>Нет обращений</Heading>}
          {!!items.length && (
            <Table.Container width="100%">
              <Table.Row>
                <Table.Heading>ID</Table.Heading>
                <Table.Heading>Дата запроса</Table.Heading>
                <Table.Heading>Статус</Table.Heading>
                <Table.Heading>Тип запроса</Table.Heading>
                <Table.Heading>Тип заявки</Table.Heading>
                <Table.Heading>Источник</Table.Heading>
                <Table.Heading>Запрос принял</Table.Heading>
                <Table.Heading>Ответственный</Table.Heading>
                <Table.Heading>Действия</Table.Heading>
              </Table.Row>
              {items.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>
                    <FormattedDate mask="dd.mm.yyyy" value={item.createdAt} />
                  </Table.Cell>
                  <Table.Cell className={s[dict.states[item.state].style]}>
                    {dict.states[item.state].title}
                  </Table.Cell>
                  <Table.Cell>
                    {item.requestDetails &&
                      dict.requestKinds[item.requestDetails.requestKind].title}
                  </Table.Cell>
                  <Table.Cell>{dict.leadKinds[item.kind].title}</Table.Cell>
                  <Table.Cell>
                    <LeadSource {...this.props} id={item.clientLeadSourceId} />
                  </Table.Cell>
                  <Table.Cell>
                    <User {...this.props} id={item.createdByUserId} />
                  </Table.Cell>
                  <Table.Cell>
                    {item.responsibleUser ? (
                      <User {...this.props} id={item.responsibleUser.id} />
                    ) : (
                      '—'
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      to={`/client_leads/${item.kind}/${item.id}`}
                      className={sButton.btnTableAction}
                      size="xs"
                    >
                      <Icon className={s.btnIcon} icon="arrow-left" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Container>
          )}
        </section>
      </Grid.Row>
    );
  }
}

export default Requests;
