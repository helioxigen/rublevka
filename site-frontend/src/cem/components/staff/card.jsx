import React from 'react';
import { Link } from 'react-router';

import { cloudfront } from 'core/config/resources';

import cn from 'classnames';
import UI from 'cem/components/ui';
const { Media, ParamList, Grid: { Container, Row, Col } } = UI;

import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';

const Image = ({ photo }) =>
  photo
    ? <UI.Image src={`${cloudfront}/${photo.id}-128`} kind="circle" width="64" height="64" />
    : <UI.Image
      src={'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'}
      className={s.placeholder}
      kind="circle"
      width="64"
      height="64"
    />;

const Description = ({ user }) =>
  (<div>
    <h2 className={s.fullName}>
      {user.lastName} {user.firstName} {user.middleName}
    </h2>
    {user.details &&
      user.details.roleName &&
      <p className={s.position}>
        {user.details.roleName}
      </p>}
  </div>);

const states = {
  active: 'success',
  inactive: 'danger',
  invited: 'primary',
};

export default ({ user }) =>
  (<Link to={`/staff/${user.id}`} className={cn(s.card, s[states[user.state]])}>
    <div className={s.cardWrapper}>
      <Container fluid className={s.flex}>
        <Row>
          <Col sm="16">
            <Media left={<Image photo={user.photo} />} body={<Description user={user} />} />
          </Col>
        </Row>
        <Row>
          <Col className={sUtils.pushedTopXs2} sm="2" md="1">
            <ParamList label="ID">
              {user.id}
            </ParamList>
          </Col>
          {user.details &&
            user.details.departmentName &&
            <Col className={sUtils.pushedTopXs2} sm="10" md="6">
              <ParamList label="Департамент">
                {user.details.departmentName}
              </ParamList>
            </Col>}
          {user.details &&
            user.details.divisionName &&
            <Col className={sUtils.pushedTopXs2} sm="8" md="6">
              <ParamList label="Отдел">
                {user.details.divisionName}
              </ParamList>
            </Col>}
          {/* <Col sm="4">
            <ParamList label="Руководитель">Оськин Александр</ParamList>
          </Col> */}
        </Row>
      </Container>
    </div>
  </Link>);
