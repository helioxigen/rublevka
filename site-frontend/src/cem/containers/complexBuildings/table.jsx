import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ComplexBuildingsActions from 'cem/actions/complexBuildings';
import createProperty from 'cem/actions/properties/list/create';
import updateProperty from 'cem/actions/properties/id/update';
import { pop } from 'cem/actions/toastr';

import { validatorShortcut } from 'core/decorators/submitValidator';
import FormField from 'cem/helpers/formField';

import * as options from 'cem/constants/properties/options';
import * as dict from 'cem/constants/properties/dictionaries';
import Pagination from 'core/containers/pagination';

import UI from 'cem/components/ui';
const {
  Table,
  Select,
  Button,
  Heading,
  PriceInput,
  Tooltip,
  Icon,
  Loading,
  Grid: { Container, Row, Col },
  Form: { Input },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sButton from 'cem/styles/buttons';
import sUtils from 'cem/styles/utils';

import { propertiesTableFormSettings as formSettings } from 'cem/constants/complexBuildings/form';

import permissionResolver from 'core/decorators/permissionResolver';

const stateStyles = {
  public: `success`,
  private: `success`,
  postponed: `warning`,
  sold: `danger`,
  rented: `danger`,
  draft: `primary`,
  deleted: `danger`,
};

const staticStatesDict = {
  draft: `В черновиках`,
  public: `Опубликован`,
  private: `Закрытая продажа`,
  postponed: `Отложен`,
  sold: `Продан`,
  rented: `Сдан`,
  deleted: `Удалён`,
};

const TableRowForm = validatorShortcut(formSettings)(
  class extends Component {
    onCreateSuccess() {
      const { refreshTable, destroyForm, initializeForm } = this.props;

      destroyForm();
      initializeForm({
        specification: { livingArea: `` },
        saleOffer: { price: `` },
      });
      refreshTable();
    }

    onUpdateSuccess() {
      const { refreshTable } = this.props;

      refreshTable(true);
    }

    create(values) {
      const { commonValues, actions, complexBuildingId } = this.props;

      const createData = {
        ...values,
        ...commonValues,
        saleOffer: { ...values.saleOffer, ...commonValues.saleOffer },
        complexBuildingId: parseInt(complexBuildingId, 10),
        location: {
          subwayIds: [],
        },
      };

      return actions.createProperty(createData);
    }

    update(values) {
      const { formKey, data, actions } = this.props;

      const updateData = {
        ...data,
        ...values,
        saleOffer: { ...data.saleOffer, ...values.saleOffer },
        specification: { ...data.specification, ...values.specification },
      };

      return actions.updateProperty(formKey, updateData);
    }

    handleKeyPress(event) {
      const { formKey, handleSubmit } = this.props;

      if (event.key === `Enter`) {
        if (formKey === `create`) {
          this.props.customSubmit(
            () => Promise.resolve(),
            handleSubmit(::this.create, ::this.onCreateSuccess),
          )();
        } else {
          handleSubmit(::this.update)();
        }
      }
    }

    render() {
      const {
        isUpdateAllowed,
        formKey,
        fields,
        values,
        handleSubmit,
        customSubmit,
        pristine,
        error,
        submitting,
      } = this.props;

      return (
        <Table.Row>
          <Table.Cell>{values.id}</Table.Cell>

          <Table.Cell onKeyDown={::this.handleKeyPress}>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              field={fields.externalId}
              static={!isUpdateAllowed}
            >
              <Input
                block
                className={sUtils.resetBorder}
                type="text"
                placeholder="№ п/п"
              />
            </FormField>
          </Table.Cell>

          <Table.Cell onKeyDown={::this.handleKeyPress}>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              field={fields.specification.floor}
              static={!isUpdateAllowed}
            >
              <Input
                block
                className={sUtils.resetBorder}
                type="text"
                placeholder="Этаж"
              />
            </FormField>
          </Table.Cell>

          <Table.Cell onKeyDown={::this.handleKeyPress}>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              field={fields.specification.rooms}
              static={!isUpdateAllowed}
            >
              <Input
                block
                className={sUtils.resetBorder}
                type="text"
                placeholder="Комнат"
              />
            </FormField>
          </Table.Cell>

          <Table.Cell onKeyDown={::this.handleKeyPress}>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              field={fields.specification.livingArea}
              static={!isUpdateAllowed}
            >
              <Input
                block
                className={sUtils.resetBorder}
                type="text"
                placeholder="Жилая"
              />
            </FormField>
          </Table.Cell>

          <Table.Cell onKeyDown={::this.handleKeyPress}>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              field={fields.specification.totalArea}
              static={!isUpdateAllowed}
            >
              <Input
                block
                className={sUtils.resetBorder}
                type="text"
                placeholder="Общая"
              />
            </FormField>
          </Table.Cell>

          <Table.Cell>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              options={dict.kinds}
              field={fields.kind}
              static={!isUpdateAllowed}
            >
              <Select
                className={sUtils.resetBorder}
                options={options.kinds}
                placeholder="Тип"
                labelKey="title"
                valueKey="id"
                disableReset
                customKeyHandler={::this.handleKeyPress}
              />
            </FormField>
          </Table.Cell>

          <Table.Cell onKeyDown={::this.handleKeyPress}>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              field={fields.saleOffer.price}
              static={!isUpdateAllowed}
              price
            >
              <PriceInput
                block
                className={sUtils.resetBorder}
                type="text"
                placeholder="Цена"
              />
            </FormField>
          </Table.Cell>

          <Table.Cell>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              options={dict.currencies}
              field={fields.saleOffer.currency}
              static={!isUpdateAllowed}
            >
              <Select
                className={sUtils.resetBorder}
                options={options.currencies}
                placeholder="Валюта"
                labelKey="title"
                valueKey="id"
                disableReset
                customKeyHandler={::this.handleKeyPress}
              />
            </FormField>
          </Table.Cell>

          <Table.Cell>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              options={staticStatesDict}
              field={fields.state}
              static={!isUpdateAllowed}
            >
              <Select
                className={cn(
                  sUtils.resetBorder,
                  s[stateStyles[fields.state.value]],
                )}
                options={options.states}
                placeholder="Статус"
                labelKey="title"
                valueKey="id"
                disableReset
                customKeyHandler={::this.handleKeyPress}
              />
            </FormField>
          </Table.Cell>

          <Table.Cell>
            {formKey === `create` && (
              <Tooltip title="Добавить">
                <Button
                  className={sButton.btnTableAction}
                  type="button"
                  onClick={customSubmit(
                    () => Promise.resolve(),
                    handleSubmit(::this.create, ::this.onCreateSuccess),
                  )}
                  disabled={pristine || error || submitting}
                >
                  <Icon className={s.btnIcon} icon="checkmark" />
                </Button>
              </Tooltip>
            )}

            {formKey !== `create` && (
              <Tooltip title="Обновить">
                <Button
                  className={sButton.btnTableAction}
                  type="button"
                  onClick={handleSubmit(::this.update, ::this.onUpdateSuccess)}
                  disabled={!isUpdateAllowed || pristine || error || submitting}
                >
                  <Icon className={s.btnIcon} icon="checkmark" />
                </Button>
              </Tooltip>
            )}

            {formKey !== `create` && (
              <Tooltip className={sUtils.pushedLeft1} title="Перейти">
                <Button
                  className={sButton.btnTableAction}
                  type="button"
                  to={`/properties/city/${formKey}`}
                >
                  <Icon className={s.btnIcon} icon="arrow-left" />
                </Button>
              </Tooltip>
            )}
          </Table.Cell>
        </Table.Row>
      );
    }
  },
);

class PrimaryPropertiesTable extends Component {
  componentWillMount() {
    this.load();
  }

  refreshTable(withPagination) {
    if (withPagination) {
      this.load(
        this.props.state.pagination[`complexBuildingProperties.primary`],
      );
    } else {
      this.load();
    }
  }

  load(pagination) {
    const { actions, id } = this.props;

    actions.loadPrimaryProperties(id, { pagination });
  }

  render() {
    const {
      id,
      state,
      actions,
      commonValues,
      customSubmit,
      commonFieldsValid,
      hasRight,
    } = this.props;
    const { items = [], isFetching = false } = state.properties[id] || {};

    const isCreateAllowed = hasRight(`city_property_create`);

    return (
      <div>
        <Heading size="sm">Объекты</Heading>
        <Table.Container>
          <Table.Row>
            <Table.Heading width="5%">ID</Table.Heading>
            <Table.Heading width="15%">№ п/п</Table.Heading>
            <Table.Heading width="5%">Этаж</Table.Heading>
            <Table.Heading width="5%">Комнат</Table.Heading>
            <Table.Heading width="15%" colSpan="2">
              Площадь, м²
            </Table.Heading>
            <Table.Heading width="15%">Тип</Table.Heading>
            <Table.Heading width="10%">Цена</Table.Heading>
            <Table.Heading width="10%">Валюта</Table.Heading>
            <Table.Heading width="15%">Статус</Table.Heading>
            <Table.Heading width="5%">Действия</Table.Heading>
          </Table.Row>
          <Table.Row>
            <Table.Heading width="26%" colSpan="4" />
            <Table.Heading width="8%" style={{ padding: `1.5rem` }}>
              Жилая
            </Table.Heading>
            <Table.Heading width="8%" style={{ padding: `1.5rem` }}>
              Общая
            </Table.Heading>
            <Table.Heading width="58%" colSpan="5" />
          </Table.Row>
          {commonFieldsValid && isCreateAllowed && (
            <TableRowForm
              formKey="create"
              commonValues={commonValues}
              customSubmit={customSubmit}
              actions={actions}
              refreshTable={::this.refreshTable}
              complexBuildingId={id}
              isUpdateAllowed={isCreateAllowed}
            />
          )}
          {!commonFieldsValid && isCreateAllowed && (
            <Table.Row>
              <Table.Cell
                className={cn(sUtils.textCenter, sUtils.dangerRow)}
                colSpan="12"
              >
                Для добавления нового объекта заполните общие характеристики
              </Table.Cell>
            </Table.Row>
          )}
          {!isCreateAllowed && (
            <Table.Row>
              <Table.Cell
                className={cn(sUtils.textCenter, sUtils.dangerRow)}
                colSpan="12"
              >
                Для добавления нового объекта у вас нет прав
              </Table.Cell>
            </Table.Row>
          )}
          {items.map(item => {
            const canUpdateInitialProperty = hasRight(
              `city_property_initial_update`,
              item.responsibleUser.id,
            );

            return (
              <TableRowForm
                key={item.id}
                data={item}
                initialValues={item}
                formKey={item.id.toString()}
                commonValues={commonValues}
                actions={actions}
                refreshTable={::this.refreshTable}
                isUpdateAllowed={canUpdateInitialProperty}
              />
            );
          })}
        </Table.Container>
        {isFetching && <Loading />}
        {!isFetching && !!items.length && (
          <Container fluid>
            <Row xs="center">
              <Col xs="20" className={sUtils.pushed6_0}>
                <Pagination
                  kind="complexBuildingProperties.primary"
                  onUpdate={::this.load}
                />
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

const pickState = ({ auth, propertiesByComplexBuildingId, pagination }) => ({
  state: {
    auth,
    properties: propertiesByComplexBuildingId.primary,
    pagination,
  },
});

const pickActions = dispatch => ({
  actions: bindActionCreators(
    { ...ComplexBuildingsActions, createProperty, updateProperty, pop },
    dispatch,
  ),
});

export default connect(
  pickState,
  pickActions,
)(permissionResolver()(PrimaryPropertiesTable));
