import React from 'react';

import { Link } from 'react-router';

import UI from 'cem/components/ui';
const {
  ParamList,
  Grid: { Container, Row, Col },
} = UI;
import { FormattedDate, FormattedCurrency } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';

import { states } from 'cem/constants/deals/dictionaries';
import { offerKinds } from 'cem/constants/properties/dictionaries';

export default ({ data = {}, contacts }) => {
  const linkedContactData = data.contactDetails && contacts[data.contactDetails.id] && contacts[data.contactDetails.id].data || {};

  return (
    <Link to={`/deals/${data.id}`} className={cn(s.card, s[states[data.state].style])}>
      <div className={s.cardWrapper}>
        <Container fluid className={s.flex}>
          <Row>
            <Col sm="3" lg="2">
              <ParamList label="Тип" big>{offerKinds[data.details.offerKind]}</ParamList>
            </Col>
            <Col className={sUtils.pushedTopXs2} sm="4" lg="3">
              <ParamList label="Бюджет сделки" big>
                <FormattedCurrency symbol={data.details.currency} value={data.details.budget} />
              </ParamList>
            </Col>
            <Col className={sUtils.pushedTopXs2} sm="6" lg="3">
              <ParamList label="Комиссия по сделке" big>
                {data.details.expectedAgentFee && <FormattedCurrency symbol={data.details.currency} value={parseInt(data.details.budget * data.details.expectedAgentFee / 100, 10)} />}
                {data.details.expectedAgentFee && data.details.expectedAgentFixedPrice && ' / '}
                {data.details.expectedAgentFixedPrice && data.details.expectedAgentFixedPrice.price && <FormattedCurrency symbol={data.details.expectedAgentFixedPrice.currency} value={data.details.expectedAgentFixedPrice.price} />}
              </ParamList>
            </Col>
          </Row>
          <Row>
            <Col className={sUtils.pushedTopXs2} sm="2" lg="2">
              <ParamList label="ID">{data.id}</ParamList>
            </Col>
            <Col className={sUtils.pushedTopXs2} sm="4" lg="3">
              <ParamList label="Клиент">{linkedContactData.details && `${linkedContactData.details.firstName || ''} ${linkedContactData.details.lastName || ''}`}</ParamList>
            </Col>
            <Col className={sUtils.pushedTopXs2} sm="4" lg="3">
              <ParamList label="Телефон">{linkedContactData.details && linkedContactData.details.phoneNumber}</ParamList>
            </Col>
            <Col className={sUtils.pushedTopXs2} sm="4" lg="3">
              <ParamList label="Дата начала">
                <FormattedDate mask="dd.mm.yyyy" value={data.details.createdAt} />
              </ParamList>
            </Col>
            <Col className={sUtils.pushedTopXs2} sm="4" lg="3">
              <ParamList label="Дата завершения">
                <FormattedDate mask="dd.mm.yyyy" value={data.details.expectedFinishDateAt} />
              </ParamList>
            </Col>
          </Row>
        </Container>
      </div>
    </Link>
  );
};
