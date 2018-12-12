import React, { Component } from "react";
import { reduxForm } from "redux-form";

import submitValidator from "core/decorators/submitValidator";
import { fields as formFields } from "cem/constants/duty/form";
import validate from "cem/validators/duty";

import { generateTimeSlotsList } from "core/helpers";
import { fetchResource } from "cem/helpers/autocomplete";

import cn from "classnames";
import UI from "cem/components/ui";
const {
  Form,
  Select,
  AsyncSelect,
  Heading,
  Button,
  Daypicker,
  Icon,
  Form: { Group, Label, Input, Helper },
  Grid: { Container, Row, Col },
} = UI;

import s from "cem/styles/modal/list";
import sUtils from "cem/styles/utils";
import sButton from "cem/styles/buttons";
import sDaypicker from "cem/styles/ui/daypicker";

const formSettings = {
  form: `duty`,
  fields: formFields,
  validate,
};

export default reduxForm(formSettings)(
  submitValidator({
    fieldsRemapping: {
      startAt: `startDate`,
      finishAt: `finishDate`,
    },
  })(
    class extends Component {
      onSubmitSuccess() {
        const { formKey, actions, closeModal } = this.props;
        actions.pop(
          `success`,
          `Дежурство ${formKey === `create` ? `создано` : `обновлено`}!`,
        );
        actions.loadDuties();
        closeModal();
      }

      onSubmitFail() {
        const { formKey, actions } = this.props;
        actions.pop(
          `error`,
          `Ошибка ${formKey === `create` ? `создания` : `обновления`} дежурства!`,
        );
      }

      createOrUpdate(values) {
        const { formKey, actions } = this.props;

        if (formKey === `create`) {
          return actions.createDuty(values);
        } else {
          return actions.updateDuty(values.id, values);
        }
      }

      render() {
        const {
          formKey,
          fields,
          handleSubmit,
          pristine,
          error,
          submitting,
        } = this.props;

        return (
          <Form.Container
            onSubmit={handleSubmit(
              ::this.createOrUpdate,
              ::this.onSubmitSuccess,
              ::this.onSubmitFail,
            )}
          >
            <div className={s.container}>
              <Row>
                {formKey === `create` &&
                  <Col xs="20">
                    <Heading size="md">Добавить дежурство</Heading>
                    <p className={cn(s.text, sUtils.pushedTop3)}>
                      Чтобы добавить дежурство требуется заполнить все поля внизу.
                    </p>
                  </Col>}
                {formKey !== `create` &&
                  <Col xs="20">
                    <Heading size="md">Редактировать дежурство</Heading>
                  </Col>}
              </Row>
              <Row className={sUtils.pushedTop3}>
                <Col xs="20">
                  <Group
                    kind={
                      fields.departmentId.touched &&
                        fields.departmentId.error &&
                        `error`
                    }
                  >
                    <Label>Департамент</Label>
                    <AsyncSelect
                      block
                      {...fields.departmentId}
                      asyncOptions={fetchResource(`/v1/departments`, `name`, [
                        `name`,
                      ])}
                    />
                    {fields.departmentId.touched &&
                      fields.departmentId.error &&
                      <Helper>{fields.departmentId.error}</Helper>}
                  </Group>
                </Col>
              </Row>
              <Row>
                <Col xs="10">
                  <Group
                    kind={
                      fields.startDate.touched &&
                        fields.startDate.error &&
                        `error`
                    }
                  >
                    <Label block>Дата начала</Label>
                    <Daypicker
                      className={cn(sUtils.fullWidth, sDaypicker.daypicker)}
                      restrict="past"
                      control={
                        <Input
                          block
                          type="text"
                          {...fields.startDate}
                          required
                        />
                      }
                      button={
                        <Button className={sDaypicker.btn}>
                          <Icon className={sDaypicker.icon} icon="calendar" />
                        </Button>
                      }
                      onDayClick={day => fields.startDate.onBlur(day)}
                    />
                    {fields.startDate.touched &&
                      fields.startDate.error &&
                      <Form.Helper className={s.helperDaypicker}>
                        {fields.startDate.error}
                      </Form.Helper>}
                  </Group>
                </Col>
                <Col xs="10">
                  <Group
                    kind={
                      fields.finishDate.touched &&
                        fields.finishDate.error &&
                        `error`
                    }
                  >
                    <Label block>Дата конца</Label>
                    <Daypicker
                      className={cn(sUtils.fullWidth, sDaypicker.daypicker)}
                      restrict="past"
                      control={
                        <Input
                          block
                          type="text"
                          {...fields.finishDate}
                          required
                        />
                      }
                      button={
                        <Button className={sDaypicker.btn}>
                          <Icon className={sDaypicker.icon} icon="calendar" />
                        </Button>
                      }
                      onDayClick={day => fields.finishDate.onBlur(day)}
                    />
                    {fields.finishDate.touched &&
                      fields.finishDate.error &&
                      <Form.Helper className={s.helperDaypicker}>
                        {fields.finishDate.error}
                      </Form.Helper>}
                  </Group>
                </Col>
              </Row>
              <Row>
                <Col sm="10">
                  <Group
                    kind={
                      fields.startTime.touched &&
                        fields.startTime.error &&
                        `error`
                    }
                  >
                    <Select
                      valueKey="id"
                      labelKey="title"
                      options={generateTimeSlotsList()}
                      {...fields.startTime}
                      disabled={!fields.startDate.value}
                    />
                    {fields.startTime.touched &&
                      fields.startTime.error &&
                      <Form.Helper>{fields.startTime.error}</Form.Helper>}
                  </Group>
                </Col>
                <Col sm="10">
                  <Group
                    kind={
                      fields.finishTime.touched &&
                        fields.finishTime.error &&
                        `error`
                    }
                  >
                    <Select
                      valueKey="id"
                      labelKey="title"
                      options={generateTimeSlotsList()}
                      {...fields.finishTime}
                      disabled={!fields.finishDate.value}
                    />
                    {fields.finishTime.touched &&
                      fields.finishTime.error &&
                      <Form.Helper>{fields.finishTime.error}</Form.Helper>}
                  </Group>
                </Col>
              </Row>
              <Row>
                <Col xs="20">
                  <Group
                    kind={
                      fields.staffUserId.touched &&
                        fields.staffUserId.error &&
                        `error`
                    }
                  >
                    <Label>Сотрудник</Label>
                    <AsyncSelect
                      block
                      {...fields.staffUserId}
                      asyncOptions={fetchResource(
                        `/v1/users/staff`,
                        `lastName,firstName`,
                        [`firstName`, `lastName`],
                      )}
                      linkedTo={{
                        "details.departmentId": fields.departmentId.value ||
                          `..0`,
                      }}
                    />
                    {fields.staffUserId.touched &&
                      fields.staffUserId.error &&
                      <Helper>{fields.staffUserId.error}</Helper>}
                  </Group>
                </Col>
              </Row>
            </div>
            {formKey === `create` &&
              <Button
                className={sButton.btnWide}
                kind="success"
                size="lg"
                disabled={pristine || error || submitting}
                block
              >
                Добавить дежурство
              </Button>}
            {formKey !== `create` &&
              <Button
                className={sButton.btnWide}
                kind="warning"
                size="lg"
                disabled={pristine || error || submitting}
                block
              >
                Отредактировать дежурство
              </Button>}
          </Form.Container>
        );
      }
    },
  ),
);
