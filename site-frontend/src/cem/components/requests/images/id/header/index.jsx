import React, { Component } from 'react';

import * as types from 'cem/constants/requests/images/actions';
import submitValidator from 'core/decorators/submitValidator';

import { reduxForm } from 'redux-form';
import { formSettings } from 'cem/constants/requests/images/form';
import { settings as timelineSettings } from 'cem/constants/requests/images/timeline';

import cn from 'classnames';
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
import Timeline from 'cem/components/common/progressTimeline';
import StateControls from './stateControls';
import ManagerControls from './managerControls';

import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class Header extends Component {
  onSubmitSuccess({ id, type: actionType }) {
    const { actions, resetForm } = this.props;

    actions.loadImageRequest(id).then(() => {
      if (actionType === types.CREATE_IMAGES_REQUEST_SUCCESS) {
        actions.pop(`success`, `Заявка создана!`);
        actions.pushPath(`/requests/properties/images/${id}`);
      } else if (actionType === types.UPDATE_IMAGES_REQUEST_SUCCESS) {
        actions.pop(`success`, `Заявка обновлена!`);
        resetForm();
      }
    });
  }

  createOrUpdate() {
    const { formKey, values, actions, location } = this.props;
    if (formKey === `create`) {
      const data = {
        ...values,
        kind: location.query.kind,
        objectKlass: location.query.objectKlass,
        objectId: Number(location.query.objectId),
        images: undefined,
      };

      return actions.createImageRequest(data);
    } else {
      return actions.updateImageRequest(formKey, values);
    }
  }

  changeState(state, val) {
    const { formKey, actions } = this.props;

    actions.changeState(formKey, state, val);
  }

  render() {
    const {
      handleSubmit,
      formKey,
      values,
      pristine,
      error,
      submitting,
      data,
      location: {
        query: { kind },
      },
      isCurrentUserSupervisor,
      isCurrentUserCreator,
      isCurrentUserResponsible,
    } = this.props;

    const heading = {
      image: `фотосессию`,
      layout: `планировки`,
    };

    return (
      <header className={s.header}>
        <Form.Container
          onSubmit={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)}
        >
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
                    : `Заказать ${heading[kind]}`}
                </Heading>
              </Col>
            </Row>
            <div className={sUtils.extraPadding}>
              <Row>
                <Col lg="14" lgOffset="3">
                  <RequestDetails {...this.props} />
                </Col>
              </Row>
              {data && (
                <StateControls
                  state={data.state}
                  values={values}
                  changeState={::this.changeState}
                  isCurrentUserSupervisor={isCurrentUserSupervisor}
                  isCurrentUserCreator={isCurrentUserCreator}
                  isCurrentUserResponsible={isCurrentUserResponsible}
                />
              )}
              <div className={sUtils.scrollX}>
                <div className={sUtils.width120}>
                  {data && formKey !== `create` && (
                    <Timeline
                      className={sUtils.maxWidth83}
                      settings={timelineSettings}
                      state={data.state}
                      stateDetails={data.stateDetails}
                      createdAt={data.createdAt}
                    />
                  )}
                </div>
              </div>
              {data && formKey !== `create` && <ManagerControls data={data} />}
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
