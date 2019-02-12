import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SettlementsActions from 'cem/actions/settlements';
import createProperty from 'cem/actions/properties/list/create';
import updateProperty from 'cem/actions/properties/id/update';
import { pop } from 'cem/actions/toastr';

import { validatorShortcut } from 'core/decorators/submitValidator';
import FormField from 'cem/helpers/formField';

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

import * as options from 'cem/constants/properties/options';
import * as dict from 'cem/constants/properties/dictionaries';
import { propertiesTableFormSettings as formSettings } from 'cem/constants/settlements/form';

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
      const { refreshTable, initializeForm, destroyForm } = this.props;

      destroyForm();
      initializeForm({
        landDetails: { area: `` },
        specification: { area: `` },
        saleOffer: { price: `` },
      });
      refreshTable();
    }

    onUpdateSuccess() {
      const { refreshTable } = this.props;

      refreshTable(true);
    }

    create(values) {
      const { commonValues, actions, settlementId } = this.props;

      const createData = {
        ...values,
        ...commonValues,
        category: `country`,
        location: { ...values.location, settlementId: Number(settlementId) },
        specification: {
          ...commonValues.specification,
          ...values.specification,
          spaces: [],
          layouts: {},
        },
        saleOffer: {
          ...commonValues.saleOffer,
          ...values.saleOffer,
          isResale: false,
        },
        landDetails: {
          ...values.landDetails,
          landscapeKind: [],
        },
      };

      return actions.createProperty(createData, `country`);
    }

    update(values) {
      const { formKey, data, actions } = this.props;

      const updateData = {
        ...data,
        ...values,
        specification: { ...data.specification, ...values.specification },
        saleOffer: { ...data.saleOffer, ...values.saleOffer },
        landDetails: { ...data.landDetails, ...values.landDetails },
        location: { ...data.location, ...values.location },
      };
      return actions.updateProperty(formKey, updateData, `country`);
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

          <Table.Cell onKeyPress={::this.handleKeyPress}>
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

          <Table.Cell onKeyPress={::this.handleKeyPress}>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              field={fields.location.house}
              static={!isUpdateAllowed}
            >
              <Input
                block
                className={sUtils.resetBorder}
                type="text"
                placeholder="№ дома"
              />
            </FormField>
          </Table.Cell>

          <Table.Cell onKeyPress={::this.handleKeyPress}>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              field={fields.landDetails.area}
              static={!isUpdateAllowed}
            >
              <Input
                block
                className={sUtils.resetBorder}
                type="text"
                placeholder="Участка"
              />
            </FormField>
          </Table.Cell>

          <Table.Cell onKeyPress={::this.handleKeyPress}>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              field={fields.specification.area}
              static={!isUpdateAllowed}
            >
              <Input
                block
                className={sUtils.resetBorder}
                type="text"
                placeholder="Дома"
              />
            </FormField>
          </Table.Cell>

          <Table.Cell>
            <FormField
              className={sUtils.resetIndentation}
              helperClassName={s.helperPosition}
              field={fields.kind}
              options={dict.kinds}
              static={!isUpdateAllowed}
            >
              <Select
                className={sUtils.resetBorder}
                options={options.kinds}
                labelKey="title"
                valueKey="id"
                placeholder="Тип"
                disableReset
                customKeyHandler={::this.handleKeyPress}
              />
            </FormField>
          </Table.Cell>

          <Table.Cell onKeyPress={::this.handleKeyPress}>
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
              field={fields.saleOffer.currency}
              options={dict.currencies}
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
              field={fields.state}
              options={staticStatesDict}
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
                  to={`/properties/country/${formKey}`}
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
    if (withPagination)
      this.load(this.props.state.pagination[`settlementProperties.primary`]);
    if (!withPagination) this.load();
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

    const isCreateAllowed = hasRight(`country_property_create`);

    return (
      <div>
        <Heading size="sm">Объекты</Heading>
        <Table.Container>
          <Table.Row>
            <Table.Heading width="7%">ID</Table.Heading>
            <Table.Heading width="7%">№ п/п</Table.Heading>
            <Table.Heading width="9%">№ дома</Table.Heading>
            <Table.Heading width="16%" colSpan="2">
              Площадь, м²
            </Table.Heading>
            <Table.Heading width="16%">Тип</Table.Heading>
            <Table.Heading width="15%">Цена</Table.Heading>
            <Table.Heading width="10%">Валюта</Table.Heading>
            <Table.Heading width="15%">Статус</Table.Heading>
            <Table.Heading width="5%">Действия</Table.Heading>
          </Table.Row>
          <Table.Row>
            <Table.Heading width="23%" colSpan="3" />
            <Table.Heading width="8%" style={{ padding: `1.5rem` }}>
              Участка
            </Table.Heading>
            <Table.Heading width="8%" style={{ padding: `1.5rem` }}>
              Дома
            </Table.Heading>
            <Table.Heading width="61%" colSpan="5" />
          </Table.Row>

          {commonFieldsValid && isCreateAllowed && (
            <TableRowForm
              formKey="create"
              commonValues={commonValues}
              customSubmit={customSubmit}
              actions={actions}
              refreshTable={::this.refreshTable}
              settlementId={id}
              isUpdateAllowed={isCreateAllowed}
            />
          )}
          {!commonFieldsValid && isCreateAllowed && (
            <Table.Row>
              <Table.Cell
                className={cn(sUtils.textCenter, sUtils.dangerRow)}
                colSpan="13"
              >
                Для добавления нового объекта заполните общие характеристики
              </Table.Cell>
            </Table.Row>
          )}
          {!isCreateAllowed && (
            <Table.Row>
              <Table.Cell
                className={cn(sUtils.textCenter, sUtils.dangerRow)}
                colSpan="13"
              >
                Для добавления нового объекта у вас нет прав
              </Table.Cell>
            </Table.Row>
          )}
          {items.map(item => {
            const canUpdateInitialProperty = hasRight(
              `country_property_initial_update`,
              item.responsibleUser.id,
            );

            return (
              <TableRowForm
                key={item.id}
                data={item}
                initialValues={item}
                formKey={item.id}
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
                  kind="settlementProperties.primary"
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

const pickState = ({ auth, propertiesBySettlementId, pagination }) => ({
  state: { auth, properties: propertiesBySettlementId.primary, pagination },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(
    { ...SettlementsActions, createProperty, updateProperty, pop },
    dispatch,
  ),
});

export default connect(
  pickState,
  mapDispatch,
)(permissionResolver()(PrimaryPropertiesTable));
