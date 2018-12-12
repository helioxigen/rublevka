import React from 'react';

import { Link } from 'react-router';

import * as dealsDict from 'cem/constants/deals/dictionaries';
import * as leadsDict from 'cem/_client_leads/constants/dictionaries';
import * as propertiesDict from 'cem/constants/properties/dictionaries';
import * as tasksDict from 'cem/constants/tasks/dictionaries';

import UI from 'cem/components/ui';
const { Media, Image, Label, Loading, Text, ParamList, Grid: { Container, Row, Col } } = UI;
import { FormattedDate, FormattedCurrency } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';
import sProperty from 'cem/styles/id/header';
import sTypography from 'cem/styles/typography';

import { idResourcer } from 'core/decorators/fetcher';

const ContactImage = ({ src }) =>
  (<Image
    src={
      src
        ? `${src}-64`
        : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
    }
    className={s.placeholder}
    kind="circle"
    width="42"
    height="42"
  />);

const ContactDescription = ({ details = {} }) =>
  (<div>
    <p className={s.mediaText}>
      {details.firstName || ''} {details.lastName || ''}
    </p>
    <p className={s.mediaText}>
      {details.phoneNumber}
    </p>
  </div>);

const Contact = ({ id, data = {} }) =>
  (<dl className={sUtils.resetIndent}>
    <dt className={cn(s.textGrey, sUtils.pushedBottom1)}>
      Клиент&nbsp;
      {!!id &&
        <span>
          (ID: {id})
        </span>}
      {!id && <span>(лид)</span>}
    </dt>
    <dd className={s.mediaText}>
      <Media
        left={<ContactImage src={data.photo && data.photo.url} />}
        body={<ContactDescription details={data.details} />}
      />
    </dd>
  </dl>);

const ResponsibleUserDescription = props =>
  (<div>
    <p className={s.mediaText}>
      {props.firstName || ''} {props.lastName || ''}
    </p>
    {/* <p className={s.mediaText}>{props.workPhoneNumber}</p> */}
  </div>);

const ResponsibleUser = ({ data = {} }) =>
  (<dl className={sUtils.resetIndent}>
    <dt className={cn(s.textGrey, sUtils.pushedBottom1)}>Ответственный</dt>
    <dd className={s.mediaText}>
      <Media
        left={<ContactImage src={data.photo && data.photo.url} />}
        body={<ResponsibleUserDescription {...data} />}
      />
    </dd>
  </dl>);

const Property = idResourcer({
  id: 'properties',
  linkedResourcesSchemes: [],
})(({ itemData: { id, state, saleOffer, rentOffer } }) =>
  (<dl className={sUtils.resetIndent}>
    <dt className={cn(s.textGrey, sUtils.pushedBottom1)}>
      Объект (ID: {id})
    </dt>
    <dd className={cn(s.mediaText, sProperty[state && propertiesDict.states[state].style])}>
      {state && propertiesDict.states[state].title}
    </dd>
    {!!saleOffer &&
      <dd className={s.mediaText}>
        {propertiesDict.offerKinds.purchase} (
        <FormattedCurrency symbol={saleOffer.currency} value={saleOffer.price} />
        )
      </dd>}
    {!!rentOffer &&
      <dd className={s.mediaText}>
        {propertiesDict.offerKinds.rent} (
        <FormattedCurrency symbol={rentOffer.currency} value={rentOffer.price} />
        )
      </dd>}
  </dl>),
);

const Deal = ({ id, data = {} }) => {
  const { state, details = {} } = data;
  const { offerKind, budget, currency } = details;

  if (state) {
    return (
      <dl className={sUtils.resetIndent}>
        <dt className={cn(s.textGrey, sUtils.pushedBottom1)}>
          Сделка (ID: {id})
        </dt>
        <dd className={cn(s.mediaText, sTypography[dealsDict.states[state].style])}>
          {dealsDict.states[state].title}
        </dd>
        <dd className={s.mediaText}>
          {propertiesDict.offerKinds[offerKind]} (
          <FormattedCurrency symbol={currency} value={budget} />
          )
        </dd>
      </dl>
    );
  }
  return <Loading />;
};

const Lead = ({ id, data = {} }) => {
  const { state, requestDetails = {} } = data;
  const requestKind = requestDetails.requestKind;

  if (state) {
    return (
      <dl className={sUtils.resetIndent}>
        <dt className={cn(s.textGrey, sUtils.pushedBottom1)}>
          Лид (ID: {id})
        </dt>
        <dd className={cn(s.mediaText, sTypography[leadsDict.states[state].style])}>
          {state ? leadsDict.states[state].title : '—'}
        </dd>
        <dd className={s.mediaText}>
          {requestKind ? leadsDict.requestKinds[requestKind].title : '—'}
        </dd>
      </dl>
    );
  }
  return <Loading />;
};

