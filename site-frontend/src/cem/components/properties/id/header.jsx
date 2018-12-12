import React, { Component } from 'react';
import { Link } from 'react-router';

import { pdf } from 'cem/config/sources';
import { API } from 'core/config/resources';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import validate from 'cem/validators/properties';
import * as options from 'cem/constants/properties/options';

import UI from 'cem/components/ui';
const {
  Form,
  Media,
  Button,
  Grid,
  Select,
  AsyncSelect,
  Dropdown,
  Icon,
  Heading,
  Form: { Group, Label, Static, Helper },
  Grid: { Row, Col },
} = UI;

import TransferUserModal from 'cem/containers/common/modal/transferUser';

import { fetchResource } from 'cem/helpers/autocomplete';

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDropdown from 'cem/styles/ui/dropdown';

import { cloudfront } from 'core/config/resources';

const states = {
  public: 'success',
  private: 'success',
  postponed: 'warning',
  sold: 'danger',
  rented: 'danger',
  draft: 'primary',
  deleted: 'danger',
};

const makeImageRequestParams = request =>
  Object.keys(request)
    .map(key => `${key}=${request[key]}`)
    .join('&');

const Image = ({ id }) => (
  <UI.Image
    src={`${cloudfront}/${id}-thumbnail-128`}
    kind="circle"
    width="102"
    height="102"
    title=""
    alt=""
  />
);

const Description = (props) => {
  const { fields, data, isUpdateAllowed } = props;

  return (
    <Row>
      {/*
      <Col sm="5">
        <Group kind={fields.category.touched && !!fields.category.error && `error`}>
          <Label className={s.label}>Категория</Label>
          <Select className={cn(sUtils.minHeight3_7, sUtils.fontSizeMd)} {...fields.category} options={options.categories} labelKey="title" valueKey="id" onBlur={() => {}} />
          {fields.category.touched && fields.category.error && <Helper>{fields.category.error}</Helper>}
        </Group>
      </Col>
      */}
      <Col sm="8" md="8" lg="5">
        <Group kind={fields.kind.touched && !!fields.kind.error && 'error'}>
          <Label className={s.label}>Тип</Label>
          <Select
            className={cn(sUtils.minheight3_7, sUtils.fontSizeMd)}
            disabled={!isUpdateAllowed}
            {...fields.kind}
            options={options.kinds}
            labelKey="title"
            valueKey="id"
          />
          {fields.kind.touched && fields.kind.error && <Helper>{fields.kind.error}</Helper>}
        </Group>
      </Col>
      <Col sm="8" md="8" lg="5">
        <Group kind={fields.state.touched && !!fields.state.error && 'error'}>
          <Label block className={s.label}>
            Статус
          </Label>
          {fields.state.value !== 'deleted' && (
            <Select
              {...fields.state}
              className={cn(sUtils.fontSizeMd, s[states[fields.state.value]])}
              disabled={!isUpdateAllowed}
              options={options.states}
              labelKey="title"
              valueKey="id"
            />
          )}
          {fields.state.value === 'deleted' && (
            <Static className={cn(sUtils.fontSizeMd, s[states[fields.state.value]])}>
              Удалён
              {data &&
              data.removalOrderId && (
                <Link
                  className={cn(s.linkIcon, sUtils.alignBaseline)}
                  to={`/requests/properties/to_remove/${data.removalOrderId}`}
                >
                  <Icon className={s.icon} icon="arrow" />
                </Link>
              )}
            </Static>
          )}
          {fields.state.touched && fields.state.error && <Helper>{fields.state.error}</Helper>}
        </Group>
      </Col>
      {fields.state.value === 'deleted' &&
      data &&
      data.stateDetails &&
      data.stateDetails.reason && (
        <Col sm="4" md="8" lg="5">
          <Group kind={fields.state.touched && !!fields.state.error && 'error'}>
            <Label block className={s.label}>
              Причина
            </Label>
            <Static options={options.states}>{data.stateDetails.reason}</Static>
          </Group>
        </Col>
      )}
      <Col sm="8" md="8" lg="6">
        <Group kind={fields.badge.id.touched && !!fields.badge.id.error && 'error'}>
          <Label className={s.label}>Бэйдж</Label>
          <AsyncSelect
            className={cn(sUtils.minheight3_7, sUtils.fontSizeMd)}
            asyncOptions={fetchResource('/v1/properties/badges', 'title')}
            {...fields.badge.id}
          />
        </Group>
      </Col>
    </Row>
  );
};

