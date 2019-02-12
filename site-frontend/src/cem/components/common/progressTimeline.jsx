import React, { Component } from 'react';
import moment from 'moment';
moment.locale('ru');

import cn from 'classnames';
import s from 'cem/styles/components/timeline';

import { calculateTimeDiff } from 'core/helpers';

const TimelineStage = props => (
  <li className={s.item}>
    <p className={s.text}>{props.title}</p>
    <div className={s.slider}>
      <div className={cn(s.handler, s[props.circleColor])} />
      {!props.isInitial && <div className={cn(s.bar, s[props.sliderColor])} />}
    </div>
    <p className={s.text}>{props.duration}</p>
  </li>
);

class Timeline extends Component {
  getDurations() {
    const { createdAt, settings, stateDetails = {} } = this.props;
    const { changes = [] } = stateDetails;
    const durations = {};

    const changesWithFirstStep = [
      { state: [settings.stages[0].id], eventAt: createdAt },
      ...changes,
    ];

    changesWithFirstStep.map((item, index) => {
      const prevDuration = durations[item.state] || 0;
      const nextItem = changesWithFirstStep[index + 1] || {};
      const nextDuration = calculateTimeDiff(item.eventAt, nextItem.eventAt);
      const newDuration = prevDuration + nextDuration;
      durations[item.state] = newDuration;
    });
    Object.keys(durations).map(
      key => (durations[key] = moment.duration(durations[key]).humanize()),
    );

    return durations;
  }

  getLastActive() {
    const { settings, state, stateDetails = {} } = this.props;
    const { changes = [] } = stateDetails;
    const states = changes.map(item => item.state);
    const lastState = states[states.length - 1];
    const nextToLastState = states[states.length - 2];

    return settings.rejectionStates.indexOf(state) === -1
      ? lastState
      : nextToLastState;
  }

  isFinal(state) {
    const { settings } = this.props;
    const stages = settings.stages.map(stage => stage.id);

    return stages.indexOf(state) === stages.length - 1;
  }

  isLastActive(state) {
    return state === this.getLastActive();
  }

  getActiveStages() {
    const { settings } = this.props;
    const order = settings.stages.map(stage => stage.id);
    const lastActive = this.getLastActive();
    const currentStateIndex = order.indexOf(lastActive);

    return order.filter((stage, index) => index <= currentStateIndex);
  }

  render() {
    const {
      className,
      settings,
      state,
      stateDetails: { toApprove } = {},
    } = this.props;
    const durations = this.getDurations();
    const activeStages = this.getActiveStages();

    return (
      <div className={s.container}>
        <ul className={cn(s.flex, className)}>
          {settings.stages.map((stage, index) => {
            const isUnsuccessful =
              settings.rejectionStates.indexOf(toApprove) > -1 ||
              settings.rejectionStates.indexOf(state) > -1;
            const isActive = activeStages.indexOf(stage.id) > -1;
            const isLastActive = this.isLastActive(stage.id);
            const isFinal = this.isFinal(stage.id);

            return (
              <TimelineStage
                key={index}
                title={stage.title}
                isInitial={!index}
                circleColor={
                  isActive &&
                  ((isLastActive && isUnsuccessful && 'danger') || 'success')
                }
                sliderColor={isActive && 'success'}
                duration={!isFinal ? durations[stage.id] : ''}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Timeline;
