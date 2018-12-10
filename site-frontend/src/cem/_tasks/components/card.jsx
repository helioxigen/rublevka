import React, { Component } from 'react';
import { Link } from 'react-router';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  // Image,
  Icon,
  Grid: { Container, Row, Col },
} = UI;

import { FormattedDate } from 'react-formatted';

import s from 'cem/styles/dashboard/taskCard';
import sUtils from 'cem/styles/utils';
import sTypo from 'cem/styles/typography';

import * as tasksDict from 'cem/constants/tasks/dictionaries';

// const Contact = ({ photo = {}, details = {} }) => (
//   <div className={s.mediaContainer}>
//       <Image src={!!photo.url ? `${photo.url}-64` : require(`url-loader!cem/assets/placeholder-photo`)} kind="circle" width="42" height="42" />
//       <div className={s.mediaDescription}>
//         <p className={s.mediaText}>{details.firstName} {details.lastName || ``}</p>
//         <p className={s.mediaText}>{details.phoneNumber}</p>
//       </div>
//   </div>
// );

class Card extends Component {
  render() {
    const {
      // state,
      task = {},
      // task: {
        // contactDetails = {}, previewDetails = {}, freeDetails = {}, negotiationDetails = {},
      // } = {},
    } = this.props;

    // const contactId = contactDetails.contactId || previewDetails.contactId || freeDetails.contactId || negotiationDetails.contactId;
    // const clientLeadId = contactDetails.clientLeadId || freeDetails.clientLeadId;

    // const contactData = state.contacts[contactId] || {};
    // const { task: clientLeadData = {} } = state.leads[clientLeadId] || {};

    const { style } = tasksDict.states[task.state] || {};
    const { title } = tasksDict.kinds[task.kind] || {};

    return (
      <Link to={`/tasks/${task.id}`} className={s.card}>
        <Container fluid>
          <Row sm="middle">
            <Col sm="3" md="2" className={cn(s.textMd, sTypo[style])}>
              {title}
            </Col>
            <Col sm="4" md="3" className={cn(s.textMd, sUtils.pushedTopXs2)}>
              <FormattedDate value={task.deadline} mask="dd.mm HH:MM" />
            </Col>
            <Col sm="8" md="10" className={sUtils.pushedTopXs2}>
              {/* <Contact photo={contactData.photo || {}} details={contactData.details || clientLeadData.contactDetails} /> */}
            </Col>
            <Col sm="5" className={cn(sUtils.textRight, sUtils.pushedTopXs2, sTypo[style])}>
              <span className={s.textMd}>ID: {task.id}</span>
              <Icon className={s.icon} icon="chevron-down" />
            </Col>
          </Row>
        </Container>
      </Link>
    );
  }
}

export default Card;
