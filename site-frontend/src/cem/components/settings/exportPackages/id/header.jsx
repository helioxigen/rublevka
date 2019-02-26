import React, { Component } from 'react';

import { Link } from 'react-router';

import { reduxForm } from 'redux-form';

import submitValidator from 'core/decorators/submitValidator';

import FormField from 'cem/helpers/formField';

import { FormattedDate } from 'react-formatted';

import UI from 'cem/components/ui';
const {
  Form,
  Button,
  Icon,
  Heading,
  Select,
  Dropdown,
  Form: { Input, Group, Label, Static },
  Grid: { Container, Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDropdown from 'cem/styles/ui/dropdown';

import { formSettings } from 'cem/constants/settings/exportPackages/form';
import * as dict from 'cem/constants/settings/exportPackages/dictionaries';
import * as options from 'cem/constants/settings/exportPackages/options';

class Header extends Component {
  onCreateOrUpdateSuccess(data) {
    const { formKey, actions } = this.props;

    if (formKey === `create`) {
      actions.pop(`success`, `Пакет (ID: ${data.id})`, `Создан`);
      actions.pushPath(`/settings/export_packages/${data.id}`);
    } else {
      actions.pop(`success`, `Пакет (ID: ${data.id})`, `Обновлён`);
      actions.loadPackage(data.id);
    }
  }

  onDeleteSuccess(data) {
    const { actions } = this.props;

    actions.pop(`success`, `Пакет (ID: ${data.id})`, `Удалён`);
    actions.pushPath(`/settings/export_packages`);
  }

  createOrUpdate(values) {
    const { formKey, actions } = this.props;

    if (formKey === `create`) {
      return actions.createPackage({ ...values, state: `active` });
    } else {
      return actions.updatePackage(values);
    }
  }

  delete(values) {
    const { actions } = this.props;
    return actions.updatePackage({ ...values, state: `deleted` });
  }

  handleDelete() {
    this.props.handleSubmit(::this.delete, ::this.onDeleteSuccess)();
  }

  render() {
    const {
      formKey,
      handleSubmit,
      fields,
      values,
      pristine,
      error,
      submitting,
      isUpdateAllowed,
      isDeleteAllowed,
    } = this.props;

    return (
      <Form.Container
        onSubmit={handleSubmit(
          ::this.createOrUpdate,
          ::this.onCreateOrUpdateSuccess,
        )}
        className={s.header}
      >
        <Container fluid>
          <Row>
            <Col xs="20" className={sUtils.positionRelative}>
              <Heading size="lg">
                <UI.Back
                  button={
                    <Button type="button" className={sButton.btnBack}>
                      <UI.Icon className={s.iconBack} icon="arrow-right" />
                    </Button>
                  }
                />
                {formKey === `create` && `Создать пакет`}
                {formKey !== `create` && `Пакет (ID: ${formKey})`}
              </Heading>
              {formKey !== `create` &&
                isDeleteAllowed &&
                values.state !== `deleted` && (
                  <Dropdown
                    className={sDropdown.header}
                    button={
                      <Button type="button" className={sButton.btnDropdown}>
                        <Icon className={s.iconSubmenu} icon="submenu" />
                      </Button>
                    }
                  >
                    <Button
                      type="button"
                      className={cn(
                        sUtils.displayBlock,
                        sButton.btnDropdownInner,
                      )}
                      disabled={error || submitting}
                      onClick={::this.handleDelete}
                    >
                      Архивировать пакет
                    </Button>
                  </Dropdown>
                )}
            </Col>
          </Row>
          <Row className={s.formContainer}>
            <Col xs="20">
              <section>
                <Row>
                  <Col sm="10">
                    <Row>
                      <Col sm="10">
                        <FormField
                          label="Название"
                          field={fields.title}
                          float
                          static={!isUpdateAllowed}
                        >
                          <Input className={s.input} block type="text" />
                        </FormField>
                      </Col>
                      <Col sm="10" md="8" lg="7">
                        <FormField
                          label="Формат"
                          field={fields.format}
                          options={dict.formats}
                          float
                          static={!isUpdateAllowed}
                        >
                          <Select
                            className={s.input}
                            options={options.formats}
                            {...fields.format}
                          />
                        </FormField>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm="10" lg="8" lgOffset="2">
                    <Row>
                      {formKey !== `create` && (
                        <Col sm="10" md="10">
                          <Group>
                            <Label block className={s.input}>
                              Дата обновления
                            </Label>
                            <Static className={s.input}>
                              <FormattedDate
                                value={values.lastExportAt}
                                mask="dd.mm.yyyy HH:MM"
                              />
                            </Static>
                          </Group>
                        </Col>
                      )}
                      {formKey !== `create` && !!values.lastExportAt && (
                        <Col sm="10" md="10">
                          <Group>
                            <Label block className={s.input}>
                              Ссылка
                            </Label>
                            <Static className={s.input}>
                              <Link
                                to={`https://s3-eu-west-1.amazonaws.com/jq-export/${
                                  values.format
                                }-${values.id}.xml`}
                                target="_blank"
                              >{`/${values.id}.xml`}</Link>
                            </Static>
                          </Group>
                        </Col>
                      )}
                    </Row>
                  </Col>
                </Row>
              </section>
            </Col>
          </Row>
        </Container>
        {formKey === `create` && (
          <Button
            type="submit"
            className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)}
            disabled={error || submitting}
            kind="success"
            size="md"
            block
          >
            Добавить
          </Button>
        )}
        {formKey !== `create` && (
          <Button
            type="submit"
            className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)}
            disabled={error || submitting}
            kind="warning"
            size="md"
            block
          >
            Сохранить
          </Button>
        )}
      </Form.Container>
    );
  }
}

export default reduxForm(formSettings)(submitValidator()(Header));
