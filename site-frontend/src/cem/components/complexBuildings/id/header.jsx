import React, { Component } from 'react';

import { cloudfront } from 'core/config/resources';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';

import UI from 'cem/components/ui';
const {
  Form,
  Grid,
  Media,
  Button,
  Select,
  Back,
  Icon,
  Dropdown,
  Heading,
  Form: { Input },
  Grid: { Row, Col },
} = UI;

import FormField from 'cem/helpers/formField';
import TransferUserModal from 'cem/components/common/transferUserWithoutAction';

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDropdown from 'cem/styles/ui/dropdown';

import { formSettings } from 'cem/constants/complexBuildings/form';
import * as options from 'cem/constants/complexBuildings/options';
import * as dict from 'cem/constants/complexBuildings/dictionaries';

const Image = ({ id }) =>
  id ? (
    <UI.Image src={`${cloudfront}/${id}-thumbnail-256`} kind="circle" width="102" height="102" />
  ) : (
    <UI.Image
      src={require('url-loader!cem/assets/placeholder')}
      kind="circle"
      width="102"
      height="102"
    />
  );

const Description = (props) => {
  const { fields, formKey, isUpdateAllowed } = props;

  return (
    <Row>
      <Col sm="2">
        <FormField
          field={fields.location.building}
          label="Номер"
          float
          static={!isUpdateAllowed && formKey !== 'create'}
        >
          <Input className={s.input} block type="text" />
        </FormField>
      </Col>
      <Col sm="5">
        <FormField
          field={fields.name}
          label="Название"
          float
          static={!isUpdateAllowed && formKey !== 'create'}
        >
          <Input className={s.input} block type="text" />
        </FormField>
      </Col>
      {formKey !== 'create' && (
        <Col sm="10" lg="5">
          <FormField
            options={dict.states}
            label="Статус"
            field={fields.state}
            static={!isUpdateAllowed}
          >
            <Select
              className={cn(
                sUtils.fontSizeMd,
                dict.states[fields.state.value] && s[dict.states[fields.state.value].style],
              )}
              options={options.states}
              labelKey="title"
              valueKey="id"
            />
          </FormField>
        </Col>
      )}
    </Row>
  );
};

class Header extends Component {
  onSubmitSuccess({ id }) {
    const { actions, formKey } = this.props;

    if (formKey === 'create') {
      actions.loadComplexBuilding(id);
      actions.pop('success', `Корпус (ID: ${id})`, 'Успешно создан');
      actions.pushPath(`/places/complexes/buildings/${id}/about`);
    }
  }

  changeResponsible(id) {
    const { formKey, data, actions } = this.props;
    this.props.handleSubmit(() => {
      actions.updateComplexBuilding(formKey, { ...data, responsibleUser: { id } });
    })();
  }

  createOrUpdate() {
    const { formKey, values, actions, complexId } = this.props;

    if (formKey === 'create') {
      return actions.createComplexBuilding({
        ...values,
        state: 'draft',
        complexId: Number(complexId),
      });
    }
    if (formKey !== 'create') return actions.updateComplexBuilding(formKey, values);
  }

  render() {
    const {
      formKey,
      pristine,
      error,
      submitting,
      handleSubmit,
      values,
      isUpdateAllowed,
    } = this.props;
    const mainImage = values.images[0] || {};

    return (
      <header className={s.header}>
        <Form.Container onSubmit={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)}>
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
                  {formKey !== 'create' && `Корпусы (ID: ${formKey})`}
                  {formKey === 'create' && 'Создать корпус'}
                </Heading>
                {isUpdateAllowed &&
                formKey !== 'create' && (
                  <Dropdown
                    className={sDropdown.header}
                    button={
                      <Button type="button" className={sButton.btnDropdown}>
                        <Icon className={s.iconSubmenu} icon="submenu" />
                      </Button>
                    }
                  >
                    <TransferUserModal action={::this.changeResponsible}>
                      <Button type="button" className={sButton.btnDropdownInner}>
                        Передать другому сотруднику
                      </Button>
                    </TransferUserModal>
                  </Dropdown>
                )}
              </Col>
            </Row>
            <Row>
              <Col md="18">
                <Media
                  className={s.media}
                  left={<Image id={mainImage.id} />}
                  body={<Description {...this.props} />}
                />
              </Col>
            </Row>
          </Grid.Container>

          {formKey === 'create' && (
            <UI.Button
              className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)}
              disabled={error || submitting}
              kind="success"
              size="md"
              block
            >
              Добавить
            </UI.Button>
          )}
          {formKey !== 'create' && (
            <UI.Button
              className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)}
              disabled={error || submitting}
              kind="warning"
              size="md"
              block
            >
              Сохранить
            </UI.Button>
          )}
        </Form.Container>
      </header>
    );
  }
}

export default reduxForm(formSettings)(submitValidator()(Header));
