import React, { Component } from 'react';

import UI from 'cem/components/ui';
const { Media, Heading, Grid: { Row, Col } } = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

const Image = ({ photo = {} }) =>
  (<UI.Image
    src={
      photo.url
        ? `${photo.url}-128`
        : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
    }
    kind="circle"
    width="70"
    height="70"
    title=""
    alt=""
  />);

const Description = props =>
  (<div>
    <h4 className={s.heading}>
      {props.user.data.firstName} {props.user.data.lastName}
    </h4>
    <p className={s.description}>
      {props.user.data.workPhoneNumber}
    </p>
    <p className={s.description}>
      {props.user.data.email}
    </p>
  </div>);

class Status extends Component {
  componentWillMount() {
    const { data, actions } = this.props;
    if (data.createdByUser) actions.loadUser(data.createdByUser.id);
    if (data.responsibleUser) actions.loadUser(data.responsibleUser.id);
  }

  componentWillReceiveProps(nextProps) {
    const { data, actions } = this.props;

    if (
      data.createdByUser &&
      nextProps.data.createdByUser &&
      data.createdByUser.id !== nextProps.data.createdByUser.id
    ) {
      actions.loadUser(nextProps.data.createdByUser.id);
    }

    if (
      data.responsibleUser &&
      nextProps.data.responsibleUser &&
      data.responsibleUser.id !== nextProps.data.responsibleUser.id
    ) {
      actions.loadUser(nextProps.data.responsibleUser.id);
    }
  }

  render() {
    const { state, data } = this.props;
    const createdByUserId = data.createdByUser && data.createdByUser.id;
    const createdByUser = state.users[createdByUserId] || {};

    const responsibleUserId = data.responsibleUser && data.responsibleUser.id;
    const responsibleUser = state.users[responsibleUserId] || {};

    return (
      <Row>
        {createdByUser.data &&
          <Col sm="10">
            <Heading size="md">Принял</Heading>
            <Media
              left={<Image photo={createdByUser.data.photo} />}
              body={<Description user={createdByUser} />}
            />
          </Col>}
        {responsibleUser.data &&
          <Col sm="10" className={sUtils.pushedTopXs4}>
            <Row>
              <Col xs="20">
                <Heading size="md">Ответственный</Heading>
              </Col>
            </Row>
            <Row>
              <Col xs="20">
                <Media
                  left={<Image photo={responsibleUser.data.photo} />}
                  body={<Description user={responsibleUser} />}
                />
              </Col>
            </Row>
          </Col>}
      </Row>
    );
  }
}

export default Status;
