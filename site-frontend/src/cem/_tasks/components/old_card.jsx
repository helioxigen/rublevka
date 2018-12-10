import React from 'react';

import { Link } from 'react-router';

import { connect } from 'react-redux';

import * as dealsDict from 'cem/constants/deals/dictionaries';
import * as leadsDict from 'cem/constants/leads/dictionaries';
import * as propertiesDict from 'cem/constants/properties/dictionaries';
import * as tasksDict from 'cem/constants/tasks/dictionaries';

import UI from 'cem/components/ui';
const {
  Media, Label,
  Loading, Text, ParamList,
  Grid: { Container, Row, Col },
} = UI;
import { FormattedDate, FormattedCurrency } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';
import sProperty from 'cem/styles/id/header';
import sTypography from 'cem/styles/typography';

// contact
const Image = ({ src }) => (
  <UI.Image src={src ? `${src}-64` : require('url-loader!cem/assets/placeholder-photo')} className={s.placeholder} kind="circle" width="42" height="42" />
);

const ContactDescription = ({ details = {} }) => (
  <div>
    <p className={s.mediaText}>{details.firstName || ''} {details.lastName || ''}</p>
    <p className={s.mediaText}>{details.phoneNumber}</p>
  </div>
);

const Contact = ({ contact = {} }) => {
  const { data = {} } = contact;

  return (
    <dl className={sUtils.resetIndent}>
      <dt className={cn(s.textGrey, sUtils.pushedBottom1)}>
        Клиент
      </dt>
      <dd className={s.mediaText}>
        <Media left={<Image src={data.photo && data.photo.url} />} body={<ContactDescription details={data.details} />} />
      </dd>
    </dl>
  );
};

// responsibleUser
const ResponsibleUserDescription = ({ firstName, lastName, workPhoneNumber }) => (
  <div>
    <p className={s.mediaText}>{firstName || ''} {lastName || ''}</p>
    <p className={s.mediaText}>{workPhoneNumber}</p>
  </div>
);

const ResponsibleUser = ({ responsibleUser = {} }) => {
  const { data = {} } = responsibleUser;

  return (
    <dl className={sUtils.resetIndent}>
      <dt className={cn(s.textGrey, sUtils.pushedBottom1)}>
        Ответственный
      </dt>
      <dd className={s.mediaText}>
        <Media left={<Image src={data.photo && data.photo.url} />} body={<ResponsibleUserDescription {...data} />} />
      </dd>
    </dl>
  );
};

// property
const Property = ({ property }) => (
  <div>{JSON.stringify(property)}</div>
    // <dl className={sUtils.resetIndent}>
    //   <dt className={cn(s.textGrey, sUtils.pushedBottom1)}>Объект (ID: {id})</dt>
    //    <dd className={cn(s.mediaText, sProperty[state && propertiesDict.states[state].style])}>{state && propertiesDict.states[state].title}</dd>
    //     {!!saleOffer &&
    //       <dd className={s.mediaText}>
    //       {propertiesDict.offerKinds.purchase} (<FormattedCurrency symbol={saleOffer.currency} value={saleOffer.price}/>)
    //       </dd>
    //     }
    //     {!!rentOffer &&
    //       <dd className={s.mediaText}>
    //         {propertiesDict.offerKinds.rent} (<FormattedCurrency symbol={rentOffer.currency} value={rentOffer.price}/>)
    //       </dd>
    //     }
    // </dl>
  );

// deal
const Deal = ({ deal = {} }) => {
  const { data } = deal;

  if (data) {
    const state = dealsDict.states[data.state];
    const { id, details = {} } = data;
    const { offerKind, budget, currency } = details;

    return (
      <dl className={sUtils.resetIndent}>
        <dt className={cn(s.textGrey, sUtils.pushedBottom1)}>Сделка (ID: {id})</dt>
        <dd className={cn(s.mediaText, sTypography[state.style])}>{state.title}</dd>
        <dd className={s.mediaText}>{propertiesDict.offerKinds[offerKind]} (<FormattedCurrency symbol={currency} value={budget} />)</dd>
      </dl>
    );
  }
  return <Loading />;
};

