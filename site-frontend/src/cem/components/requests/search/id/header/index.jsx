import React, { Component } from 'react';

import formSettings from 'cem/constants/requests/search/form';
import { validatorShortcut } from 'core/decorators/submitValidator';
import { settings as timelineSettings } from 'cem/constants/requests/search/timeline';

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

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

class Header extends Component {
  createOrUpdate() {
    const { formKey, values, actions } = this.props;

    if (formKey === `create`) {
      return actions.createSearchRequest(values).then(({ id }) => {
        actions.pop(`success`, `Заявка (ID: ${id})`, `Успешно создана`);
        actions.loadSearchRequest(id);
        actions.pushPath(`/requests/properties/search/${id}`);
      });
    }
    if (formKey !== `create`) {
      return actions.updateSearchRequest(formKey, values).then(() => {
        actions.pop(`success`, `Заявка (ID: ${formKey})`, `Успешно обновлена`);
        this.props.fields.toggle.onChange(undefined);
        actions.loadSearchRequest(formKey);
      });
    }
  }

  changeState(state, val) {
    const { formKey, actions, handleSubmit } = this.props;
    const submitFn = handleSubmit(() =>
      actions.changeState(formKey, state, val),
    );

    submitFn();
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
      isUpdateAllowed,
      isCurrentUserSupervisor,
      isCurrentUserCreator,
      isCurrentUserResponsible,
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
                    : `Заказать поиск объекта`}
                </Heading>
              </Col>
            </Row>
            <div className={sUtils.extraPadding}>
              <Row>
                <Col md="16" lg="14" mdOffset="2" lgOffset="3">
                  <RequestDetails {...this.props} />
                </Col>
              </Row>
              {isUpdateAllowed && data && (
                <StateControls
                  state={data.state}
                  values={values}
                  changeState={::this.changeState}
                  isCurrentUserSupervisor={isCurrentUserSupervisor}
                  isCurrentUserCreator={isCurrentUserCreator}
                  isCurrentUserResponsible={isCurrentUserResponsible}
                />
              )}
              <div className={sUtils.scrollXMd}>
                <div className={sUtils.width122}>
                  {data && formKey !== `create` && (
                    <Timeline
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
            kind={formKey === `create` ? `success` : `warning`}
            size="md"
            block
            disabled={error || submitting || pristine}
            type="submit"
          >
            {formKey === `create` ? `Создать` : `Сохранить`}
          </Button>
        </Form.Container>
      </header>
    );
  }
}

export default validatorShortcut(formSettings)(Header);
