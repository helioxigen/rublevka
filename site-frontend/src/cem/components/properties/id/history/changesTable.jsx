import React, { Component } from 'react';
import { FormattedDate } from 'react-formatted';
import jsondiffpatch from 'jsondiffpatch';

import fields, { ignoredFields } from 'cem/constants/properties/fields';
import { changeMessages } from 'cem/constants/properties/history';

import Pagination from 'core/components/pagination';

import UI from 'cem/components/ui';
const {
  Grid,
  Loading,
  Table,
  Heading,
  Grid: { Col },
} = UI;

import sUtils from 'cem/styles/utils';

import { recursiveTraverseChanges } from 'core/helpers';

const jsonDiffer = jsondiffpatch.create({
  includeValueOnMove: true,
  objectHash: (object, index) =>
    object.id || object.number || `$$index:${index}`,
  propertyFilter: name => ignoredFields.indexOf(name) === -1,
  textDiff: {
    minLength: 99999,
  },
});

class ChangesCell extends Component {
  detectMessageKind(event) {
    const field = fields[event.id] || {};
    const isSimpleField = event.index === null;
    const isSpecialField = !!field.messageKind;

    if (isSimpleField && !isSpecialField) return `object`;
    if (!isSimpleField && !isSpecialField) return `array`;
    if (isSpecialField) return field.messageKind;
  }

  render() {
    const { event } = this.props;

    if (!fields[event.id]) return <Table.Cell>{event.id}</Table.Cell>;

    const messageKind = this.detectMessageKind(event);

    return (
      <Table.Cell>{changeMessages[messageKind][event.type](event)}</Table.Cell>
    );
  }
}

class ChangesTable extends Component {
  componentWillMount() {
    const {
      actions,
      params: { id, category },
    } = this.props;

    actions.loadPropertyEvents(category, id, `property_updated`);
  }

  handlePaginationUpdate(offset) {
    const {
      state,
      actions,
      params: { id, category },
    } = this.props;
    const pagination = state.pagination.propertiesEvents;

    actions.loadPropertyEvents(category, id, `property_updated`, {
      pagination: { ...pagination, offset },
    });
  }

  filterEvents(event) {
    const field = fields[event.id] || {};
    const ignoreEvents = field.ignoreEvents || [];
    return !field.ignore && ignoreEvents.indexOf(event.type) === -1;
  }

  resetModel(model) {
    return {
      ...model,
      saleOffer: model.saleOffer || {},
      rentOffer: model.rentOffer || {},
    };
  }

  render() {
    const {
      state,
      params: { id },
    } = this.props;
    const { isFetching, items = [] } =
      state.propertiesEvents.property_updated[id] || {};
    const pagination = state.pagination.propertiesEvents;

    if (isFetching) return <Loading />;

    return (
      <section>
        <Grid.Row>
          <Col xs="20">
            {!!items.length && <Heading size="md">История изменений</Heading>}
            {!items.length && <Heading notFound>Нет истории изменений</Heading>}
          </Col>
        </Grid.Row>
        {!!items.length && (
          <Grid.Row>
            <Col xs="20" className={sUtils.scrollX}>
              <Table.Container width="100%" className={sUtils.width120}>
                <Table.Row>
                  <Table.Heading width="10%">Дата и время</Table.Heading>
                  <Table.Heading width="15%">Сотрудник</Table.Heading>
                  <Table.Heading width="15%">Поле</Table.Heading>
                  <Table.Heading width="60%">Изменения</Table.Heading>
                </Table.Row>
                {items.map(item => {
                  const previousModel = this.resetModel(item.details.previous);
                  const newModel = this.resetModel(item.details.changes);
                  const delta = jsonDiffer.diff(previousModel, newModel) || {};

                  return recursiveTraverseChanges(
                    delta,
                    previousModel,
                    newModel,
                  )
                    .filter(::this.filterEvents)
                    .map((event, index) => (
                      <Table.Row key={`${item.id}.${index}`}>
                        {!index ? (
                          <Table.Cell>
                            <FormattedDate
                              mask="dd.mm.yyyy HH:MM"
                              value={item.eventAt}
                            />
                          </Table.Cell>
                        ) : (
                          <Table.Cell />
                        )}
                        {!index ? (
                          <Table.Cell>
                            {item.details && item.details.userTitle}
                          </Table.Cell>
                        ) : (
                          <Table.Cell />
                        )}
                        <Table.Cell>
                          {(fields[event.id] && fields[event.id].title) || `?`}
                        </Table.Cell>
                        <ChangesCell event={event} />
                      </Table.Row>
                    ));
                })}
              </Table.Container>
            </Col>
          </Grid.Row>
        )}
        {!!items.length && (
          <Grid.Row xs="center">
            <Col xs="10" className={sUtils.pushed6_0}>
              <Pagination
                {...pagination}
                onUpdate={::this.handlePaginationUpdate}
              />
            </Col>
          </Grid.Row>
        )}
      </section>
    );
  }
}

export default ChangesTable;