// clientLead
const ClientLead = ({ clientLead = {} }) => {
  const { data } = clientLead;

  if (data) {
    const state = leadsDict.states[data.state];
    const { id, requestDetails = {} } = data;
    const requestKind = leadsDict.requestKinds[requestDetails.requestKind];

    return (
      <dl className={sUtils.resetIndent}>
        <dt className={cn(s.textGrey, sUtils.pushedBottom1)}>Лид (ID: {id})</dt>
        <dd className={cn(s.mediaText, sTypography[state.style])}>{state ? state.title : '—'}</dd>
        <dd className={s.mediaText}>{requestKind ? requestKind.title : '—'}</dd>
      </dl>
    );
  }
  return <Loading />;
};

const Card = (props) => {
  const { task = {}, state } = props;
  const details = task.previewDetails || task.negotiationDetails || task.contactDetails || task.freeDetails || {};

  const isPreview = task.kind === 'preview';
  const taskLinkKind = details && details.linkKind ? tasksDict.linkKinds[details.linkKind].title : 'По сделке';

  const { _users, _clientLeads, _contacts, _deals } = state;

  return (
    <Link to={`/tasks/${task.id}`} className={cn(s.card, s[tasksDict.states[task.state].style])}>
      <div className={s.cardWrapper}>
        <Container fluid className={s.flex}>
          <Row>
            <Col sm="5" lg="4">
              <ParamList label="Когда" big>
                <FormattedDate mask="dd.mm.yyyy HH:MM" value={task.deadline} />
              </ParamList>
            </Col>
            <Col className={sUtils.pushedTopXs2} sm="5" lg="4">
              <ParamList label="Задача" big>{tasksDict.kinds[task.kind].title}</ParamList>
            </Col>
            {!!taskLinkKind && (
              <Col className={sUtils.pushedTopXs2} sm="4" lg="3">
                <ParamList label="Тип" big>{taskLinkKind}</ParamList>
              </Col>
            )}
            <Col sm="6" lg="9">
              <div className={sUtils.textRight}>
                {!!task.stateDetails.toApprove && (
                  <div className={sUtils.pushedBottom1}>
                    <Label kind="warning">ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ</Label>
                  </div>

                )}
                {isPreview && !!details.archivedDocumentId && task.state === 'done' && (
                  <div>
                    <Label kind="success">ПРОСМОТРОВЫЙ АКТ АРХИВИРОВАН</Label>
                  </div>
                )}
                {isPreview && details.isDocumentAttached && !details.archivedDocumentId && task.state === 'done' && (
                  <div className={sUtils.pushedBottom1}>
                    <div>
                      <Label kind="warning">ПРОСМОТРОВЫЙ АКТ НЕ АРХИВИРОВАН</Label>
                    </div>
                  </div>
                )}
                {isPreview && !details.isDocumentAttached && task.state === 'done' && (
                  <div>
                    <Label kind="danger">ПРОСМОТРОВЫЙ АКТ НЕ ЗАГРУЖЕН</Label>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="20">
              <Row>
                <Col sm="5" lg="4">
                  {details.linkKind === 'deal' && (
                    <Deal deal={_deals[details.dealId]} />
                  )}
                  {details.linkKind === 'property' && !!details.propertyId && (
                    <Property property={{}} />
                  )}
                  {details.linkKind === 'client_lead' && (
                    <ClientLead clientLead={_clientLeads[details.clientLeadId]} />
                  )}
                </Col>
                <Col className={sUtils.pushedTopXs2} sm="5" lg="4">
                  <ResponsibleUser responsibleUser={_users[task.responsibleUser.id]} />
                </Col>
                <Col className={sUtils.pushedTopXs2} sm="5" lg="4">
                  {!!details.contactId &&
                    <Contact contact={_contacts[details.contactId]} />
                  }
                </Col>
                <Col className={sUtils.pushedTopXs2} sm="5" lg="8">
                  {details.goal &&
                    <ParamList label="Цель">
                      <Text truncate={105} ellipsis>{details.goal}</Text>
                    </ParamList>
                  }
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Link>
  );
};

// redux connectors
const pickState = (state) => {
  const { _tasks, _clientLeads, _contacts, _deals, _users } = state;

  return {
    state: {
      _tasks,

      _clientLeads,
      _contacts,
      _deals,
      _users,
    },
  };
};

export default connect(pickState)(Card);
