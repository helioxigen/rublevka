import React, { Component } from 'react';
import { API } from 'core/config/resources';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import { formFields } from 'cem/constants/contracts';
import validate from 'cem/validators/contract';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ContractActions from 'cem/actions/properties/contracts';

import { FormattedDate } from 'react-formatted';

import { fetchResource, fetchDictionary } from 'cem/helpers/autocomplete';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Grid,
  Table,
  Button,
  Heading,
  Icon,
  Daypicker,
  AsyncSelect,
  Form: { Helper, Input, Group },
  Grid: { Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDaypicker from 'cem/styles/ui/daypicker';

const formSettings = {
  form: `contractsOfProperty`,
  fields: formFields,
  validate,
};

const ContractForm = reduxForm(formSettings)(
  submitValidator()(
    class extends Component {
      onSubmitSuccess() {
        if (this.props.formKey === `add`) this.props.resetForm();
      }

      createOrUpdate() {
        const { propertyId, formKey, values, actions, category } = this.props;

        if (formKey === `add`)
          return actions.linkContract(propertyId, values, category);
        if (formKey !== `add`)
          return actions.updateContract(propertyId, formKey, values, category);
      }

      unlink() {
        const { propertyId, formKey, actions, category } = this.props;

        return actions.unlinkContract(propertyId, formKey, category);
      }

      render() {
        const {
          formKey,
          fields,
          values,
          handleSubmit,
          pristine,
          error,
          submitting,
          propertyId,
          category,
          state,
        } = this.props;

        return (
          <Table.Row>
            <Table.Cell>
              <Group
                className={sUtils.resetIndentation}
                kind={fields.kindId.touched && !!fields.kindId.error && `error`}
              >
                <AsyncSelect
                  className={sUtils.resetBorder}
                  {...fields.kindId}
                  asyncOptions={fetchDictionary(`property_contract_type`)}
                  labelKey="title"
                  valueKey="id"
                  onBlur={() => {}}
                />
                {fields.kindId.touched && fields.kindId.error && (
                  <Helper>{fields.kindId.error}</Helper>
                )}
              </Group>
            </Table.Cell>
            <Table.Cell>
              <Group
                className={sUtils.resetIndentation}
                kind={
                  fields.signedById.touched &&
                  !!fields.signedById.error &&
                  `error`
                }
              >
                <div>
                  <AsyncSelect
                    className={sUtils.resetBorder}
                    asyncOptions={fetchResource(
                      `/v1/users/staff`,
                      `lastName,firstName`,
                      [`firstName`, `lastName`],
                    )}
                    {...fields.signedById}
                  />
                </div>
                {fields.signedById.touched && fields.signedById.error && (
                  <Helper className={s.helperPosition}>
                    {fields.signedById.error}
                  </Helper>
                )}
              </Group>
            </Table.Cell>
            <Table.Cell>
              <Grid.Row>
                <Col xs="16">
                  {formKey !== `add` && (
                    <FormattedDate
                      mask="dd.mm.yy @ HH:MM"
                      value={values.createdAt}
                    />
                  )}
                  {formKey === `add` && (
                    <Group
                      className={sUtils.resetIndentation}
                      kind={
                        fields.file.touched && !!fields.file.error && `error`
                      }
                    >
                      <Input type="file" {...fields.file} value={null} />
                    </Group>
                  )}
                </Col>
              </Grid.Row>
            </Table.Cell>
            <Table.Cell>
              <Group
                className={sUtils.resetIndentation}
                kind={
                  fields.validFrom.touched &&
                  !!fields.validFrom.error &&
                  `error`
                }
              >
                <Daypicker
                  className={sDaypicker.daypicker}
                  restrict="future"
                  kind="from"
                  control={
                    <Input
                      className={cn(
                        sDaypicker.inputDaypicker,
                        sUtils.resetBorder,
                      )}
                      {...fields.validFrom}
                      type="text"
                    />
                  }
                  button={
                    <Button className={sDaypicker.btnDaypicker}>
                      <Icon className={sDaypicker.icon} icon="calendar" />
                    </Button>
                  }
                  onDayClick={day => fields.validFrom.onBlur(day)}
                />
                {fields.validFrom.touched && fields.validFrom.error && (
                  <Helper className={sDaypicker.helperDaypicker}>
                    {fields.validFrom.error}
                  </Helper>
                )}
              </Group>
            </Table.Cell>
            <Table.Cell>
              <Group
                className={sUtils.resetIndentation}
                kind={
                  fields.validTo.touched && !!fields.validTo.error && `error`
                }
              >
                <Daypicker
                  className={sDaypicker.daypicker}
                  kind="to"
                  control={
                    <Input
                      className={cn(
                        sDaypicker.inputDaypicker,
                        sUtils.resetBorder,
                      )}
                      {...fields.validTo}
                      type="text"
                    />
                  }
                  button={
                    <Button className={sDaypicker.btnDaypicker}>
                      <Icon className={sDaypicker.icon} icon="calendar" />
                    </Button>
                  }
                  onDayClick={day => fields.validTo.onBlur(day)}
                />
                {fields.validTo.touched && fields.validTo.error && (
                  <Helper className={sDaypicker.helperDaypicker}>
                    {fields.validTo.error}
                  </Helper>
                )}
              </Group>
            </Table.Cell>
            {formKey !== `add` && (
              <Table.Cell>
                <Group className={sUtils.resetIndentation}>
                  <Button
                    className={sButton.btnTableAction}
                    size="xs"
                    onClick={handleSubmit(
                      ::this.createOrUpdate,
                      ::this.onSubmitSuccess,
                    )}
                    disabled={pristine || error || submitting}
                  >
                    <Icon className={s.btnIcon} icon="checkmark" />
                  </Button>
                  <Button
                    className={sButton.btnTableAction}
                    size="xs"
                    to={`${API}/v1/properties/${category}/${propertyId}/contracts/${formKey}/download?token=${
                      state.auth.token
                    }`}
                    target="_blank"
                  >
                    <Icon className={s.btnIcon} icon="download" />
                  </Button>
                  <Button
                    className={sButton.btnTableAction}
                    size="xs"
                    onClick={handleSubmit(::this.unlink)}
                  >
                    <Icon className={s.btnIcon} icon="delete" />
                  </Button>
                </Group>
              </Table.Cell>
            )}
            {formKey === `add` && (
              <Table.Cell>
                <Group className={sUtils.resetIndentation}>
                  <Button
                    className={sButton.btnTableAction}
                    size="xs"
                    onClick={handleSubmit(
                      ::this.createOrUpdate,
                      ::this.onSubmitSuccess,
                    )}
                    disabled={pristine || error || submitting}
                  >
                    <Icon className={s.btnIcon} icon="checkmark" />
                  </Button>
                </Group>
              </Table.Cell>
            )}
          </Table.Row>
        );
      }
    },
  ),
);

class Contracts extends Component {
  componentWillMount() {
    const { propertyId, actions } = this.props;

    actions.loadContracts(propertyId);
  }

  render() {
    const { propertyId, state, isDocumentsUploadAllowed } = this.props;
    const contracts = state.contractsByPropertyId[propertyId] || [];

    return (
      <section className={sUtils.pushedBottom6}>
        <Grid.Row>
          <Col xs="20">
            <Heading size="md">Договора</Heading>
          </Col>
        </Grid.Row>
        <Grid.Row>
          <Col xs="20">
            <div className={sUtils.scrollX}>
              <Table.Container width="100%" className={sUtils.width120}>
                <Table.Row>
                  <Table.Heading width="20%">Тип договора</Table.Heading>
                  <Table.Heading width="18%">Договор подписал</Table.Heading>
                  <Table.Heading width="22%">Дата загрузки</Table.Heading>
                  <Table.Heading width="15%">Действителен от</Table.Heading>
                  <Table.Heading width="15%">Действителен до</Table.Heading>
                  <Table.Heading width="10%">Действия</Table.Heading>
                </Table.Row>

                {isDocumentsUploadAllowed && (
                  <ContractForm {...this.props} formKey="add" />
                )}

                {contracts.map((item, index) => (
                  <ContractForm
                    {...this.props}
                    key={index}
                    formKey={item.id}
                    initialValues={item}
                  />
                ))}
              </Table.Container>
            </div>
          </Col>
        </Grid.Row>
      </section>
    );
  }
}

const pickState = ({ contractsByPropertyId, auth }) => ({
  state: { contractsByPropertyId, auth },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(ContractActions, dispatch),
});

export default connect(
  pickState,
  mapDispatch,
)(Contracts);
