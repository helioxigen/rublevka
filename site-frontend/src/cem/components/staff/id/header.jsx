import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';

import { UserAvatar } from 'cem/components/common/photos/avatar';

import UI from 'cem/components/ui';
const {
  Grid,
  Form,
  Media,
  Back,
  Heading,
  Dropdown,
  Button,
  Icon,
  Daypicker,
  Form: { Input, Group, Helper, Label },
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDaypicker from 'cem/styles/ui/daypicker';
import sDropdown from 'cem/styles/ui/dropdown';

import FormField from 'cem/helpers/formField';

import { fields as formFields } from 'cem/constants/users/form';
import validate from 'cem/validators/users';

class Description extends Component {
  render() {
    const { fields, formKey, isUpdateAllowed } = this.props;

    return (
      <section>
        <Row>
          <Col sm="6" lg="5">
            <FormField
              label="Фамилия"
              field={fields.lastName}
              float
              static={formKey !== `create` && !isUpdateAllowed}
            >
              <Input className={s.input} block type="text" />
            </FormField>
          </Col>
          <Col sm="6" lg="5">
            <FormField
              label="Имя"
              field={fields.firstName}
              float
              static={formKey !== `create` && !isUpdateAllowed}
            >
              <Input className={s.input} block type="text" />
            </FormField>
          </Col>
          <Col sm="6" lg="5">
            <FormField
              label="Отчество"
              field={fields.middleName}
              float
              static={formKey !== `create` && !isUpdateAllowed}
            >
              <Input className={s.input} block type="text" />
            </FormField>
          </Col>
        </Row>
        <Row>
          <Col sm="20" md="16">
            <Group
              inline
              kind={
                fields.details.startedWorkAt.touched &&
                !!fields.details.startedWorkAt.error &&
                `error`
              }
            >
              Работает с
              <Daypicker
                kind="from"
                control={
                  <Input
                    className={sDaypicker.inputDaypicker}
                    type="text"
                    {...fields.details.startedWorkAt}
                  />
                }
                button={
                  <Button className={sDaypicker.btnDaypicker}>
                    <Icon className={sDaypicker.icon} icon="calendar" />
                  </Button>
                }
                disabled={formKey !== `create` && !isUpdateAllowed}
                onDayClick={day => fields.details.startedWorkAt.onBlur(day)}
                iconDeleteClassName={sDaypicker.iconDeleteStaff}
              />
              {fields.details.startedWorkAt.touched &&
                fields.details.startedWorkAt.error && (
                  <Helper className={sDaypicker.helperDaypicker}>
                    {fields.details.startedWorkAt.error}
                  </Helper>
                )}
            </Group>
            <Group inline>
              по
              <Daypicker
                className={sDaypicker.daypicker}
                kind="to"
                control={
                  <Input
                    className={sDaypicker.inputDaypicker}
                    type="text"
                    {...fields.details.finishedWorkAt}
                    placeholder="настоящее время"
                  />
                }
                button={
                  <Button className={sDaypicker.btnDaypicker}>
                    <Icon className={sDaypicker.icon} icon="calendar" />
                  </Button>
                }
                close={
                  <Icon
                    className={sDaypicker.iconDaypicker}
                    icon="delete"
                    onClick={() => fields.details.finishedWorkAt.onChange(null)}
                  />
                }
                disabled={formKey !== `create` && !isUpdateAllowed}
                onDayClick={day => fields.details.finishedWorkAt.onBlur(day)}
                iconDeleteClassName={sDaypicker.iconDeleteStaff}
              />
            </Group>
            <Label
              className={s.checkboxLabel}
              kind={
                fields.details.isPublic.touched &&
                fields.details.isPublic.error &&
                `error`
              }
            >
              <Input
                className={s.checkbox}
                type="checkbox"
                {...fields.details.isPublic}
                disabled={formKey !== `create` && !isUpdateAllowed}
              />{' '}
              На сайте
              {fields.details.isPublic.touched &&
                fields.details.isPublic.error && (
                  <Helper>{fields.details.isPublic.error}</Helper>
                )}
            </Label>
          </Col>
        </Row>
      </section>
    );
  }
}

class Header extends Component {
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
      handleSubmit,
      formKey,
      pristine,
      error,
      submitting,
      data,
      actions,
      isPhotoUploading,
      isPhotoUploadAllowed,
      isLoginAsUserAllowed = true,
    } = this.props;

    return (
      <Form.Container
        onSubmit={handleSubmit(::this.createOrUpdate)}
        className={s.header}
      >
        <Grid.Container fluid>
          <Row>
            <Col xs="20">
              <Heading size="lg">
                <Back
                  button={
                    <Button type="button" className={sButton.btnBack}>
                      <Icon className={s.iconBack} icon="arrow-right" />
                    </Button>
                  }
                />
                {formKey === `create` && `Добавить сотрудника`}
                {formKey !== `create` && `Сотрудник (ID: ${formKey})`}
                {isLoginAsUserAllowed && (
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
                      onClick={() =>
                        actions
                          .loginAsUser(data)
                          .then(() =>
                            actions.pop(
                              `success`,
                              `Вы вошли как ${data.firstName} ${data.lastName}`,
                            ),
                          )
                      }
                    >
                      Войти под пользователем
                    </Button>
                  </Dropdown>
                )}
              </Heading>
            </Col>
          </Row>
          <Row>
            <Col xs="20">
              <Media
                className={s.media}
                left={
                  formKey !== `create` ? (
                    <UserAvatar
                      id={data.photo && data.photo.id}
                      resourceId={data.id}
                      uploadAction={actions.uploadPhoto}
                      isUploadAllowed={isPhotoUploadAllowed}
                      isUploading={isPhotoUploading}
                    />
                  ) : null
                }
                body={<Description {...this.props} />}
              />
            </Col>
          </Row>
        </Grid.Container>
        {formKey === `create` && (
          <Button
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

const formSettings = {
  form: `user`,
  fields: formFields,
  validate,
};

export default reduxForm(formSettings)(submitValidator()(Header));
