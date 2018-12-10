import React, { Component } from 'react';
import { Link } from 'react-router';

import cn from 'classnames';
import UI from 'cem/components/ui';
const { Image, Icon, Grid: { Container, Row, Col } } = UI;

import { FormattedDate } from 'react-formatted';

import s from 'cem/styles/dashboard/taskCard';
import sUtils from 'cem/styles/utils';

import * as tasksDict from 'cem/constants/tasks/dictionaries';

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

class Card extends Component {
  render() {
    const {
      state,
      data = {},
      data: {
        contactDetails = {},
        previewDetails = {},
        freeDetails = {},
        negotiationDetails = {},
      } = {},
    } = this.props;

    const contactId =
      contactDetails.contactId ||
      previewDetails.contactId ||
      freeDetails.contactId ||
      negotiationDetails.contactId;
    const clientLeadId = contactDetails.clientLeadId || freeDetails.clientLeadId;

    const contactData = state.contacts[contactId] || {};
    const { data: clientLeadData = {} } = state.leads[clientLeadId] || {};

    return (
      <Link to={`/tasks/${data.id}`} className={s.card}>
        <Container fluid>
          <Row sm="middle">
            <Col sm="3" md="2" className={s.textMd}>
              {!!tasksDict.kinds[data.kind] && tasksDict.kinds[data.kind].title}
            </Col>
            <Col sm="4" md="3" className={cn(s.textMd, sUtils.pushedTopXs2)}>
              <FormattedDate value={data.deadline} mask="dd.mm HH:MM" />
            </Col>
            <Col sm="8" md="10" className={sUtils.pushedTopXs2}>
              <Contact
                photo={contactData.photo || {}}
                details={contactData.details || clientLeadData.contactDetails}
              />
            </Col>
            <Col sm="5" className={cn(sUtils.textRight, sUtils.pushedTopXs2)}>
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
