import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pop } from 'cem/actions/toastr';

import Property from 'cem/components/common/propertyTable/listItem';

import UI from 'cem/components/ui';
const { Table, Heading } = UI;

import cn from 'classnames';
import sUtils from 'cem/styles/utils';

class Properties extends Component {
  state = {
    propertyId: undefined,
  };

  removeProperty(index, idValue) {
    const { field, toggle, onRemoveProperty } = this.props;

    if (field.removeField) field.removeField(index);
    if (toggle) toggle.onChange(Math.random());
    if (onRemoveProperty) onRemoveProperty(idValue);
  }

  render() {
    const { field, propertyIds, propertyCategory, isStatic } = this.props;
    const ids = field || propertyIds || [];

    return (
      <section className={cn(sUtils.pushedBottom6, sUtils.scrollXMd)}>
        <Table.Container className={sUtils.width122}>
          {!!ids.length && (
            <Table.Row>
              <Table.Heading width="5%">ID</Table.Heading>
              <Table.Heading width="15%">Статус</Table.Heading>
              <Table.Heading width="15%">Тип объекта</Table.Heading>
              <Table.Heading width="25%">Тип предложения</Table.Heading>
              <Table.Heading width="25%">Стоимость</Table.Heading>
              <Table.Heading width="15%">Действия</Table.Heading>
            </Table.Row>
          )}
          {!!ids.length &&
            ids.map((id, index) => (
              <Property
                key={index}
                id={id.value}
                resourcePath={`/v1/properties/${propertyCategory}`}
                handleDelete={() => ::this.removeProperty(index, id.value)}
                isStatic={isStatic}
              />
            ))}
        </Table.Container>
        {!ids.length && (
          <Heading
            notFound
            className={cn(sUtils.pushedBottom3, sUtils.pushedTop3)}
          >
            Нет объектов
          </Heading>
        )}
      </section>
    );
  }
}

const mapDispatch = dispatch => ({
  actions: bindActionCreators({ pop }, dispatch),
});

export default connect(
  null,
  mapDispatch,
)(Properties);
