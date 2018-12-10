import React, { Component } from 'react';
import { FormattedDate } from 'react-formatted';

import UI from 'cem/components/ui';
const {
  Grid, Loading, Table, Heading,
  Grid: { Col },
} = UI;

import sUtils from 'cem/styles/utils';

import * as dict from 'cem/constants/properties/dictionaries';

class PdfExportsTable extends Component {
  componentWillMount() {
    const { actions, params: { id, category } } = this.props;
    actions.loadPropertyEvents(category, id, 'property_pdf_export');
  }

  render() {
    const { state, params: { id } } = this.props;
    const { isFetching, items = [] } = state.propertiesEvents.property_pdf_export[id] || {};

    if (isFetching) return <Loading />;

    return (
      <section className={sUtils.pushedBottom6}>
        <Grid.Row>
          <Col xs="20">
            {!!items.length && <Heading size="md">История скачиваний</Heading>}
            {!items.length && <Heading notFound>Нет истории скачиваний</Heading>}
          </Col>
        </Grid.Row>
        {!!items.length &&
          <Grid.Row>
            <Col xs="20" className={sUtils.scrollX}>
              <Table.Container width="100%" className={sUtils.width120}>
                <Table.Row>
                  <Table.Heading width="10%">Дата и время</Table.Heading>
                  <Table.Heading width="15%">Сотрудник</Table.Heading>
                  <Table.Heading width="75%">Тип события</Table.Heading>
                </Table.Row>
                {items.map(item =>
                  (<Table.Row key={item.id}>
                    <Table.Cell>
                      <FormattedDate mask="dd.mm.yyyy HH:MM" value={item.eventAt} />
                    </Table.Cell>
                    <Table.Cell>{item.details && item.details.userTitle}</Table.Cell>
                    <Table.Cell>{dict.eventKinds[item.details && item.details.kind]}</Table.Cell>
                  </Table.Row>),
                )}
              </Table.Container>
            </Col>
          </Grid.Row>
        }
      </section>
    );
  }
}

export default PdfExportsTable;