class Header extends Component {
  onSubmitSuccess({ id }) {
    const { actions, formKey, resetForm, params: { category } } = this.props;

    if (formKey === 'create') {
      actions.pop('success', `Объект (ID: ${id})`, 'Создан');

      actions.pushPath(`/properties/${category}/${id}`);
    } else {
      actions.pop('success', `Объект (ID: ${id})`, 'Обновлён');

      resetForm();
    }
  }

  createOrUpdate() {
    const { formKey, actions, values, params: { category } } = this.props;

    if (formKey === 'create') {
      return actions.createProperty(values, category);
    }
    return actions.updateProperty(formKey, values, category);
  }

  render() {
    const {
      handleSubmit,
      formKey,
      values,
      pristine,
      error,
      submitting,
      state,
      actions,
      params: { id, category },
      responsibleUserId,
      isUpdateAllowed,
      isImagesOrderingAllowed,
      isPropertyRemovalOrderingAllowed,
      isPropertyExportWithoutLogoAllowed,
    } = this.props;
    const { images = [] } = values;

    const responsibleUserData = state.users[responsibleUserId] || {};

    const request = {
      propertyCategory: category,
      propertyId: id,
    };

    // const photoRequestUrl = `/requests/properties/images/create?${makeImageRequestParams({ kind: `image` })}`;
    // const layoutRequestUrl = `/requests/properties/images/create?${makeImageRequestParams({ kind: `layout`, ...request })}`;
    const removalRequestUrl = `/requests/properties/to_remove/create?${makeImageRequestParams(
      request,
    )}`;
    const urlNoLogo = `${API}/v1/properties/${id}/export/pdf?url=${pdf.source}/properties/${category}/${id}/${state
      .auth.token}/nologo&triggerEvent=true&token=${state.auth.token}`;
    const urlLogo = `${API}/v1/properties/${id}/export/pdf?url=${pdf.source}/properties/${category}/${id}/${state
      .auth.token}/logo&token=${state.auth.token}`;

    return (
      <header className={s.header}>
        <Form.Container onSubmit={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)}>
          <Grid.Container fluid>
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
                  {formKey !== 'create' && `Объект (ID: ${formKey})`}
                  {formKey === 'create' && 'Создать новый объект'}
                </Heading>

                <Dropdown
                  className={sDropdown.header}
                  button={
                    <Button type="button" className={sButton.btnDropdown}>
                      <Icon className={s.iconSubmenu} icon="submenu" />
                    </Button>
                  }
                >
                  {isUpdateAllowed && (
                    <TransferUserModal
                      className={sUtils.displayBlock}
                      objectKind={`properties/${category}`}
                      destinationKind="users"
                      objectId={id}
                      reloadAction={actions.loadProperty}
                      responsibleUser={responsibleUserData.data}
                    >
                      <Button type="button" className={sButton.btnDropdownInner}>
                        Передать другому сотруднику
                      </Button>
                    </TransferUserModal>
                  )}
                  <Link
                    to={urlLogo}
                    target="_blank"
                    className={cn(sUtils.displayBlock, sButton.btnDropdownInner)}
                  >
                    Скачать презентацию с логотипом
                  </Link>
                  {isPropertyExportWithoutLogoAllowed && (
                    <Link
                      to={urlNoLogo}
                      target="_blank"
                      className={cn(sUtils.displayBlock, sButton.btnDropdownInner)}
                    >
                      Скачать презентацию без логотипа
                    </Link>
                  )}
                  {/* {isImagesOrderingAllowed &&
                    <Link to={photoRequestUrl} className={cn(sUtils.displayBlock, sButton.btnDropdownInner)}>
                      Заказать фотографии
                    </Link>
                  }
                  {isImagesOrderingAllowed &&
                    <Link to={layoutRequestUrl} className={cn(sUtils.displayBlock, sButton.btnDropdownInner)}>
                      Заказать планировки
                    </Link>
                  } */}
                  {isPropertyRemovalOrderingAllowed && (
                    <Link
                      to={removalRequestUrl}
                      className={cn(sUtils.displayBlock, sButton.btnDropdownInner)}
                    >
                      Запросить удаление
                    </Link>
                  )}
                </Dropdown>
              </Col>
            </Row>
            <Row>
              <Col xs="18">
                <Media
                  className={s.media}
                  left={images[0] && <Image id={images[0].id} />}
                  body={<Description {...this.props} />}
                />
              </Col>
            </Row>
          </Grid.Container>

          {formKey === 'create' && (
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
          {formKey !== 'create' && (
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
      </header>
    );
  }
}

const formSettingsCity = {
  form: 'propertiesCity',
  validate,
};

const formSettingsCountry = {
  form: 'propertiesCountry',
  validate,
};

export default {
  city: reduxForm(formSettingsCity)(submitValidator()(Header)),
  country: reduxForm(formSettingsCountry)(submitValidator()(Header)),
};
