import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import submitValidator from 'core/decorators/submitValidator';
import validate from 'cem/validators/positions';

import UI from 'cem/components/ui';
const {
  Form, Grid, Table,
  Select, Button, Heading,
  Grid: { Col },
  Form: { Input, Label },
} = UI;

import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

import { formFields } from 'cem/constants/settings/positions/form';
import { permissionCategoryTitle, permissionsPerCategory, permissionType, scopeTitle, permissionScopes } from 'cem/constants/settings/positions/dictionaries';
import * as options from 'cem/constants/settings/positions/options';

import clone from 'lodash/clone';

class PermissionField extends Component {
  render() {
    const isScopeSelectionPossible = this.props.availableScopes.length > 1;

    const { id, disabled, isSelected, fieldsScope } = this.props;

    return (
      <Table.Row>
        <Table.Cell>
          <Label className={sUtils.labelRegular}>
            <Input disabled={disabled} type="checkbox" checked={isSelected} onChange={() => isSelected ? this.props.onRemove(id) : this.props.onUpdate(id, this.props.availableScopes[0])} />
            <span className={sUtils.pushedLeft_3}>{this.props.label}</span>
          </Label>
        </Table.Cell>
        <Table.Cell>
          {isScopeSelectionPossible &&
            <FormField className={sUtils.resetIndentation}>
              <Select className={sUtils.resetBorder} block type="text" options={options.scopes} onChange={value => this.props.onUpdate(id, value)} value={fieldsScope} disabled={disabled} />
            </FormField>
          }
          {!isScopeSelectionPossible && <i>{scopeTitle[this.props.availableScopes[0]]}</i>}
        </Table.Cell>
      </Table.Row>
    );
  }
}

class PermissionsGrid extends Component {
  render() {
    const { categoryId, availablePermissions, selectedPermissionsMap, fields, disabled } = this.props;

    return (
      <Table.Container width="100%">
        <Table.Row>
          <Table.Heading width="85%">{permissionCategoryTitle[categoryId]}</Table.Heading>
          <Table.Heading width="15%">Область полномочий</Table.Heading>
        </Table.Row>
        {availablePermissions.map(permission => {
          const permissionId = permission.useTypeAsPermissionId ? permission.type : categoryId + `_` + permission.type;
          return (
            <PermissionField id={permissionId} key={permissionId}
              disabled={disabled}
              label={permission.messageType ? permissionType[permission.messageType] : permissionType[permission.type]}
              isSelected={!!selectedPermissionsMap[permissionId]}
              scope={selectedPermissionsMap[permissionId]}
              availableScopes={permission.availableScopeIds}
              fieldsScope={fields.permissions.value && fields.permissions.value[permissionId]}
              onUpdate={::this.props.onPermissionUpdate}
              onRemove={::this.props.onPermissionRemove} />
          );
        })}
      </Table.Container>
    );
  }
}

class PositionForm extends Component {
  update() {
    return this.props.actions.updatePosition(this.props.fields.id.value, this.props.values);
  }

  handlePermissionUpdate(permissionId, scope) {
    const { fields } = this.props;
    fields.permissions.onChange({ ...fields.permissions.value, [permissionId]: scope });
  }

  handlePermissionRemove(permissionId) {
    const { fields } = this.props;

    // TODO Filter instead of deleting elements
    const newPermissions = clone(fields.permissions.value);
    delete newPermissions[permissionId];

    fields.permissions.onChange(newPermissions);
  }

  handleAdminToggle(isAdmin) {
    this.props.fields.isAdmin.onChange(isAdmin);
    this.props.fields.permissions.onChange({});
  }

  render() {
    const { pristine, error, submitting, handleSubmit, fields, isUpdateAllowed } = this.props;
    const selectedPermissionsMap = fields.isAdmin.value ? Object.keys(permissionScopes).reduce((resultPermissions, permissionId) => ({
      ...resultPermissions,
      [permissionId]: permissionScopes[permissionId][0],
    }), {}) : fields.permissions.value || {};

    return (
      <Form.Container onSubmit={handleSubmit(::this.update)}>
        <Heading size="md">Должность</Heading>

        <FormField float valueClassName="floatLabel" label="Название" field={fields.name} helperClassName={s.formHelper} static={!isUpdateAllowed}>
          <Input block className={s.input} type="text" placeholder="Введите название" />
        </FormField>

        <Label className={sUtils.labelRegular}>
          <Input type="checkbox" checked={fields.isAdmin.value} onChange={::this.handleAdminToggle} disabled={!isUpdateAllowed} />
          <span className={sUtils.pushedLeft_3}>Администратор</span>
        </Label>

        {Object.keys(permissionsPerCategory).map(categoryId =>
          <Grid.Row className={sUtils.pushedTop3} key={categoryId}>
            <Col xs="20" className={sUtils.pushedBottom3}>
              <PermissionsGrid disabled={fields.isAdmin.value || !isUpdateAllowed} categoryId={categoryId}
                availablePermissions={permissionsPerCategory[categoryId]}
                selectedPermissionsMap={selectedPermissionsMap}
                fields={fields}
                onPermissionUpdate={::this.handlePermissionUpdate}
                onPermissionRemove={::this.handlePermissionRemove} />
            </Col>
          </Grid.Row>
        )}

        <Button className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)} disabled={error || submitting} type="submit" kind="warning" size="md" block>Сохранить</Button>
      </Form.Container>
    );
  }
}

const formSettings = {
  form: `position`,
  fields: formFields,
  validate,
};

export default reduxForm(formSettings)(submitValidator()(PositionForm));
