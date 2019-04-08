import React, { Component } from 'react';

export default ({ disabled } = {}) => ChildComponent =>
  class extends Component {
    isEntityInPermissionScope(scope, { ids, departmentIds, divisionIds }) {
      const {
        id,
        details: { departmentId, divisionId },
      } = this.props.state.auth;

      if (scope === 'own') {
        return ids.indexOf(id) > -1;
      } else if (scope === 'group' && !!divisionId) {
        return divisionIds.indexOf(divisionId) > -1;
      } else if (scope === 'group' && !!departmentId) {
        return departmentIds.indexOf(departmentId) > -1;
      } else if (scope === 'all' || scope === 'none') {
        return true;
      }
      return false;
    }

    checkIfUserHasPermission(
      permission,
      entityOwnerIds,
      entityOwnerDepartmentIds,
      entityOwnerDivisionIds,
    ) {
      if (disabled) {
        return true;
      }
      const { permissions = {} } = this.props.state.auth;
      const ownerData = {
        ids: Array.isArray(entityOwnerIds) ? entityOwnerIds : [entityOwnerIds],
        departmentIds: Array.isArray(entityOwnerDepartmentIds)
          ? entityOwnerDepartmentIds
          : [entityOwnerDepartmentIds],
        divisionIds: Array.isArray(entityOwnerDivisionIds)
          ? entityOwnerDivisionIds
          : [entityOwnerDivisionIds],
      };
      const scope = permissions[permission];
      const userHasPermission =
        Object.keys(permissions).indexOf(permission) > -1;
      return (
        userHasPermission && this.isEntityInPermissionScope(scope, ownerData)
      );
    }

    render() {
      return (
        <ChildComponent
          {...this.props}
          hasRight={::this.checkIfUserHasPermission}
          hasAnyRight={(permissions, ...entityOwnerIds) =>
            permissions.some(permission =>
              ::this.checkIfUserHasPermission(permission, ...entityOwnerIds),
            )
          }
          hasAllRights={(permissions, ...entityOwnerIds) =>
            permissions.every(permission =>
              ::this.checkIfUserHasPermission(permission, ...entityOwnerIds),
            )
          }
        />
      );
    }
  };
