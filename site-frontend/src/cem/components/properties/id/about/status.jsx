import React, { Component } from 'react';
import { FormattedDate } from 'react-formatted';
import isEqual from 'lodash/isEqual';
import { Link } from 'react-router';

import UI from 'cem/components/ui';
const { Media, Icon, Heading, Form: { Group, Label, Static }, Grid: { Row, Col } } = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

const Image = props =>
  (<UI.Image
    src={
      props.src
        ? `${props.src}-128`
        : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'
    }
    kind="circle"
    width="94"
    height="94"
    title=""
    alt=""
  />);

const Description = props =>
  (<div className={s.mediaContainer}>
    <h4 className={s.mediaTitleLg}>{`${props.firstName} ${props.lastName}`}</h4>
    <p className={s.mediaText}>
      {props.workPhoneNumber}
    </p>
    <p className={s.mediaText}>
      {props.email}
    </p>
  </div>);

export default class extends Component {
  componentWillMount() {
    const { data = {} } = this.props;
    if (data.clientLeadId) this.props.actions.loadLead(data.clientLeadId);
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.id !== nextProps.data.id || !isEqual(this.props.data, nextProps.data)) {
      this.load(nextProps);
    }
  }

  load(props) {
    const { createdByUserId, updatedByUserId, responsibleUser, clientLeadId } = props.data || {};
    const { actions } = props;

    if (createdByUserId) actions.loadUser(createdByUserId);
    if (updatedByUserId) actions.loadUser(updatedByUserId);
    if (responsibleUser && responsibleUser.id) actions.loadUser(responsibleUser.id);
    if (clientLeadId) actions.loadLead(clientLeadId);
  }

  render() {
    const { data = {} } = this.props;
    const { createdByUserId, updatedByUserId, responsibleUser = {}, clientLeadId } = data;

    const createdByUser = this.props.state.users[createdByUserId];
    const updatedByUser = this.props.state.users[updatedByUserId];
    const responsibleUserData = this.props.state.users[responsibleUser.id];
    const lead = this.props.state.leads[clientLeadId];
    const { photo = {} } = responsibleUserData ? responsibleUserData.data : {};

    return (
      <section className={this.props.className}>
        <Row className={sUtils.pushedBottom6}>
          {responsibleUserData &&
            responsibleUserData.data &&
            <Col sm="10">
              <Row>
                <Col sm="20">
                  <Heading size="md">Ответственный</Heading>
                </Col>
              </Row>
              <Row>
                <Col lg="16">
                  <Media
                    left={<Image src={photo.url} />}
                    body={<Description {...responsibleUserData.data} />}
                  />
                </Col>
              </Row>
            </Col>}
          {lead &&
            <Col className={sUtils.pushedTopXs4} sm="10">
              <Heading size="md">
                Источник
                <Link className={s.linkIcon} to={`/client_leads/${lead.data.kind}/${lead.data.id}`}>
                  <Icon className={s.icon} icon="arrow" />
                </Link>
              </Heading>
              <Row className={sUtils.pushedTop2_7}>
                <Col xs="20">
                  <h4 className={s.heading}>Рекомендация на продажу</h4>
                  <p className={s.description}>
                    {lead.data &&
                      <FormattedDate mask="dd.mm.yy HH:MM" value={lead.data.createdAt} />}
                  </p>
                  <p className={s.description}>
                    {lead.data && lead.data.contactDetails.firstName}&nbsp;{lead.data && lead.data.contactDetails.lastName}
                  </p>
                </Col>
              </Row>
            </Col>}
        </Row>

        <Row>
          {createdByUser &&
            <Col sm="10">
              <Heading size="md">Создан</Heading>
              <Group>
                <Label block>Дата создания</Label>
                <Static>
                  <FormattedDate value={data.createdAt} mask="dd.mm.yyyy HH:MM" />
                </Static>
              </Group>
              <Group className={sUtils.resetIndentation}>
                <Label block>Создал</Label>
                <Static>
                  {createdByUser.data.firstName} {createdByUser.data.lastName}
                </Static>
              </Group>
            </Col>}

          {updatedByUser &&
            <Col className={sUtils.pushedTopXs4} sm="10">
              <Heading size="md">Изменен</Heading>
              <Group>
                <Label block>Дата изменения</Label>
                <Static>
                  <FormattedDate value={data.updatedAt} mask="dd.mm.yyyy HH:MM" />
                </Static>
              </Group>
              <Group className={sUtils.resetIndentation}>
                <Label block>Изменил</Label>
                <Static>
                  {updatedByUser.data.firstName} {updatedByUser.data.lastName}
                </Static>
              </Group>
            </Col>}
        </Row>
      </section>
    );
  }
}
