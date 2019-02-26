import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import formSettings from 'cem/constants/requests/remove/form';

import UI from 'cem/components/ui';
const {
  Button,
  Back,
  Icon,
  Form,
  Grid,
  Heading,
  Grid: { Row, Col },
} = UI;

import RequestDetails from './requestDetails';
import StateControls from './stateControls';

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class Header extends Component {
  createOrUpdate() {
    const { formKey, values, actions, propertyId } = this.props;

    if (formKey === `create`) {
      return actions
        .createRemovalRequest({ ...values, propertyId: Number(propertyId) })
        .then(({ id }) =>
          actions.pushPath(`/requests/properties/to_remove/${id}`),
        );
    }
    if (formKey !== `create`) {
      return actions
        .updateRemovalRequest(formKey, values)
        .then(() => actions.loadRemovalRequest(formKey));
    }
  }

  changeState(state, data) {
    const { formKey } = this.props;

    this.props.actions.changeState(formKey, state, data);
  }

  render() {
    const {
      values,
      formKey,
      handleSubmit,
      pristine,
      submitting,
      error,
      data,
      isCurrentUserSupervisor,
      isCurrentUserChief,
    } = this.props;

    return (
      <header className={s.header}>
        <Form.Container onSubmit={handleSubmit(::this.createOrUpdate)}>
          <Grid.Container fluid>
            <Row>
              <Col xs="20" className={sUtils.positionRelative}>
                <Heading size="lg">
                  <Back
                    button={
                      <Button type="button" className={sButton.btnBack}>
                        <Icon className={s.iconBack} icon="arrow-right" />
                      </Button>
                    }
                  />
                  {formKey !== `create`
                    ? `Заявка (ID: ${formKey})`
                    : `Создать заявку`}
                </Heading>
              </Col>
            </Row>
            <div className={cn(sUtils.extraPadding, sUtils.pushedBottom2)}>
              <Row>
                <Col md="18" lg="14" mdOffset="2" lgOffset="4">
                  <RequestDetails {...this.props} />
                </Col>
              </Row>
              {data && (
                <StateControls
                  state={data.state}
                  values={values}
                  changeState={::this.changeState}
                  isCurrentUserSupervisor={isCurrentUserSupervisor}
                  isCurrentUserChief={isCurrentUserChief}
                />
              )}
              {/* data && formKey !== `create` && <Timeline className={sTimeline.maxWidth83} settings={timelineSettings} {...data} /> */}
              {/* data && formKey !== `create` && <ManagerControls data={data} /> */}
              {data && data.stateDetails.reason && (
                <Row>
                  <Col md="18" lg="14" mdOffset="2" lgOffset="4">
                    <Row>
                      <Col sm="10" smOffset="1">
                        <Heading size="sm">Причина:</Heading>
                        <p className={sUtils.pushedTop_5}>
                          {data.stateDetails.reason}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
            </div>
          </Grid.Container>
          <Button
            className={cn(
              sButton.btnFixedBottom,
              formKey !== `create` && pristine && sUtils.hidden,
            )}
            disabled={error || submitting}
            type="submit"
            kind={formKey === `create` ? `success` : `warning`}
            size="md"
            block
          >
            {formKey === `create` ? `Создать` : `Сохранить`}
          </Button>
        </Form.Container>
      </header>
    );
  }
}

export default reduxForm(formSettings)(submitValidator()(Header));
