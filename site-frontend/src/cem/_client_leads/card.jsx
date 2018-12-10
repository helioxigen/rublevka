import React from 'react';

import moment from 'moment';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import UI from 'cem/components/ui';
const { Label, ParamList, Grid: { Container, Row, Col }, Loading, Tooltip, StaticMask } = UI;

import cn from 'classnames';
import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';
import sHeader from 'cem/styles/id/header';

// constants
import * as dict from 'cem/_client_leads/constants/dictionaries';

const Component = ({ clientLead, _contacts, isPhoneNumberHidden }) => {
  const { data = {}, isFetching } = clientLead;

  if (data && !isFetching) {
    const { requestDetails = {}, phoneCallDetails = {}, contactDetails = {} } = data;
    const { utms = {} } = data.marketing || {};

    const contact = _contacts[data.contactId] || {};
    const { data: contactData = {} } = contact;

    // load from dictionary
    const leadKind = dict.leadKinds[data.kind].title || '—';
    const requestKind =
      (requestDetails.requestKind && dict.requestKinds[requestDetails.requestKind].title) || '—';
    const callStatus = dict.callStatuses[phoneCallDetails.status];

    const hasStateToApprove = !!data.stateDetails.toApprove;
    const isArchive = data.state === 'rejected' || data.state === 'processed';
    // const isSpam = data.state === `spam`;
    // const isNew = data.state === `new`;
    const isActive = data.state === 'in_progress' && !hasStateToApprove;

    return (
      <Link
        to={`/client_leads/${data.kind}/${data.id}`}
        className={cn(s.card, s[dict.states[data.state].style])}
      >
        <div className={s.cardWrapper}>
          <Container fluid>
            <Row>
              <Col sm="15">
                <section className={s.flex}>
                  <Row>
                    <Col sm="4" md="5" lg="4">
                      <ParamList label="Лид" big>{leadKind}</ParamList>
                    </Col>
                    <Col sm="5" md="5" lg="4" className={sUtils.pushedTopXs2}>
                      <ParamList label="Заявка" big>{requestKind}</ParamList>
                    </Col>
                    <Col sm="6" md="6" lg="5" className={sUtils.pushedTopXs2}>
                      <ParamList label="Поступил" big>
                        {moment(data.createdAt).format('D MMM HH:mm, ddd')}
                      </ParamList>
                    </Col>
                    {data.kind === 'phone_call' &&
                      callStatus &&
                      <Col sm="5" md="4" lg="4" className={sUtils.pushedTopXs2}>
                        <ParamList label="Звонок" big valueClassName={sHeader[callStatus.style]}>
                          {callStatus.title}
                        </ParamList>
                      </Col>}
                  </Row>
                  <Row>
                    <Col sm="4" md="5" lg="4" className={sUtils.pushedTopXs2Md2}>
                      <ParamList label="ID">
                        {data.id}
                      </ParamList>
                    </Col>
                    <Col sm="5" md="5" lg="4" className={sUtils.pushedTopXs2Md2}>
                      <ParamList label="Клиент">
                        {(contactData.details || {}).firstName || '—'}
                        {' '}
                        {(contactData.details || {}).lastName}
                      </ParamList>
                    </Col>
                    {!isPhoneNumberHidden &&
                      <Col sm="6" md="6" lg="5" className={sUtils.pushedTopXs2Md2}>
                        <ParamList label="Телефон">
                          <StaticMask pattern="+1 (111) 111-11-11">
                            {contactDetails.phoneNumber}
                          </StaticMask>
                        </ParamList>
                      </Col>}
                    {(isActive || isArchive) &&
                      data.tasks &&
                      <Col sm="10" md="5" lg="3" className={sUtils.pushedTopXs2Md2}>
                        <ParamList label="Объём задач">
                          <span className={s.textPrimary}>
                            {data.tasks.toDo}
                          </span>
                          &nbsp;/&nbsp;
                          <span className={s.textSuccess}>
                            {data.tasks.done}
                          </span>
                        </ParamList>
                      </Col>}
                  </Row>
                </section>
              </Col>
              <Col sm="5" className={cn(sUtils.pushedTopXs2, sUtils.textRight)}>
                {hasStateToApprove &&
                  <div className={sUtils.pushedBottom1_5}>
                    <Label kind="warning" className={sUtils.textUppercase}>
                      ожидает подтверждения
                    </Label>
                  </div>}
                {isActive &&
                  data.tasks &&
                  data.tasks.overdue &&
                  <div className={sUtils.pushedBottom1_5}>
                    <Label kind="danger" className={sUtils.textUppercase}>задачи просрочены</Label>
                  </div>}
                {isActive &&
                  data.tasks &&
                  !data.tasks.scheduled &&
                  <div className={sUtils.pushedBottom1_5}>
                    <Label kind="danger" className={sUtils.textUppercase}>
                      нет запланированных задач
                    </Label>
                  </div>}
              </Col>
            </Row>
          </Container>
        </div>
      </Link>
    );
  }
  return <Loading />;
};

// redux connectors
const pickState = (state, props) => {
  const { _clientLeads, _contacts } = state;

  return {
    clientLead: _clientLeads[props.id] || {},
    _contacts,
  };
};

export default connect(pickState)(Component);
