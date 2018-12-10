import React, { Component } from 'react';
import { Link } from 'react-router';

import cn from 'classnames';
import UI from 'cem/components/ui';
const { Image, Icon, Grid: { Container, Row, Col } } = UI;

import s from 'cem/styles/dashboard/taskCard';
import sUtils from 'cem/styles/utils';

import * as dict from 'cem/constants/leads/dictionaries';

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
      {!details.firstName &&
        !details.lastName &&
        !details.phoneNumber &&
        <p className={s.mediaText}>Данные не указаны</p>}
      {(details.firstName || details.lastName || details.phoneNumber) &&
        <p className={s.mediaText}>
          {details.firstName} {details.lastName || ''}
        </p>}
      {(details.firstName || details.lastName || details.phoneNumber) &&
        <p className={s.mediaText}>
          {details.phoneNumber}
        </p>}
    </div>
  </div>);

class Card extends Component {
  render() {
    const { data = {}, data: { requestDetails = {} } = {} } = this.props;

    // const { title, style } = dict.states[data.state];

    const isToApprove = !!data.stateDetails.toApprove;
    const isArchive = data.state === 'rejected' || data.state === 'processed';
    const isSpam = data.state === 'spam';
    const isNew = data.state === 'new';
    const isActive = !isToApprove && !isArchive && !isSpam && !isNew;

    return (
      <Link to={`/client_leads/${data.kind}/${data.id}`} className={s.card}>
        <Container fluid>
          <Row sm="middle">
            {/* <pre>{JSON.stringify(data, null, 2)}</pre>*/}
            <Col sm={4} lg={3} className={s.textMd}>
              {!!dict.leadKinds[data.kind] && dict.leadKinds[data.kind].title}
              <br />
              <span className={cn(sUtils.textGrey, sUtils.pushedTopXs2)}>
                {!!dict.requestKinds[requestDetails.requestKind] &&
                  dict.requestKinds[requestDetails.requestKind].title}
              </span>
            </Col>
            {/* <Col sm={4} lg={3} className={cn(s.textMd, s[style])}>
              {title}
            </Col> */}
            <Col sm={10} lg={12} className={sUtils.pushedTopXs2}>
              <Contact details={data.contactDetails} />
            </Col>
            <Col sm={2} className={cn(sUtils.textRight, s.textMd)}>
              {(!isActive || !isArchive) &&
                data.tasks &&
                <span>
                  <span className={s.primary}>{data.tasks.toDo}</span>
                  &nbsp;/&nbsp;
                  <span className={s.success}>{data.tasks.done}</span>
                </span>}
            </Col>
            <Col sm={4} lg={3} className={cn(sUtils.textRight, sUtils.pushedTopXs2)}>
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
