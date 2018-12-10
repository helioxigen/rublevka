import React, { Component } from "react";

import { Provider } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";

import store from "cem/store";
import { reduxForm } from "redux-form";
import submitValidator from "core/decorators/submitValidator";

import { generateTimeSlotsList } from "core/helpers";
import load from "cem/_newsletters/actions/load";
import create from "cem/_newsletters/actions/create";
import update from "cem/_newsletters/actions/update";

import { pushPath } from "redux-simple-router";
import { pop } from "cem/actions/toastr";

import UI from "cem/components/ui";
const {
  Button,
  Icon,
  Back,
  Heading,
  Form,
  Select,
  Form: { Input, Label },
  Grid: { Container, Row, Col },
} = UI;

import FormField from "cem/helpers/formField";
import DatePickerField from "cem/helpers/datePickerField";

import cn from "classnames";
import s from "cem/styles/id/header";
import sUtils from "cem/styles/utils";
import sButton from "cem/styles/buttons";

import * as options from "cem/_newsletters/constants/options";
import { formSettings } from "cem/_newsletters/constants/form";

import Template from "./template";

const Description = ({ fields, values, isStatic }) => (
  <section>
    <Row>
      <Col sm="6" lg="7">
        <FormField
          field={fields.title}
          label="Тема письма"
          float
          static={isStatic}
        >
          <Input className={s.input} block type="text" />
        </FormField>
      </Col>
      <Col sm="6" lg="4">
        <FormField field={fields.state} label="Статус" static={isStatic} float>
          <Select className={sUtils.fontSizeMd} options={options.states} />
        </FormField>
      </Col>
      {!values._sendNow && (
        <Col sm="6" lg="3">
          <DatePickerField
            label="Дата"
            field={fields.scheduledAtDate}
            className={sUtils.fontSizeMd}
            isStatic={isStatic}
            kind="from"
          />
        </Col>
      )}
      {!values._sendNow && (
        <Col sm="6" lg="2">
          <FormField
            field={fields.scheduledAtTime}
            label="Время"
            static={isStatic}
            float
          >
            <Select
              valueKey="id"
              labelKey="title"
              className={sUtils.fontSizeMd}
              options={generateTimeSlotsList()}
            />
          </FormField>
        </Col>
      )}
      <Col sm="6" lg="3">
        <Label className={s.checkboxLabel}>
          <Input type="checkbox" {...fields._sendNow} /> отправить сейчас
        </Label>
      </Col>
    </Row>
    <Row>
      <Col sm="6" lg="4">
        <FormField field={fields.listId} label="Список" static={isStatic} float>
          <Input className={s.input} block type="text" />
        </FormField>
      </Col>
      <Col sm="6" lg="3">
        <FormField field={fields.fromEmail} label="С почты" static={isStatic} float>
          <Input className={s.input} block type="email" />
        </FormField>
      </Col>
      <Col sm="6" lg="4">
        <FormField field={fields.fromTitle} label="От кого" static={isStatic} float>
          <Input className={s.input} block type="text" />
        </FormField>
      </Col>
    </Row>
  </section>
);

class Header extends Component {
  onSubmitSuccess(data) {
    const { formKey, dispatch } = this.props;

    if (formKey === `create`) {
      dispatch(pop(`success`, `Рассылка создана (ID: ${data.id})`));
      dispatch(pushPath(`/newsletters/${data.id}`));
    } else {
      dispatch(pop(`success`, `Рассылка обновлена (ID: ${data.id})`));

      dispatch(load(data.id));
    }
  }

  createOrUpdate() {
    const { formKey, values, dispatch } = this.props;

    const Temp = (
      <Provider store={store}>
        <Template values={values} />
      </Provider>
    );

    const data = {
      ...values,
      template: renderToStaticMarkup(Temp),
    };

    if (formKey === `create`) return dispatch(create(data));
    if (formKey !== `create`) return dispatch(update(formKey, values));
  }

  render() {
    const {
      formKey,
      pristine,
      error,
      submitting,
      handleSubmit,
      fields,
      values,
      isUpdateAllowed,
      isStatic,
    } = this.props;

    return (
      <header className={s.header}>
        <Form.Container
          onSubmit={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)}
        >
          <Container fluid>
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
                  {formKey !== `create` && `Рассылка (ID: ${formKey})`}
                  {formKey === `create` && `Создать рассылку`}
                </Heading>
              </Col>
            </Row>
            <Row className={s.media}>
              <Col xs="20">
                <Description
                  fields={fields}
                  values={values}
                  isUpdateAllowed={isUpdateAllowed}
                  isStatic={isStatic}
                />
              </Col>
            </Row>
          </Container>
          {formKey === `create` &&
            <Button
              className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)}
              disabled={error || submitting}
              kind="success"
              size="md"
              block
            >
              {values._sendNow && `Отправить`}
              {!values._sendNow && `Запланировать`}
            </Button>}
          {formKey !== `create` &&
            <Button
              className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)}
              disabled={error || submitting}
              kind="warning"
              size="md"
              block
            >
              Сохранить
            </Button>}
        </Form.Container>
      </header>
    );
  }
}

export default reduxForm(formSettings)(submitValidator()(Header));
