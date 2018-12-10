import React, { Component } from 'react';
import { Link } from 'react-router';

import cn from 'classnames';
import UI from 'cem/components/ui';
const { Image, Icon, Grid: { Container, Row, Col } } = UI;

import { FormattedCurrency, FormattedDate } from 'react-formatted';

import s from 'cem/styles/dashboard/taskCard';
import sHeader from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';

import { offerKinds } from 'cem/constants/properties/dictionaries';
import { states } from 'cem/constants/deals/dictionaries';

const Contact = ({ photo = {}, details = {} }) =>
  (<div className={s.mediaContainer}>
    <Image
      src={
        photo.url
          ? `${photo.url}-64`
          : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
      }
      kind="circle"
      width="42"
      height="42"
    />
    <div className={s.mediaDescription}>
      <p className={s.mediaText}>
        {details.firstName} {details.lastName || ''}
      </p>
      <p className={s.mediaText}>
        {details.phoneNumber}
      </p>
    </div>
  </div>);

const AgentFee = ({ budget, currency, expectedAgentFee, expectedAgentFixedPrice }) => {
  if (expectedAgentFee) {
    const fee = Math.floor(budget / 100 * expectedAgentFee);
    return <FormattedCurrency symbol={currency} value={fee} />;
  } else if (expectedAgentFixedPrice) {
    return (
      <FormattedCurrency
        symbol={expectedAgentFixedPrice.currency}
        value={expectedAgentFixedPrice.price}
      />
    );
  }
  return <span>—</span>;
};

class Card extends Component {
  render() {
    const { state, data = {}, data: { contactDetails = {}, details = {} } = {} } = this.props;

    const contactData = state.contacts[contactDetails.id] || {};

    return (
      <Link to={`/deals/${data.id}`} className={s.card}>
        <Container fluid>
          <Row sm="middle">
            <Col sm="3" lg="2" className={s.textMd}>
              <span className={cn(sHeader[states[data.state] && states[data.state].style])}>
                {states[data.state] && states[data.state].title}
              </span>
            </Col>
            <Col sm="4" lg="3" className={cn(s.textMd, sUtils.pushedTopXs2)}>
              {offerKinds[data.details && data.details.offerKind]}
              <br />
              <AgentFee {...data.details} />
            </Col>
            <Col sm="5" lg="5" className={cn(s.textMd, sUtils.pushedTopXs2)}>
              <FormattedDate value={data.createdAt} mask="dd.mm.yyyy" />
              &nbsp;—&nbsp;
              <FormattedDate value={details.expectedFinishDateAt} mask="dd.mm.yyyy" />
            </Col>
            <Col sm="4" lg="6" className={sUtils.pushedTopXs2}>
              <Contact photo={contactData.photo} details={contactData.details} />
            </Col>
            <Col sm="4" className={cn(sUtils.textRight, sUtils.pushedTopXs2)}>
              <span className={s.textMd}>
                ID: {data.id}
              </span>
              <Icon className={s.icon} icon="chevron-down" />
            </Col>
          </Row>
        </Container>
      </Link>
    );
  }
}

export default Card;
