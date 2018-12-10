import React, { Component } from 'react';

import { connect } from 'react-redux';

import { cloudfront } from 'core/config/resources';

import * as dict from 'cem/constants/tasks/dictionaries';

import { FormattedDate } from 'react-formatted';

import Property from 'cem/components/common/property/listItem';

import UI from 'cem/components/ui';
const {
  Button, Media, Heading,
  Modal,
  RetinaImage,
  Grid: { Row, Col },
} = UI;

import ResultForm from 'cem/components/tasks/id/resultForm';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import { fields as formFields } from 'cem/constants/tasks/form';

const ResponsibleUserPhoto = ({ id }) => (
  <RetinaImage size={128} src={id ? `${cloudfront}/${id}-thumbnail` : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg'} className={cn(!id && s.placeholder)} style={{ borderRadius: `50%` }} width="64" height="64" />
);

const ResponsibleUserDescription = (props) => (
  <div>
    <h4 className={s.mediaTitleLg}>{`${props.firstName || ``} ${props.lastName || ``}`}</h4>
    <div><a className={s.mediaText} href={`tel:${props.workPhoneNumber}`}>{props.workPhoneNumber}</a></div>
    <div><a className={s.mediaText} href={`mailto:${props.email}`}>{props.email}</a></div>
  </div>
);

const ResponsibleUser = ({ data }) => (
  <section>
    <Heading size="md">Ответственный</Heading>
    <Media left={<ResponsibleUserPhoto id={data.photo && data.photo.id} />} body={<ResponsibleUserDescription {...data} />} />
  </section>
);

const getDetails = data => {
  const namedDetailsKinds = [`free`, `preview`, `negotiation`];

  if (namedDetailsKinds.indexOf(data.kind) > -1) {
    return data[`${data.kind}Details`];
  } else {
    return data.contactDetails;
  }
};

class TaskCard extends Component {
  state = {
    openedModalName: null,
  }
  openModal(name) {
    this.setState({
      openedModalName: name,
    });
  }

  closeAllModals() {
    this.setState({
      openedModalName: null,
    });
  }

  handleDoneButtonClick() {
    this.openModal(`done`);
  }

  handleCancelButtonClick() {
    this.openModal(`cancel`);
  }

  render() {
    const { actions, data: deprecatedData, id, userData: deprecatedUserData, state, propertyCardHidden } = this.props;

    if (deprecatedData) {
      console.warn(`prop data is deprecated, pass id instead`); // eslint-disable-line no-console
    }

    if (deprecatedUserData) {
      console.warn(`prop userData is deprecated, pass taskId instead`); // eslint-disable-line no-console
    }

    const data = deprecatedData || state._tasks[id].data || {};
    const { stateDetails = {}, responsibleUser = {} } = data;

    const details = getDetails(data);

    const userData = state._users[responsibleUser.id] || {};
    const uData = deprecatedUserData || userData.data || {};

    return (
      <Row>
        <Col sm="4" md="2" className={sUtils.textRight}>
          <p>
            <time>
              <FormattedDate mask="dd.mm.yyyy HH:MM" value={data.deadline} />
            </time>
          </p>
        </Col>
        <Col sm="16" md="18">
          <div className={s.taskWrapper}>
            <Row className={s.taskHeader}>
              <Col xs="20">
                <Heading size="lg" style={{ display: `inline-block` }}>{dict.kinds[data.kind].title}</Heading>
                <Heading size="md" style={{ display: `inline-block`, marginLeft: `1.5rem` }}><span className={s[dict.states[data.state].style]}>{dict.states[data.state].title}</span></Heading>
              </Col>
            </Row>
            <div className={s.positionTopRight}>
              {data.state === `to_do` && !stateDetails.toApprove && <Button size="xs" kind="accent" className={sUtils.pushedRight1} onClick={::this.handleDoneButtonClick}>Выполнить</Button>}
              {data.state === `to_do` && !stateDetails.toApprove && <Button size="xs" kind="danger" className={sUtils.pushedRight1} onClick={::this.handleCancelButtonClick}>Отменить</Button>}
              <Button to={`/tasks/${data.id}`} size="xs">Подробнее</Button>
            </div>
            {data.kind !== `preview` && data.kind !== `negotiation` &&
              <Row>
                <Col sm="10">
                  <dl className={s.taskList}>
                    <dt><Heading size="md" className={s.taskTitle}>Цель</Heading></dt>
                    <dd className={s.taskDescription}>{details.goal}</dd>
                  </dl>
                </Col>
              </Row>
            }
            {data.state !== `to_do` &&
              <Row>
                <Col sm="10">
                  <dl className={s.taskList}>
                    <dt><Heading size="md" className={s.taskTitle}>Результат</Heading></dt>
                    <dd className={s.taskDescription}>{data.result || `—`}</dd>
                  </dl>
                </Col>
              </Row>
            }
            {(data.kind === `negotiation` || data.kind === `preview`) && !propertyCardHidden && !!details.propertyId &&
              <Row>
                <Col sm="15" className={sUtils.pushedBottom3}>
                  <section>
                    <Heading size="md">Объект</Heading>
                    <Media body={<Property isPreview id={details.propertyId} resourcePath={`/v1/properties/${details.propertyCategory}`} isStatic />} />
                  </section>
                </Col>
              </Row>
            }
            <Row>
              <Col sm="15">
                <ResponsibleUser data={uData} />
              </Col>
            </Row>
          </div>
        </Col>
        <Modal size="sm" closeOnEsc closeOnOutsideClick onClose={::this.closeAllModals} isOpened={this.state.openedModalName === `done`} closePortal={::this.closeAllModals}>
          <ResultForm taskId={data.id} status="done" fields={formFields} data={data} actions={actions} onSubmitResult={::this.closeAllModals} isTimeline />
        </Modal>
        <Modal size="sm" closeOnEsc closeOnOutsideClick onClose={::this.closeAllModals} isOpened={this.state.openedModalName === `cancel`} closePortal={::this.closeAllModals}>
          <ResultForm taskId={data.id} status="cancel" fields={formFields} data={data} actions={actions} onSubmitResult={::this.closeAllModals} isTimeline />
        </Modal>
      </Row>
    );
  }
}

const pickState = ({ _users, _tasks }) => ({
  state: { _users, _tasks },
});

export default connect(pickState)(TaskCard);