export default ({ data = {}, contacts, leads, deals, users }) => {
  const previewDetails = data.previewDetails || {};
  const negotiationDetails = data.negotiationDetails || {};
  const contactDetails = data.contactDetails || {};
  const freeDetails = data.freeDetails || {};

  const isPreview = data.kind === 'preview';
  const isNegotiation = data.kind === 'negotiation';
  const isFree = data.kind === 'free';

  const details = isFree ? freeDetails : contactDetails;

  const taskLinkKind =
    details && details.linkKind ? tasksDict.linkKinds[details.linkKind].title : 'По сделке';

  const previewAndNegotiationDetails = {
    preview: previewDetails,
    negotiation: negotiationDetails,
  };

  const dealId =
    isPreview || isNegotiation ? previewAndNegotiationDetails[data.kind].dealId : details.dealId;
  const propertyId =
    isPreview || isNegotiation
      ? previewAndNegotiationDetails[data.kind].propertyId
      : details.propertyId;
  const propertyCategory =
    isPreview || isNegotiation
      ? previewAndNegotiationDetails[data.kind].propertyCategory
      : details.propertyCategory;
  const contactId =
    isPreview || isNegotiation
      ? previewAndNegotiationDetails[data.kind].contactId
      : details.contactId;
  const clientLeadId = details.clientLeadId;

  const dealData = deals[dealId] || {};
  const contactData = contacts[contactId] || {};
  const clientLeadData = leads[clientLeadId] || {};
  const clientLeadContactData =
    clientLeadData.data && clientLeadData.data.contactDetails
      ? {
        ...clientLeadData.data,
        details: { ...clientLeadData.data.contactDetails },
      }
      : {};
  const responsibleUserData = users[data.responsibleUser && data.responsibleUser.id] || {};

  return (
    <Link to={`/tasks/${data.id}`} className={cn(s.card, s[tasksDict.states[data.state].style])}>
      <div className={s.cardWrapper}>
        <Container fluid className={s.flex}>
          <Row>
            <Col sm="5" lg="4">
              <ParamList label="Когда" big>
                <FormattedDate mask="dd.mm.yyyy HH:MM" value={data.deadline} />
              </ParamList>
            </Col>
            <Col className={sUtils.pushedTopXs2} sm="5" lg="4">
              <ParamList label="Задача" big>
                {tasksDict.kinds[data.kind].title}
              </ParamList>
            </Col>
            {!!taskLinkKind &&
              <Col className={sUtils.pushedTopXs2} sm="4" lg="3">
                <ParamList label="Тип" big>
                  {taskLinkKind}
                </ParamList>
              </Col>}
            {/* isPreview && !previewDetails.archivedDocumentId &&
              <Col sm={isFree ? `4` : `9`} md={isFree ? `6` : `11`}>
                <Label kind="warning">АКТ НЕ АРХИВИРОВАН</Label>
              </Col>
            */}
            <Col sm="6" lg="9">
              <div className={sUtils.textRight}>
                {!!data.stateDetails.toApprove &&
                  <div className={sUtils.pushedBottom1}>
                    <Label kind="warning">ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ</Label>
                  </div>}
                {isPreview &&
                  !!data.previewDetails.archivedDocumentId &&
                  data.state === 'done' &&
                  <div>
                    <Label kind="success">ПРОСМОТРОВЫЙ АКТ АРХИВИРОВАН</Label>
                  </div>}
                {isPreview &&
                  data.previewDetails.isDocumentAttached &&
                  !data.previewDetails.archivedDocumentId &&
                  data.state === 'done' &&
                  <div className={sUtils.pushedBottom1}>
                    <div>
                      <Label kind="warning">ПРОСМОТРОВЫЙ АКТ НЕ АРХИВИРОВАН</Label>
                    </div>
                  </div>}
                {isPreview &&
                  !data.previewDetails.isDocumentAttached &&
                  data.state === 'done' &&
                  <div>
                    <Label kind="danger">ПРОСМОТРОВЫЙ АКТ НЕ ЗАГРУЖЕН</Label>
                  </div>}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="20">
              <Row>
                <Col sm="5" lg="4">
                  {((isPreview && previewDetails.dealId) ||
                    (isNegotiation && negotiationDetails.dealId) ||
                    details.linkKind === 'deal') &&
                    <Deal id={dealId} data={dealData.data} />}
                  {!isPreview &&
                    !isNegotiation &&
                    details.linkKind === 'property' &&
                    <Property
                      id={propertyId}
                      resourcePath={`/v1/properties/${propertyCategory}`}
                    />}
                  {!isPreview &&
                    !isNegotiation &&
                    details.linkKind === 'client_lead' &&
                    <Lead id={clientLeadId} data={clientLeadData.data} />}
                </Col>
                <Col className={sUtils.pushedTopXs2} sm="5" lg="4">
                  <ResponsibleUser data={responsibleUserData.data} />
                </Col>
                <Col className={sUtils.pushedTopXs2} sm="5" lg="4">
                  {(isPreview || isNegotiation || details.linkKind !== 'client_lead') &&
                    <Contact id={contactId} data={contactData.data} />}
                  {!isPreview &&
                    !isNegotiation &&
                    details.linkKind === 'client_lead' &&
                    <Contact id={clientLeadContactData.contactId} data={clientLeadContactData} />}
                </Col>
                <Col className={sUtils.pushedTopXs2} sm="5" lg="8">
                  {details.goal &&
                    <ParamList label="Цель">
                      <Text truncate={108} ellipsis>
                        {details.goal}
                      </Text>
                    </ParamList>}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Link>
  );
};
