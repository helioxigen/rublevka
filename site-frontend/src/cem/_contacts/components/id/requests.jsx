import React from 'react';

import UI from 'cem/components/ui';
const { Grid, Heading } = UI;

import s from 'cem/styles/id/content';

export default () => (
  <Grid.Row>
    <section className={s.section}>
      {/* <Table.Container width="100%">
        <Table.Row>
          <Table.Heading>ID</Table.Heading>
          <Table.Heading>Дата запроса</Table.Heading>
          <Table.Heading>Тип запроса</Table.Heading>
          <Table.Heading>Источник</Table.Heading>
          <Table.Heading>Запрос принял</Table.Heading>
        </Table.Row>
      </Table.Container> */}
      <Heading notFound>Нет запросов</Heading>
    </section>
  </Grid.Row>
);
