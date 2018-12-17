import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import UI from 'cem/components/ui';
const {
  Label,
  ParamList,
  Grid: { Container, Row, Col },
  Loading,
} = UI;
import { FormattedDate } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';
import sHeader from 'cem/styles/id/header';

import * as dict from 'cem/_client_leads/constants/dictionaries';

const Component = ({ id, state, isContactHidden, isPhoneNumberHidden }) => {
  const { data, isFetching } = state._clientLeads[id];

  if (data && !isFetching) {
    const { requestDetails = {}, phoneCallDetails = {}, contactDetails = {} } = data;

    // load from dictionary
    const leadKind = dict.leadKinds[data.kind].title || '—';
    const requestKind =
      (requestDetails.requestKind && dict.requestKinds[requestDetails.requestKind].title) || '—';
    const callStatus = dict.callStatuses[phoneCallDetails.status];

    const isToApprove = !!data.stateDetails.toApprove;
    const isArchive = data.state === 'rejected' || data.state === 'processed';
    const isSpam = data.state === 'spam';
    const isNew = data.state === 'new';
    const isActive = !isToApprove && !isArchive && !isSpam && !isNew;

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
                    <Col sm="6" md="5" lg="4">
                      <ParamList label="Тип лида" big>
                        {leadKind}
                      </ParamList>
                    </Col>
                    <Col className={sUtils.pushedTopXs2} sm="6" lg="5">
                      <ParamList label="Тип заявки" big>
                        {requestKind}
                      </ParamList>
                    </Col>
                    <Col className={sUtils.pushedTopXs2} sm="7" md="6" lg="4">
                      <ParamList label="Дата поступления" big>
                        <FormattedDate mask="dd.mm.yyyy HH:MM" value={data.createdAt} />
                      </ParamList>
                    </Col>
                    {data.kind === 'phone_call' && callStatus && (
                      <Col sm="5" md="5" lg="4" className={sUtils.pushedTopXs2Md2}>
                        <ParamList
                          label="Статус звонка"
                          big
                          valueClassName={sHeader[callStatus.style]}
                        >
                          {callStatus.title}
                        </ParamList>
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col className={sUtils.pushedTopXs2} sm="3" md="4">
                      <ParamList label="ID">{data.id}</ParamList>
                    </Col>
                    {!isContactHidden && (
                      <Col className={sUtils.pushedTopXs2} sm="9" md="7" lg="5">
                        <ParamList label="Клиент">
                          {contactDetails.firstName || '—'} {contactDetails.lastName}
                        </ParamList>
                      </Col>
                    )}
                    {!isPhoneNumberHidden && (
                      <Col className={sUtils.pushedTopXs2} sm="5" md="4">
                        <ParamList label="Телефон">{contactDetails.phoneNumber}</ParamList>
                      </Col>
                    )}
                    {(!isActive || !isArchive) && data.tasks && (
                      <Col className={sUtils.pushedTopXs2} sm="3" md="5">
                        <ParamList label="Объём задач">
                          <span className={s.textPrimary}>{data.tasks.toDo}</span>
                          &nbsp;/&nbsp;
                          <span className={s.textSuccess}>{data.tasks.done}</span>
                        </ParamList>
                      </Col>
                    )}
                  </Row>
                </section>
              </Col>
              <Col className={sUtils.pushedTopXs2} sm="5">
                {isToApprove && (
                  <div className={cn(sUtils.textRight, sUtils.pushedBottom1_5)}>
                    <Label kind="warning" className={sUtils.textUppercase}>
                      ожидает подтверждения
                    </Label>
                  </div>
                )}
                {isActive && data.tasks && !data.tasks.scheduled && (
                  <div className={cn(sUtils.textRight, sUtils.pushedBottom1_5)}>
                    <Label kind="danger" className={sUtils.textUppercase}>
                      нет запланированных задач
                    </Label>
                  </div>
                )}
                {isActive && data.tasks && data.tasks.overdue && (
                  <div className={cn(sUtils.textRight, sUtils.pushedBottom1_5)}>
                    <Label kind="warning" className={sUtils.textUppercase}>
                      задачи просрочены
                    </Label>
                  </div>
                )}
                {data.isRepeated && (
                  <div className={cn(sUtils.textRight, sUtils.pushedBottom1_5)}>
                    <Label kind="warning" className={sUtils.textUppercase}>
                      Повторное обращение
                    </Label>
                  </div>
                )}
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
const pickState = (state) => {
  const { _clientLeads } = state;

  return {
    state: {
      _clientLeads,
    },
  };
};

export default connect(pickState)(Component);
