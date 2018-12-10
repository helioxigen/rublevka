import React, { Component } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import moment from 'moment';

// actions
import { dispatch } from 'cem/store';
import { pop } from 'cem/actions/toastr';

// components
// import StateControlModal from 'cem/_tasks/show/stateControlModal';
import UserInlineCard from 'cem/_users/inlineCard';
import Property from 'cem/components/common/property/listItem';

// ui
import UI from 'cem/components/ui';
const {
  // Button,
  Heading,
  Grid: { Row, Col },
  Icon,
  StaticDictionary,
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

// constants
import * as dict from 'cem/_tasks/constants/dictionaries';

// helpers
import { getDetails } from 'cem/_tasks/helpers';
import { fetchDictionary } from 'cem/helpers/autocomplete';

class TaskCard extends Component {
  state = {
    isOpened: false,
    toState: undefined,
  }

  onSuccess() {
    dispatch(pop(`success`, `Задача обновлена`));
  }

  toggle(isOpened = !this.state.isOpened, toState) {
    this.setState({
      isOpened,
      toState,
    });
  }

  close() {
    this.toggle(false);
  }

  open(toState) {
    this.toggle(true, toState);
  }

  render() {
    const { task, propertyCardHidden } = this.props;
    const { data = {} } = task;
    const { stateDetails = {}, responsibleUser = {} } = data;

    const stateDict = dict.states[data.state] || {};
    const kindDict = dict.kinds[data.kind] || {};

    // const isKindPreview = data.kind === `preview`;
    const isClosed = data.state === `done` || data.state === `canceled`;
    // const hasStateToApprove = !!stateDetails.toApprove;

    const details = getDetails(data);

    return (
      <Row>
        <Col sm="4" md="2" className={sUtils.textRight}>
          <p>
            <time>
              {moment(data._deadline.date).format(`D MMM HH:mm, ddd`)}
            </time>
          </p>
        </Col>
        <Col sm="16" md="18">
          <div className={s.taskWrapper}>
            <Row className={s.taskHeader}>
              <Col xs="20">
                <Heading size="md" style={{ display: `inline-block` }} className={s[stateDict.style]}>
                  {kindDict.title}

                  <Link to={`/tasks/${data.id}`} className={s.linkIcon}>
                    <Icon className={s.icon} icon="arrow" />
                  </Link>
                </Heading>
              </Col>
            </Row>
            {/* <div className={s.positionTopRight}>
              {!isClosed && !hasStateToApprove && !isKindPreview && (
                <Button size="sm" kind="success" onClick={() => this.open(`done`)} className={sUtils.pushedRight1}>
                  выполнить
                </Button>
              )}
              {!isClosed && !hasStateToApprove && !isKindPreview && (
                <Button size="sm" kind="danger" onClick={() => this.open(`cancel`)} className={sUtils.pushedRight1}>
                  отменить
                </Button>
              )}
            </div> */}
            {data.kind !== `preview` && data.kind !== `negotiation` && (
              <Row>
                <Col xs="20">
                  <dl className={s.taskList}>
                    <dt>
                      <Heading size="sm" className={s.taskTitle}>
                        Цель
                      </Heading>
                    </dt>
                    <dd className={s.taskDescription}>
                      {details.goal}
                      {details.goalId && (
                        <StaticDictionary fetch={fetchDictionary()} value={details.goalId} />
                      )}
                    </dd>
                  </dl>
                </Col>
              </Row>
            )}
            {isClosed && (
              <Row>
                <Col xs="20">
                  <dl className={s.taskList}>
                    <dt>
                      <Heading size="sm" className={s.taskTitle}>
                        Результат
                      </Heading>
                    </dt>
                    <dd className={s.taskDescription}>
                      {data.result}
                      {data.resultId && (
                        <StaticDictionary fetch={fetchDictionary()} value={data.resultId} />
                      )}
                    </dd>
                  </dl>
                </Col>
              </Row>
            )}
            {(data.kind === `negotiation`) && !propertyCardHidden && !!details.propertyId && (
              <Row>
                <Col sm="15" className={sUtils.pushedBottom3}>
                  <section>
                    <Heading size="sm">
                      Объект
                    </Heading>
                    <Property isPreview id={details.propertyId} resourcePath={`/v1/properties/${details.propertyCategory}`} />
                  </section>
                </Col>
              </Row>
            )}
            <Row>
              <Col sm="15">
                <UserInlineCard headingSize="sm" id={responsibleUser.id} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}

const pickState = ({ _tasks }, { taskId }) => ({
  task: _tasks[taskId] || {},
});

export default connect(pickState)(TaskCard);
