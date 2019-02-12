import React, { Component } from 'react';
import * as types from 'cem/constants/users/actions';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import { fields as formFields } from 'cem/constants/users/form';
import validate from 'cem/validators/users';

import { fetchResource } from 'cem/helpers/autocomplete';

import cn from 'classnames';
import FormField from 'cem/helpers/formField';
import UI from 'cem/components/ui';
const {
  Form,
  Button,
  Select,
  AsyncSelect,
  Heading,
  Grid: { Row, Col },
  Form: { Group, Label, Input, Helper, Textarea },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import Documents from './documents';

import * as options from 'cem/constants/users/options';
import * as dict from 'cem/constants/users/dictionaries';

class About extends Component {
  onSubmitSuccess({ type }) {
    if (type === types.CREATE_ID_SUCCESS) this.props.resetForm();
  }

  createOrUpdate() {
    const { formKey, actions, values } = this.props;

    if (formKey === `create`) {
      return actions.createUser(values);
    } else {
      return actions.updateUser(values);
    }
  }

  render() {
    const {
      fields,
      formKey,
      handleSubmit,
      pristine,
      error,
      submitting,
      isUpdateAllowed,
      isDocumentsUploadAllowed,
    } = this.props;

    return (
      <Row>
        <section className={s.section}>
          <Form.Container onSubmit={handleSubmit(::this.createOrUpdate)}>
            <Row className={sUtils.pushedBottom3}>
              <Col sm="10">
                <Heading size="md">Отдел и должность</Heading>
                <Row>
                  <Col lg="18">
                    <Row>
                      <Col md="10">
                        <Group
                          kind={
                            fields.details.departmentId.touched &&
                            fields.details.departmentId.error &&
                            `error`
                          }
                        >
                          <Label>Департамент</Label>
                          <AsyncSelect
                            {...fields.details.departmentId}
                            asyncOptions={fetchResource(
                              `/v1/departments`,
                              `name`,
                              [`name`],
                            )}
                            onChange={value => {
                              fields.details.divisionId.onChange(null);
                              fields.details.departmentId.onChange(value);
                            }}
                            disabled={formKey !== `create` && !isUpdateAllowed}
                          />
                          {fields.details.departmentId.touched &&
                            fields.details.departmentId.error && (
                              <Helper>
                                {fields.details.departmentId.error}
                              </Helper>
                            )}
                        </Group>
                      </Col>
                      <Col md="10">
                        <Group>
                          <Form.Label block>&nbsp;</Form.Label>
                          {!!fields.details.departmentId.value &&
                            !fields.details.divisionId.value && (
                              <Label
                                className={cn(s.label, sUtils.pushedTop_5)}
                                kind={
                                  fields.details.isManager.touched &&
                                  fields.details.isManager.error &&
                                  `error`
                                }
                              >
                                <Input
                                  type="checkbox"
                                  {...fields.details.isManager}
                                  disabled={
                                    formKey !== `create` && !isUpdateAllowed
                                  }
                                />{' '}
                                Директор департамента
                                {fields.details.isManager.touched &&
                                  fields.details.isManager.error && (
                                    <Helper>
                                      {fields.details.isManager.error}
                                    </Helper>
                                  )}
                              </Label>
                            )}
                        </Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="10">
                        <Group
                          kind={
                            fields.details.divisionId.touched &&
                            fields.details.divisionId.error &&
                            `error`
                          }
                        >
                          <Label>Отдел</Label>
                          <AsyncSelect
                            {...fields.details.divisionId}
                            asyncOptions={fetchResource(
                              `/v1/divisions`,
                              `name`,
                              [`name`],
                            )}
                            linkedTo={{
                              departmentId: fields.details.departmentId.value,
                            }}
                            disabled={formKey !== `create` && !isUpdateAllowed}
                          />
                          {fields.details.divisionId.touched &&
                            fields.details.divisionId.error && (
                              <Helper>{fields.details.divisionId.error}</Helper>
                            )}
                        </Group>
                      </Col>
                      {!!fields.details.departmentId.value &&
                        !!fields.details.divisionId.value && (
                          <Col sm="10">
                            <Form.Label block>&nbsp;</Form.Label>
                            <Group>
                              <Label
                                className={cn(s.label, sUtils.pushedTop_5)}
                                kind={
                                  fields.details.isManager.touched &&
                                  fields.details.isManager.error &&
                                  `error`
                                }
                              >
                                <Input
                                  type="checkbox"
                                  {...fields.details.isManager}
                                  disabled={
                                    formKey !== `create` && !isUpdateAllowed
                                  }
                                />{' '}
                                Руководитель отдела
                                {fields.details.isManager.touched &&
                                  fields.details.isManager.error && (
                                    <Helper>
                                      {fields.details.isManager.error}
                                    </Helper>
                                  )}
                              </Label>
                            </Group>
                          </Col>
                        )}
                    </Row>

                    <Row>
                      <Col md="10">
                        <Group
                          kind={
                            fields.details.roleId.touched &&
                            fields.details.roleId.error &&
                            `error`
                          }
                        >
                          <Label>Должность</Label>
                          <AsyncSelect
                            {...fields.details.roleId}
                            asyncOptions={fetchResource(`/v1/roles`, `name`, [
                              `name`,
                            ])}
                            disabled={formKey !== `create` && !isUpdateAllowed}
                          />
                          {fields.details.roleId.touched &&
                            fields.details.roleId.error && (
                              <Helper>{fields.details.roleId.error}</Helper>
                            )}
                        </Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="10">
                        <FormField
                          label="Группа"
                          field={fields.details.member}
                          options={dict.members}
                          float
                          static={formKey !== `create` && !isUpdateAllowed}
                        >
                          <Select
                            options={options.members}
                            {...fields.member}
                          />
                        </FormField>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="10">
                        <FormField
                          label="Опыт, лет"
                          field={fields.details.experienceYears}
                          float
                          static={formKey !== `create` && !isUpdateAllowed}
                        >
                          <Input block type="text" />
                        </FormField>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col sm="10">
                {(formKey === `create` || isUpdateAllowed) && (
                  <Row>
                    <Col lg="16">
                      <Heading size="md">Логин и пароль</Heading>

                      <Group
                        float
                        kind={
                          fields.email.touched && fields.email.error && `error`
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          block
                          type="text"
                          placeholder="Логин"
                          {...fields.email}
                          name="fuckSafariLogin"
                          autoComplete="off"
                        />
                        <Label>Логин</Label>
                        {fields.email.touched && fields.email.error && (
                          <Helper>{fields.email.error}</Helper>
                        )}
                      </Group>

                      <Group
                        float
                        kind={
                          fields.password.touched &&
                          fields.password.error &&
                          `error`
                        }
                      >
                        <Input
                          valueClassName="floatLabel"
                          block
                          type="password"
                          {...fields.password}
                          placeholder={
                            (formKey !== `create` && `******`) || `Пароль`
                          }
                          name="fuckSafariPassword"
                          autoComplete="off"
                        />
                        <Label>Пароль</Label>
                        {fields.password.touched && fields.password.error && (
                          <Helper>{fields.password.error}</Helper>
                        )}
                      </Group>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>

            <Heading size="md">Контактные данные</Heading>
            <Row className={sUtils.pushedBottom3}>
              <Col sm="10">
                <Row>
                  <Col lg="16">
                    <FormField
                      label="Рабочий телефон"
                      field={fields.workPhoneNumber}
                      float
                      static={formKey !== `create` && !isUpdateAllowed}
                    >
                      <Input
                        name="fuckSafariWorkPhoneNumber"
                        block
                        type="text"
                        mask="+7 (111) 111-11-11"
                        placeholder="+7 (___) ___ - __ - __"
                        autoComplete="off"
                      />
                    </FormField>
                    <FormField
                      label="Рабочий e-mail"
                      field={fields.email}
                      float
                      static={formKey !== `create` && !isUpdateAllowed}
                    >
                      <Input
                        name="fuckSafariLogin"
                        block
                        type="text"
                        autoComplete="off"
                      />
                    </FormField>
                    {(formKey === `create` || isUpdateAllowed) && (
                      <Group float>
                        <Select
                          multi
                          {...fields.details.adPhoneNumbers}
                          allowCreate
                          valueClassName="floatLabel"
                          placeholder="Номера для внешней рекламы"
                        />
                        <Label block>Номера для внешней рекламы</Label>
                        {fields.email.touched && fields.email.error && (
                          <Helper>{fields.email.error}</Helper>
                        )}
                      </Group>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col sm="10">
                <Row>
                  <Col lg="16">
                    <FormField
                      label="Личный телефон"
                      field={fields.personalPhoneNumber}
                      float
                      static={formKey !== `create` && !isUpdateAllowed}
                    >
                      <Input
                        name="fuckSafariPersonalPhoneNumber"
                        block
                        type="text"
                        mask="+7 (111) 111-11-11"
                        placeholder="+7 (___) ___ - __ - __"
                        autoComplete="off"
                      />
                    </FormField>
                    <FormField
                      label="Личный e-mail"
                      field={fields.personalEmail}
                      float
                      static={formKey !== `create` && !isUpdateAllowed}
                    >
                      <Input
                        name="fuckSafariPersonalEmail"
                        block
                        type="text"
                        autoComplete="off"
                      />
                    </FormField>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className={sUtils.pushedBottom3}>
              <Col sm="10">
                <Heading size="md">Образование</Heading>
                <Row>
                  <Col lg="16">
                    <Group>
                      <Textarea
                        {...fields.details.education}
                        className={s.textarea}
                        rows="9"
                        block
                        kind="primary"
                        disabled={formKey !== `create` && !isUpdateAllowed}
                      />
                    </Group>
                  </Col>
                </Row>
              </Col>
              <Col sm="10">
                <Heading size="md">О сотруднике</Heading>
                <Row>
                  <Col lg="16">
                    <Group>
                      <Textarea
                        {...fields.details.description}
                        className={s.textarea}
                        rows="9"
                        block
                        kind="primary"
                        disabled={formKey !== `create` && !isUpdateAllowed}
                      />
                    </Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            {formKey === `create` && (
              <Button
                className={cn(
                  sButton.btnFixedBottom,
                  pristine && sUtils.hidden,
                )}
                disabled={error || submitting}
                type="submit"
                kind="success"
                size="md"
                block
              >
                Добавить
              </Button>
            )}
            {formKey !== `create` && (
              <Button
                className={cn(
                  sButton.btnFixedBottom,
                  pristine && sUtils.hidden,
                )}
                disabled={error || submitting}
                type="submit"
                kind="warning"
                size="md"
                block
              >
                Сохранить
              </Button>
            )}
          </Form.Container>

          {formKey !== `create` && isDocumentsUploadAllowed && (
            <Row>
              <Col xs="20">
                <Documents resourceId={formKey} />
              </Col>
            </Row>
          )}
        </section>
      </Row>
    );
  }
}

const formSettings = {
  form: `user`,
  fields: formFields,
  destroyOnUnmount: false,
  validate,
};

export default reduxForm(formSettings)(submitValidator()(About));
