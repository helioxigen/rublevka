import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LinkedLeadsActions from 'cem/actions/requests/search/leads';
import { success } from 'cem/actions/toastr';

import { FormattedCurrency } from 'react-formatted';

import UI from 'cem/components/ui';
const {
  Grid, Heading, Button, Icon,
  Tooltip, Loading, Label, Table,
} = UI;

import LeadModal from 'cem/components/requests/search/id/modal/lead';
import RejectLeadModal from 'cem/_client_leads/components/id/modal/reject';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import * as leadDicts from 'cem/constants/leads/dictionaries';
import * as propertyDicts from 'cem/constants/properties/dictionaries';

class LeadContainer extends Component {
  componentDidMount() {
    const { searchRequestId, actions } = this.props;

    if (searchRequestId) actions.loadLeads(searchRequestId);
  }

  componentWillReceiveProps(nextProps) {
    const { searchRequestId, actions } = this.props;

    if (nextProps.searchRequestId !== searchRequestId) {
      actions.loadLeads(nextProps.searchRequestId);
    }
  }

  render() {
    const { searchRequestId: id, category, state, actions, isStatic } = this.props;
    const { isFetching, items = [] } = state.leadsBySearchRequestId[id] || {};

    if (isFetching) return <Loading />;

    const initialValues = {
      kind: 'recommendation',
      requestDetails: {
        requestKind: 'selling',
        category,
      },
      propertySearchOrderId: id,
    };

    return (
      <section>
        <Grid.Row>
          <Grid.Col xs="20">
            <Heading size="md">
              Список лидов
              {!isStatic &&
                <LeadModal actions={actions} formKey="create" searchRequestId={id} initialValues={initialValues}>
                  <Button type="button" className={sButton.btnRoundPlus} block size="lg" onClick={() => this.toggle()}>
                    <Icon className={s.icon} icon="modal" />
                  </Button>
                </LeadModal>
              }
            </Heading>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className={sUtils.pushedBottom6}>
          <Grid.Col xs="20" className={sUtils.scrollXMd}>
            {!!items.length &&
              <Table.Container width="100%" className={sUtils.width122}>
                <Table.Row>
                  <Table.Heading width="5">ID</Table.Heading>
                  <Table.Heading width="15%">Статус</Table.Heading>
                  <Table.Heading width="15%">ФИО</Table.Heading>
                  <Table.Heading width="10%">Тип</Table.Heading>
                  <Table.Heading width="15%">Условия</Table.Heading>
                  <Table.Heading width="25%">Комментарий</Table.Heading>
                  <Table.Heading width="15%">Действия</Table.Heading>
                </Table.Row>
                {items.map((item) => {
                  const { state: leadState, stateDetails, note, contactDetails = {}, requestDetails, requestDetails: { saleOffer = {}, rentOffer = {} } } = item;

                  const leadEditFormInitialValues = {
                    ...item,
                    ...initialValues,
                    requestDetails: {
                      ...initialValues.requestDetails,
                      ...item.requestDetails,
                    },
                  };

                  const statesDict = leadDicts.states[leadState.toLowerCase()];

                  return (
                    <Table.Row>
                      <Table.Cell>{item.id}</Table.Cell>
                      <Table.Cell className={cn(statesDict && s[statesDict.style])}>
                        {stateDetails.toApprove ? <Label kind="warning">ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ</Label> : !!statesDict && statesDict.title }
                      </Table.Cell>
                      <Table.Cell>{contactDetails.firstName || ''} {contactDetails.lastName || ''}</Table.Cell>
                      <Table.Cell>{propertyDicts.kinds[requestDetails.kind]}</Table.Cell>
                      <Table.Cell>
                        {!!saleOffer.price && <FormattedCurrency symbol={saleOffer.currency} value={saleOffer.price} />}
                        {!!saleOffer.price && !!rentOffer.price && ' / '}
                        {!!rentOffer.price &&
                          <span>
                            <FormattedCurrency symbol={rentOffer.currency} value={rentOffer.price} />/месяц
                          </span>
                        }
                        {!saleOffer.price && !rentOffer.price && <em>Не установлены</em>}
                      </Table.Cell>
                      <Table.Cell>{note || '—'}</Table.Cell>
                      <Table.Cell>
                        <Tooltip className={sUtils.pushedRight1} title="Перейти" position="top">
                          <Button className={sButton.btnTableAction} to={`/client_leads/recommendation/${item.id}`} size="xs">
                            <Icon className={s.btnIcon} icon="arrow-left" />
                          </Button>
                        </Tooltip>
                        {leadState === 'in_progress' && !stateDetails.toApprove &&
                          <Tooltip className={sUtils.pushedRight1} title="Редактировать" position="top">
                            <div>
                              <LeadModal actions={actions} formKey={item.id} data={item} searchRequestId={id} initialValues={leadEditFormInitialValues}>
                                <Button className={sButton.btnTableAction} size="xs" onClick={() => this.toggle()}>
                                  <Icon className={s.btnIcon} icon="edit" />
                                </Button>
                              </LeadModal>
                            </div>
                          </Tooltip>
                        }
                        {leadState === 'in_progress' && !stateDetails.toApprove &&
                          <Tooltip className={sUtils.pushedRight1} title="Обработать" position="top">
                            <Button className={sButton.btnTableAction} size="xs" onClick={() => actions.processLead(item.id, 'process').then(() => actions.loadLeads(id))}>
                              <Icon className={s.btnIcon} icon="checkmark" />
                            </Button>
                          </Tooltip>
                        }
                        {leadState === 'in_progress' && !stateDetails.toApprove &&
                          <Tooltip title="Отклонить" position="top">
                            <div>
                              <RejectLeadModal submitBtn={<Button className={sButton.btnWide} kind="danger" size="lg" block type="button">Отклонить лид</Button>} onClick={() => actions.processLead(item.id, 'reject').then(() => actions.loadLeads(id))}>
                                <Button className={sButton.btnTableAction} size="xs">
                                  <Icon className={s.btnIcon} icon="delete" />
                                </Button>
                              </RejectLeadModal>
                            </div>
                          </Tooltip>
                        }
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Container>
            }
            {!items.length && <Heading notFound className={cn(sUtils.pushedBottom3, sUtils.pushedTop3)}>Нет лидов</Heading>}
          </Grid.Col>
        </Grid.Row>
      </section>
    );
  }
}

const pickState = ({ auth, leadsBySearchRequestId }) => ({
  state: { auth, leadsBySearchRequestId },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...LinkedLeadsActions, success }, dispatch),
});

export default connect(pickState, pickActions)(LeadContainer);
