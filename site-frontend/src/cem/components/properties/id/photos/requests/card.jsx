import React, { Component } from 'react';
import { Link } from 'react-router';

import { cloudfront } from 'core/config/resources';

import { FormattedDate } from 'react-formatted';

import UI from 'cem/components/ui';
const {
  Icon,
  Image,
  Grid: { Container, Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/ui/card2';
import sUtils from 'cem/styles/utils';

import { states } from 'cem/constants/requests/images/dictionaries';

const User = ({
  data: { photo = {}, firstName, lastName, workPhoneNumber },
}) => (
  <div className={s.mediaContainer}>
    <Image
      src={
        photo.id
          ? `${cloudfront}/${photo.id}-128`
          : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
      }
      kind="circle"
      width="42"
      height="42"
    />
    <div className={s.mediaDescription}>
      <p className={s.mediaText}>
        {firstName} {lastName}
      </p>
      <p className={s.mediaText}>{workPhoneNumber}</p>
    </div>
  </div>
);

class Card extends Component {
  render() {
    const {
      data: { state, id, createdAt, responsibleUserId },
      createdByUserData = {},
      responsibleUserData = {},
    } = this.props;

    return (
      <Link to={`/requests/properties/images/${id}`} className={s.card}>
        <Container fluid>
          <Row sm="middle">
            <Col sm="5">
              <span className={s.textMd}>
                <FormattedDate mask="dd.mm.yyyy HH:MM" value={createdAt} />
              </span>
            </Col>
            <Col sm="5">
              <User data={createdByUserData} />
            </Col>
            <Col sm="5">
              {!!responsibleUserId && <User data={responsibleUserData} />}
            </Col>
            <Col sm="5" className={cn(sUtils.textRight, sUtils.pushedTopXs2)}>
              <span className={cn(s.textMd, s[states[state].style])}>
                ID: {id}
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
