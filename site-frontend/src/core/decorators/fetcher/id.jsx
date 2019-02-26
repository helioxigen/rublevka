import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  loadEntity,
  createEntity,
  updateEntity,
  changeEntityState,
} from 'core/actions/fetcher';

import get from 'lodash/get';
import capitalize from 'lodash/capitalize';

const pickState = ({ fetcher }) => ({ fetcher });

const pickActions = dispatch => ({
  fetcherActions: bindActionCreators(
    { loadEntity, createEntity, updateEntity, changeEntityState },
    dispatch,
  ),
});

export default settings => ChildIdContainer =>
  connect(
    pickState,
    pickActions,
  )(
    class extends Component {
      componentWillMount() {
        const id = this.props.id || this.props.params.id;

        if (id !== `create`) {
          this.props.fetcherActions.loadEntity(settings.id, id, {
            ...settings,
            customResourcePath: this.props.resourcePath,
          });
        }
      }

      componentWillReceiveProps(newProps) {
        const id = this.props.id || this.props.params.id;
        const newId = newProps.id || newProps.params.id;

        if (newId !== id) {
          this.props.fetcherActions.loadEntity(settings.id, newId, {
            ...settings,
            customResourcePath: this.props.resourcePath,
          });
        }
      }

      getEntityData() {
        const { fetcher } = this.props;
        const id = this.props.id || this.props.params.id;
        return (fetcher[settings.id] && fetcher[settings.id][id]) || {};
      }

      getLinkedEntityId(entityData, keyPath) {
        if (Array.isArray(keyPath)) {
          return keyPath
            .map(keyPathItem => get(entityData, keyPathItem))
            .filter(item => !!item)[0];
        } else {
          return get(entityData, keyPath);
        }
      }

      getLinkedEntitiesData() {
        const entityData = this.getEntityData();
        const resource = this.props.fetcher[settings.id];

        return settings.linkedResourcesSchemes.reduce(
          (result, linkedEntity) => {
            const linkedEntityId = this.getLinkedEntityId(
              entityData,
              linkedEntity.primaryKeyPath,
            );
            const linkedEntityKeyName =
              linkedEntity.propName ||
              `linked` + capitalize(linkedEntity.typeId.slice(0, -1)) + `Data`;
            return {
              ...result,
              [linkedEntityKeyName]:
                (linkedEntityId &&
                  resource[linkedEntity.typeId] &&
                  resource[linkedEntity.typeId][linkedEntityId] &&
                  resource[linkedEntity.typeId][linkedEntityId].data) ||
                {},
            };
          },
          {},
        );
      }

      create(data) {
        return this.props.fetcherActions.createEntity(settings.id, data, {
          ...settings,
          customResourcePath: this.props.resourcePath,
        });
      }

      update(data) {
        return this.props.fetcherActions.updateEntity(
          settings.id,
          this.props.id || this.props.params.id,
          data,
          { ...settings, customResourcePath: this.props.resourcePath },
        );
      }

      changeState(state, data) {
        return this.props.fetcherActions.changeEntityState(
          settings.id,
          this.props.id || this.props.params.id,
          state,
          data,
          { ...settings, customResourcePath: this.props.resourcePath },
        );
      }

      load() {
        return this.props.fetcherActions.loadEntity(
          settings.id,
          this.props.id || this.props.params.id,
          { ...settings, customResourcePath: this.props.resourcePath },
        );
      }

      render() {
        const {
          fetcher,
          fetcherActions,
          actions,
          ...originalProps
        } = this.props; // eslint-disable-line no-unused-vars
        const entityActions = {
          ...actions,
          create: ::this.create,
          update: ::this.update,
          changeState: ::this.changeState,
          load: ::this.load,
        };
        return (
          <ChildIdContainer
            {...originalProps}
            itemData={this.getEntityData()}
            actions={entityActions}
            {...this.getLinkedEntitiesData() || {}}
          />
        );
      }
    },
  );
